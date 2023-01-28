import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import Select from "react-select";




const Shipingrcreate=()=> {
     const[id,setId] =useState("");
     const[shipping_order_name ,setShipping_order_name ] =useState("");
     const[ponumber,setPonumber]=useState("");
     const[company,setCompany]=useState("");
     const[date,setDate] =useState("");
     const[createdby,setCreatedby]=useState("") ;
     const[status,setStatus]  =useState("") ;
     const[foregincompany,setForeginCompany] =useState("");
     const[foreginponumber,setForeginPo]=useState("");

     
     const navigate = useNavigate();
//      ////    for receiving the parameters from URL
     const {uniqueID}=useParams();
     const{operation}=useParams();
     const {production}=useParams();




 var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')

  let optionNew=[];
  let OptionCompany=[];

  function getShippoEditData(){
       var shippoEditId=uniqueID;
       

       axios
       .get("http://localhost:8000/masterapp/shippo/"+shippoEditId+"/",
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
           setCreatedby(res.data[0].createdby)
           setDate(res.data[0].date)
           setForeginCompany(res.data[0].company)
           setShipping_order_name(res.data[0].shipping_order_name)
           setForeginPo(res.data[0].ponumber)
           setStatus(res.data[0].status)
           
       })           
  }

  function getCompanyforegin(){
    // alert("df")
    axios
    .get("http://127.0.0.1:8000/masterapp/company/",

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
    res.data.map(data=>{
                    // alert("anu")
              OptionCompany.push({value:data.id,label:data.name})
    });
    setCompany(OptionCompany);
  })
  }

  function getProductforegin(){
    axios
    .get("http://127.0.0.1:8000/masterapp/products/",

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
    res.data.map(data=>{
                    // alert("anu")
              optionNew.push({value:data.id,label:data.name})
    });
    setPonumber(optionNew);
  })
  }

  useEffect(()=>{
    getCompanyforegin();
    getProductforegin();
     if (operation === 'edit'){

           getShippoEditData();         
     }               
  },[])

 const getCompanyname=event=>{
  // alert(event.value)
  setForeginCompany(event.value);


  }

  const getProductName=event=>{
    // alert(event.value)
    setForeginPo(event.value);
  
  
    }

  if(operation ==="new"){
     var headfield=<h3>Create</h3> 
     
     var namefield=<input 
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setShipping_order_name(e.target.value)}
     />

     var datefield=<input
     type="date"
     className="form-control form-control-sm"
     onChange={(e)=>setDate(e.target.value)}
     />

     var createdbyfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setCreatedby(e.target.value)}
     />

    

     var companynamefield=
     <Select options={company} onChange={getCompanyname}></Select>
 

     var ponumberfield=
     <Select options={ponumber} onChange={getProductName}></Select>
  
     
     var statusfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setStatus(e.target.value)}
     />

 }
 else if(operation ==="edit"){
      var headfield=<h3>Update</h3> 
      
      var namefield=<input 
     type="text"
     value= {shipping_order_name}
     className="form-control form-control-sm"
     
     onChange={(e)=>setShipping_order_name(e.target.value)}
     />

     var createdbyfield=<input
     type="text"
     className="form-control form-control-sm"
     value= {createdby}
     onChange={(e)=>setCreatedby(e.target.value)}
     />

     var datefield=<input
     type="date"
     className="form-control form-control-sm"
     value={date}
     onChange={(e)=>setDate(e.target.value)}
     />

    
     var ponumberfield=
     <Select options={ponumber} onChange={getProductName}></Select>
     

     var companynamefield=
     <Select options={company} onChange={getCompanyname}></Select>

     
      
 }

 const handleSubmit= (e) =>{
  e.preventDefault();
  console.log("clicked")

  var shipEditId =uniqueID;

  if(operation === 'new') {
    // alert(description)
    axios
      .post('http://localhost:8000/masterapp/shippo/', 
      {
        "shipping_order_name": shipping_order_name, 
        'ponumber':foreginponumber,
        'date':date,
         

        'company':foregincompany,
       
        "createdby":createdby,
        // 'status':status,
        //"ponumber":window.localStorage.getItem("productIDforShippingOrder"),
        "ponumber":uniqueID,
        "loggedInUser":username,
        'userrole':currentUserrole,
        'po':production
        
      
      },
      {
        auth: {
          username: username,
          password: password
        }
      }
      )
      .then(() => {
        navigate("/shipping/shippingdatagrid");
      });
      
  }

  else if(operation === 'edit') {
    alert( uniqueID) 
    axios
      .put(`http://localhost:8000/masterapp/shippo/update/${shipEditId}`,
      
      
      {
        "shipping_order_name": shipping_order_name, 
        'ponumber':foreginponumber,
        'date':date,
         

        'company':foregincompany,
       
        "createdby":createdby,
        // 'status':status,
        "loggedInUser":username,
        'userrole':currentUserrole,
        // 'po':ponumber
        "ponumber":uniqueID,
        
      },
      {
        auth: {
          username: username,
          password: password
        }
      }
      )
      .then(() => {
        navigate("/shipping/shippingdatagrid");
      });
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
        <td class="productionOrderReportSearchTD"> Name</td>
          <td class="productionOrderReportSearchTD">
          {namefield}
          </td>
        </tr>
        <tr>
        <td class="productionOrderReportSearchTD"> Created By</td>
          <td class="productionOrderReportSearchTD">
          {createdbyfield}
          </td>
        </tr>
        <tr>
        <td class="productionOrderReportSearchTD"> Date</td>
        <td class="productionOrderReportSearchTD">
          {datefield}
          </td>
        </tr>
        <tr>
        <td class="productionOrderReportSearchTD"> Company Name</td>
                      <td class="productionOrderReportSearchTD">
          {companynamefield}
          </td>
        </tr>
        <tr>
        <td class="productionOrderReportSearchTD"> Product Number</td>
                      <td class="productionOrderReportSearchTD">
          {ponumberfield}
          </td>
        </tr>
        
        {/* <tr>
        <td class="productionOrderReportSearchTD"> Status</td>
                      <td class="productionOrderReportSearchTD">
          {statusfield}
          </td>
        </tr> */}
        <tr>
       
      <tr></tr>
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
        </tr>
      </tbody>
        </table> 
    </> 



  )
}

export default Shipingrcreate    