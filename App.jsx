import React, { useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { example_backend } from 'declarations/example_backend';
import './index.scss';

function App() {
  const [department, setDepartment] = useState({depName: '', depId: ''});
  const [departments, setDepartments] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(false);

  


  const getDepartments = async () => {
 
      const departs = await example_backend.getDepartments();
    
      setDepartments(departs);
      localStorage.setItem('departments', JSON.stringify(departs)); 
  };
  getDepartments();


  const saveDepartment = async (event) => {
    event.preventDefault();
      document.getElementById('save').innerHTML = "SAVING...";
      document.getElementById('save').className="btn btn-primary w-100";
      getDepartments();

      let i = 0;
      departments.forEach((value, index) => {
        if (value.depId == department.depId || value.depName == department.depName) {
          i+=1;
        }
      });

      if(i===0){
        await example_backend.addDepartment(department.depId, department.depName) ;
        setDisplayAlert(false);
        setDepartment({ depName: '', depId: ''});
        document.getElementById('save').innerHTML = "SAVE";
        document.getElementById('save').className="btn btn-primary w-100";
        
      }
      else{
        document.getElementById('save').innerHTML = "Register Department ";
        
        setDisplayAlert(true);
        document.getElementById('save').className="btn btn-danger w-100";
        setDepartment({ depName: '', depId: ''});
        
      }
        getDepartments();

  };


  return (
    <main className='container'>
       
      <h3 className="right">Departments Registration system</h3>
     

      <div className='row mt-4'>
        <div className="col-md-5" id='form'>
          <form onSubmit={saveDepartment}>
            <div className="form-group mb-2">
              <label htmlFor="">Department ID:</label>
              <input type="text" className="form-control" value={department.depId} onChange={(e) => setDepartment({ ...department, depId: e.target.value })}
                placeholder='Enter ID of section' required/>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="">Department Name:</label>
              <input type="text" className="form-control" value={department.depName} onChange={(e) => setDepartment({ ...department, depName: e.target.value })}
                placeholder='Enter Name of section' required/>
            </div>
            <div className="form-group mb-2">
              <button type="submit" className="form-control btn btn-primary" id='save'>Register Department</button>
              <button>Fetch Department</button>
              
            </div>
          </form>
          {
            displayAlert?
           (
            <div class="alert alert-danger" role="alert">
            <strong>Deny Depulicate!</strong> Not Depulicate Department!
          </div>
          ):(<div></div>)
          }
        </div>
        <div className="col-md-7">
        <h5 > both departments(options)</h5>
          <table border={2} className="table table-bordered">
            <tr className=''>
              <th>Department ID</th>
              <th>Department Name</th>
            </tr>
            
              {
                departments.map((department, index) => (
                  <tr key={index}>
                    <td> {department.depId} </td>
                    <td> {department.depName} </td>
                   
                  </tr>
              ))}
            
          </table>
        </div>

      </div>    
 
    </main>
  );
}

export default App;


           
              
                
                
         