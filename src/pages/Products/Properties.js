import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import * as  AiIcons from "react-icons/ai";
import Select from "react-select";

function Properties() {
const[id,setId]=useState("");
const[batch_number,setBatch_number]=useState("");
const[manufacturing_date,setManufact]=useState("");
const[exp_date,setExp]=useState("");
const[License_Number,setLicense_Number]=useState("");

const navigate=useNavigate();

const {operation}=useParams()
const {uniqueID}=useParams()

var username = window.localStorage.getItem('username')
var password = window.localStorage.getItem('password')
var currentUserrole = window.localStorage.getItem('userrole')

function getPropertyEditData(){

    axios

        .get("http://127.0.0.1:8000/masterapp/productproperty/"+uniqueID+"/",
        {
        auth: {
                    username: username,
                    password: password
                    }         
        },
        {
          "param":"vis"          
        }
        )
        .then((res)=>{
          //  alert(res.data[0].manufacturing_date)
         setId(res.data[0].id)
         setBatch_number(res.data[0].batch_number)
         setManufact(res.data[0].manufacturing_date)
         setLicense_Number(res.data[0].License_Number)
         setExp(res.data[0].exp_date)        
        })
}
useEffect(()=>{
       getPropertyEditData();

},[])
var headfield=<h3>Create</h3>

var batchfield=<input
                    type="text"
                    
                    className="form-control form-control-sm"
                    onChange={(e)=>setBatch_number(e.target.value)}
                    value={batch_number}
                    />

var manufactfield=<input
                    type="date"
                    
                    className="form-control form-control-sm"
                    onChange={(e)=>setManufact(e.target.value)}
                    value={manufacturing_date}
                    />

var expfield=<input
                    type="date"
                   
                    className="form-control form-control-sm"
                    onChange={(e)=>setExp(e.target.value)}
                    value={exp_date}
                    />

var licensefield=<input
                    type="text"
                    
                    className="form-control form-control-sm"
                    onChange={(e)=>setLicense_Number(e.target.value)}
                    value={License_Number}
                    />
const handleSubmit = (e) => {
                    e.preventDefault();
                    console.log("clicked");
                    //alert(address);
                    // companyEditID=uniqueID;
                    // alert(sap_service);
// if(operation === 'new') {
  // alert(exp_date) 
        axios
       
          .put(`http://127.0.0.1:8000/masterapp/productproperty/update/${uniqueID}`,
        
                                                          
        {
         "batch_number":batch_number,
         "manufacturing_date":manufacturing_date,
         "exp_date":exp_date,
         "License_Number":License_Number
                                                                
            },
                    {
                     auth: {
                              username: username,
                              password: password
                           }
                     }
    )
.then(() => {
        navigate("/product/productdatagrid");
         });
}
  return (
      <>
 <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
                                                                            
 <br/>
<div className="d-flex justify-content-between m-2">
    <h2>Property</h2>
<Link to="/company/tracelinkdatagrid">
    <button className="btn btn-primary">Show Data</button>
 </Link>
</div>
                                                                        
<div class="container">
<div class="row">
                                                          {/* <div class="col-2">
                                                          <Sidebar />
                                                         </div> */}
<div class="col-12">
                                                                        
 <div className="d-flex justify-content-between m-2">
                                                                             
</div>
                                                                           
                                                                        
                                                                        
    <table class="table table-borderless productionOrderReportSearchTable" id="productionOrderReportSearchTableID">
      <tbody>
          <tr>
              <td class="productionOrderReportSearchTD">Batch Number</td>
                      <td class="productionOrderReportSearchTD">
                          {batchfield}
                      </td>
          </tr>
                                                                        
                                                                        
      <tr>
        <td class="productionOrderReportSearchTD">  Manufacturing Date</td>
            <td class="productionOrderReportSearchTD">
                {manufactfield}
            </td>
      </tr>
      <tr>
          <td class="productionOrderReportSearchTD">Expiration Date</td>
              <td class="productionOrderReportSearchTD">
                    {expfield}
          </td>
        </tr>
                                                         
                                                                        
<tr>
<td class="productionOrderReportSearchTD"> License Number</td>
<td class="productionOrderReportSearchTD">
{licensefield}
</td>
</tr>
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
                                                                        
<tr>
<td class="productionOrderReportSearchTD">
                                                                       
                                                  
<button className="btn btn-primary" onClick={handleSubmit} >Save</button>
                                                                 
</td>
</tr>
</tbody>
</table>
                                                                        
</div>
</div>
</div>
                                                  
</>
)
}

export default Properties