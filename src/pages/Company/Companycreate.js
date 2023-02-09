import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';



const Companycreate=() =>{

 const[id,setId]=useState("");
 const[name,setName]=useState("");
 const[zip,setZip]=useState("");
 const[state,setState]=useState("");
 const[country,setCountry]=useState("");
 const[created_at,setCreated_at]=useState("");
 const[status,setStatus]=useState("")
 
 
 const navigate = useNavigate();
const {uniqueID}=useParams();

const { operation } = useParams();

var username = window.localStorage.getItem('username')
var password = window.localStorage.getItem('password')
var currentUserrole = window.localStorage.getItem('userrole')


function getCompanyEditData(){
   var comEditId= uniqueID
   
   axios
   .get("http://127.0.0.1:8000/masterapp/company/"+comEditId +"/",
   {
                    auth: {
                      username: username,
                      password: password
                   }
                  },
                  {
                    'param': 'vbc' 
                  })
                  .then((res)=>{
                    // alert(res.data[0].created_at)
                    setId(res.data[0].id);
                    setName(res.data[0].name);
                    setZip(res.data[0].zip);
                    setCountry(res.data[0].country);
                    setState(res.data[0].state);
                    setCreated_at(res.data[0].created_at);
                    setStatus(res.data[0].status)
                  })}


                  useEffect(()=>{
                    if(operation === 'edit'){
                    getCompanyEditData()
                    }
                    
                  },[]); 
                  
  if (operation === "new"){
    var headfield =<h3>create</h3>

    var companynamefield=   <input
    type="text"
    className="form-control form-control-sm"
    onChange={(e)=> setName(e.target.value)}
    />  
    
    var zipfield = <input
    type="text"
    className="form-control form-control-sm"
    onChange={(e)=> setZip(e.target.value)}
    />

    var statefield =<input
    type="text"
    className="form-control form-control-sm"
    onChange={(e)=> setState(e.target.value)}
    />

    var countryfield =<input
    type="text"
    className="form-control form-control-sm"
    onChange={(e)=>setCountry(e.target.value)}
    />

    var createdatfield = <input
    type="date"
    className="form-control form-control-sm"
    onChange={(e)=>setCreated_at(e.target.value)}
    />

    
  }
  else if(operation === "edit"){
                    var headfield =<h3>create</h3>

                    var companynamefield=   <input
                    type="text"
                    className="form-control form-control-sm"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    />  
                    
                    var zipfield = <input
                    type="text"
                    className="form-control form-control-sm"
                    value={zip}
                    onChange={(e)=> setZip(e.target.value)}
                    />
                
                    var statefield =<input
                    type="text"
                    className="form-control form-control-sm"
                    value={state}
                    onChange={(e)=> setState(e.target.value)}
                    />
                
                    var countryfield =<input
                    type="text"
                    className="form-control form-control-sm"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                    />
                
                    var createdatfield = <input
                    type="text"
                    className="form-control form-control-sm"
                    value={created_at}
                    onChange={(e)=>setCreated_at(e.target.value)}
                    />             
  }   
  
  const handleSubmit = (e) => {
          e.preventDefault();
          console.log("clicked");
                    //alert(address);
                
                
                
        var comEditId= uniqueID;
                

  if(operation === 'new') {
                                        // alert(company_name)
      axios
      .post('http://127.0.0.1:8000/masterapp/company/', 
                                         
      {
      "name":name,
      "zip":zip,
      "state":state,
      "country":country,
      "created_at":created_at,
      "status":status,
      "loggedInUser":username,
      'userrole':currentUserrole 
    },
    {
        auth: {
                username: username,
                 password: password
               }
        }
         )
          .then(() => {
           navigate("/company/companydatagrid");
          });
                                          
  }
         

      else if(operation === "edit"){
                    // alert(name)
          axios
          .put(`http://127.0.0.1:8000/masterapp/company/update/${comEditId}`,
          
          {
                    "name":name,
                    "zip":zip,
                    "state":state,
                    "country":country,
                    "created_at":created_at,
                    "status":status,
                    "loggedInUser":username,
                    'userrole':currentUserrole  

          },
                   
          {         
                    auth: {
                      username: username,
                      password: password
                    }
                    }

          )
          .then(()=>{
                    navigate("/company/companydatagrid")
          })          
      }
  }




  return (
    <>
    <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/>
    <br/>
                    <div className="d-flex justify-content-between m-2">
        <h2>Create</h2>
        <Link to="/company/companydatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>

      <div className="container">

                    <div className="row">
                       <div className="col-12">

                       <div className="d-flex justify-content-between m-2">                
                    </div>
                    <table className="table table-borderless company" id= "company">
                       <tbody>
                          <tr>

                        <td className="company">Company Name</td> 
                        <td className="company">
                    {companynamefield}</td>               
                                        
                    </tr>

                    <tr>
                    <td className="company" >Zip</td> 
                    <td className="company">{zipfield}</td>                  
                    </tr> 
                    <tr>
                    <td className="company" >State</td> 
                    <td className="company">
                    {statefield}</td>                  
                    </tr> 
                    <tr>
                    <td className="company" >Country</td> 
                    <td className="company">
                    {countryfield}</td>                   
                    </tr>
                    <tr>
                    <td className="company" >Created At</td> 
                     <td className="company">
                    {createdatfield}</td>                   
                    </tr> 
                    <tr>
                      <td class="productionOrderReportSearchTD">Status</td>
                      <td class="productionOrderReportSearchTD">
                      <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)}/>
                      </td>
                      </tr>
                    <tr>
                      <td>
                     </td>
                    <td className="company" >
                    <button className="btn btn-primary" onClick={handleSubmit}>Save</button>                  
                    </td>                
                    </tr>              
                    </tbody>                 
                    </table>                 
                    </div>
                    </div> 
                    </div>

    </>
  );
};

export default Companycreate

