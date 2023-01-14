import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import * as  AiIcons from "react-icons/ai";
import Select from "react-select";



function ProductCreate() {
 
 const[id,setId]=useState("");
 const[ponumber,setPonumber] =useState("");
 const[name,setName]=useState("");
 const[description,setDescription]=useState("");
 const[created_by,setCreatedBy]=useState("");
 const[created_at,setCreatedat]=useState("");
 const[updated_at,setUpdatedat]=useState("");
 const[status,setStatus]=useState(""); 
 
 const navigate=useNavigate()

 const {operation}=useParams()
 const {uniqueID}=useParams()

var username = window.localStorage.getItem('username')
var password = window.localStorage.getItem('password')
var currentUserrole = window.localStorage.getItem('userrole')


function getProductEditData(){
  var productId=uniqueID;

  axios
  .get("http://localhost:8000/masterapp/products/"+productId+"/",
  {
               auth: {
                 username: username,
                 password: password
              }
             },
             {
               'param': 'vbc' 
             }
  )
  .then((res)=>{
     setId(res.data[0].id)
     setPonumber(res.data[0].ponumber)
     setName(res.data[0].name)
     setDescription(res.data[0].description)
     setCreatedBy(res.data[0].created_by)
     setCreatedat(res.data[0].created_at)
     setUpdatedat(res.data[0].updated_at)
     setStatus(res.data[0].status) 
     
     
  })


}
useEffect(()=>{
  if(operation =="edit"){
     getProductEditData()               
  }                  
},[]);


function getSapProductData(){
                  // alert(ponumber) 
                    axios
                    .get("http://127.0.0.1:8000/sapdb/sapdbproduct/"+ponumber+"/",
                    {
                                 auth: {
                                   username: username,
                                   password: password
                                }
                               },
                               {
                                 'param': 'vbc' 
                               }
                    )
                    .then((res)=>{
                    // alert(created_at)
                       
                       setName(res.data[0].name)
                       setDescription(res.data[0].description)
                       setCreatedBy(res.data[0].created_by)
                       setCreatedat(res.data[0].created_at)
                       setUpdatedat(res.data[0].updated_at)
                       setStatus(res.data[0].status) 
                       
                       
                    })                   
}


if(operation =="new"){              
 var headfield=<h3>Create</h3>

 
 var pofield=<input
 type="text"
 value={ponumber}
 className="form-control form-control-sm"
  onChange={(e)=>setPonumber(e.target.value)}
  />
  var fetchwidget=  <button className="btn btn-primary"
            onClick={() => getSapProductData()}>
            <AiIcons.AiOutlineCloudDownload size={35}/>
        </button>

  var namefield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setName(e.target.value)}
  value={name}
  />

  var descriptionfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setDescription(e.target.value)}
  value={description}
  />

  var createdbyfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setCreatedBy(e.target.value)}
  value={created_by}
  />

  var createdatfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setCreatedat(e.target.value)}
  value={created_at}
  />

  var updatedatfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setUpdatedat(e.target.value)}
 value= {updated_at}
  />

  var statusfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setStatus(e.target.value)}
  value={status}
  />
}

else if(operation =="edit"){
    var headfield=<h3>Update</h3>

    var pofield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setPonumber(e.target.value)}
  value={ponumber}
  />

  var namefield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setName(e.target.value)}
  value={name}
  />

  var descriptionfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setDescription(e.target.value)}
  value={description}
  />

  var createdbyfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setCreatedBy(e.target.value)}
  value={created_by}
  />

  var createdatfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setCreatedat(e.target.value)}
  value={created_at}

  />

  var updatedatfield=<input
 type="text"
 className="form-control form-control-sm"
  onChange={(e)=>setUpdatedat(e.target.value)}
  value={updated_at}
  />

//   var statusfield=<input
//  type="text"
//  className="form-control form-control-sm"
//   onChange={(e)=>setStatus(e.target.value)}
//   value={status}
//   />
var statusfield=<select  class="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)} value={status}>
<option value="">Select</option>
<option value="draft">Draft</option>
<option value="inproduction">Inproduction</option>
<option value="Closed">Closed</option>
</select>
    
    
}

const handleSubmit= (e) =>{
e.preventDefault();
console.log("clicked")

var productId=uniqueID
  

if(operation =="new"){
  axios
  .post('http://127.0.0.1:8000/masterapp/products/',
 {
  "ponumber":ponumber,
  "name":name,
  "description":description,
  "created_by":created_by,
  "created_at":created_at,
  "updated_at":updated_at,
  "status" :status,
  "loggedInUser":username,
  'userrole':currentUserrole                   
 },
 {
      auth: {
        username:username,
        password:password            
      }
    
                                                        
 } ) 
 .then(()=>{
   navigate("/product/productdatagrid");                 
 })                 
}

else if(operation =="edit"){
   axios
   .put(`http://127.0.0.1:8000/masterapp/products/update/${productId}`,
   {
                    "ponumber":ponumber,
                    "name":name,
                    "description":description,
                    "created_by":created_by,
                    "created_at":created_at,
                    "updated_at":updated_at,
                    "status" :status,
                    "loggedInUser":username,
                    'userrole':currentUserrole                   
   },
   {
      auth :{
        username:username,
        password:password            
      }              
   })
   .then(()=>{
        navigate("/product/productdatagrid");                 
   })                 
}
}
                    
  return (
<>

<Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
 <div className="d-flex justify-content-between m-2"> 
 {/* <h2>Create</h2>  */}
 {headfield}
 <Link to="/customer/customerdatagrid">
  <button className="btn btn-primary">Show Data</button>
 </Link>
</div>
<table class="table table-borderless productionOrderReportSearchTable" id="productionOrderReportSearchTableID">
   <tbody>
     <tr>
     <td class="productionOrderReportSearchTD"> Production Number</td>
     <td class="productionOrderReportSearchTD">
       {pofield}             
     </td>
     <td class="productionOrderReportSearchTD">
{fetchwidget}
</td>

     </tr> 

     <tr>
     <td class="productionOrderReportSearchTD">Product Name</td>
     <td class="productionOrderReportSearchTD">
       {namefield}             
     </td>

     </tr> 

     <tr>
     <td class="productionOrderReportSearchTD"> Description</td>
     <td class="productionOrderReportSearchTD">
       {descriptionfield}             
     </td>

     </tr> 

     <tr>
     <td class="productionOrderReportSearchTD"> Created By</td>
     <td class="productionOrderReportSearchTD">
       {createdbyfield}             
     </td>

     </tr>  

     <tr>
     <td class="productionOrderReportSearchTD"> Created At</td>
     <td class="productionOrderReportSearchTD">
       {createdatfield}             
     </td>

     </tr> 

     <tr>
     <td class="productionOrderReportSearchTD"> Updated At</td>
     <td class="productionOrderReportSearchTD">
       {updatedatfield}             
     </td>

     </tr> 

     <tr>
     <td class="productionOrderReportSearchTD"> Status</td>
     <td class="productionOrderReportSearchTD">
       {statusfield}             
     </td>

     </tr>

     <tr>
      <td class="productionOrderReportSearchTD">
        <button
          type="submit"
          className="btn btn-primary"
           onClick={handleSubmit}
        >
          Submit
        </button>
        </td>
        </tr>              
    </tbody>                 
</table>
</>
  )
}

export default ProductCreate

