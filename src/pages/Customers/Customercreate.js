import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import Select from "react-select";




const Customercreate=()=> {
     const[id,setId] =useState("");
     const[name,setName] =useState("");
     const[created_by,setCreated_by]=useState("");
     const[description,setDescription]=useState("");
     const[address,setAddress] =useState("");
     const[country,setCountry]=useState("") ;
     const[state,setState]  =useState("") ;
     const[city,setCity]  =useState("");
     const[status,setStatus]=useState("");
    //  const[company_name,setCompanyName] =useState("");
     const[foreginkeycompanyname,setForeginCompany]=useState("");

     //foreginkey vale disply in edit box operation
     const[companynamedisp,setCompanynamedisp]=useState("");

//wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     const navigate = useNavigate();
//      ////    for receiving the parameters from URL
     const {uniqueID}=useParams();
     const{operation}=useParams();

    

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')

  let optionNew=[];
  
  function selectedCustomerlocation(cuslocfunparam) {
    //alert("anu");
    axios   
      .get("http://127.0.0.1:8000/masterapp/company/",
        {
          auth: {
            username: username,
            password: password
          }
        },
        {
          'param': 'anu' 
        }
      )
      .then((res) => {
        // let batchNumberOptionsInitial = "";
        res.data.map(data => {
        if(data.id==cuslocfunparam){
          setCompanynamedisp(data.name);
          // setCuslocvalue(data.id);
        }
          // optionsname.push({ label:data.name })

        });
      
        setForeginCompany(optionNew);
        // setOptionName((localStorage.setItem(optionsName)))
        // alert(optionsName)
        
      });
  }

  function getCustomerEditData(){
       var customerEditId=uniqueID;
       

       axios
       .get("http://localhost:8000/masterapp/customer/"+customerEditId+"/",
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
           setName(res.data[0].name)
           setAddress(res.data[0].address)
           setCity(res.data[0].city)
           setForeginCompany(res.data[0].company_name)
           setCountry(res.data[0].country)
           setState(res.data[0].state)
           setCreated_by(res.data[0].created_by)
           setDescription(res.data[0].description)
           setStatus(res.data[0].status)

       })           
  }

  function getCompanyforegin(){
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
      optionNew.push({value:data.id,label:data.name})
    });
    setForeginCompany(optionNew);
  })
  }

  useEffect(()=>{
    getCompanyforegin();
     if (operation === 'edit'){

           getCustomerEditData();         
     }               
  },[])

 const getCompanyname=event=>{
  // alert(event.value)
  setForeginCompany(event.value);
  setCompanynamedisp(event.label)


  }

  if(operation ==="new"){
     var headfield=<h3>Create</h3> 
     
     var namefield=<input 
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setName(e.target.value)}
     />

     var addressfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setAddress(e.target.value)}
     />

     var countryfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setCountry(e.target.value)}
     />

     var cityfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setCity(e.target.value)}
     />
     var desfield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setDescription(e.target.value)}
     />
     var statefield=<input
     type="text"
     className="form-control form-control-sm"
     onChange={(e)=>setState(e.target.value)}
     />

     var companynamefield=
     <Select options={foreginkeycompanyname} onChange={getCompanyname}></Select>
 
     //
     var createdbyfield=<input
     type="text"
     className="form-control form-control-sm"
     value={username}
     onChange={(e)=>setCreated_by(e.target.value)}
     />

 }
 else if(operation ==="edit"){
      var headfield=<h3>Update</h3> 
      
      var namefield=<input 
     type="text"
     value={name}
     className="form-control form-control-sm"
     
     onChange={(e)=>setName(e.target.value)}
     />

     var addressfield=<input
     type="text"
     className="form-control form-control-sm"
     value= {address}
     onChange={(e)=>setAddress(e.target.value)}
     />

     var countryfield=<input
     type="text"
     className="form-control form-control-sm"
     value={country}
     onChange={(e)=>setCountry(e.target.value)}
     />

     var cityfield=<input
     type="text"
     value={city}
     className="form-control form-control-sm"
     onChange={(e)=>setCity(e.target.value)}
     />
     var desfield=<input
     type="text"
     className="form-control form-control-sm"
     value={description}
     onChange={(e)=>setDescription(e.target.value)}
     />
     var statefield=<input
     type="text"
     value={state}
     className="form-control form-control-sm"
     onChange={(e)=>setState(e.target.value)}
     />

     var companynamefield=
     <Select options={foreginkeycompanyname} onChange={getCompanyname} value={{value:foreginkeycompanyname,label:companynamedisp}}></Select>

     var createdbyfield=<input
     type="text"
     className="form-control form-control-sm"
     value={created_by}
     onChange={(e)=>setCreated_by(e.target.value)}
     />
      
 }

 const handleSubmit= (e) =>{
  e.preventDefault();
  console.log("clicked")

  var customerEditId =uniqueID;

  if(operation === 'new') {
    // alert(foreginkeycompanyname)
    axios
      .post('http://localhost:8000/masterapp/customer/', 
      {
        "name":name, 
        'address':address, 
        'state':state,
        'country':country,
        "created_by":username,
        'city':city,
        'description':description,  
        'company_name':foreginkeycompanyname,
        'status':status,
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
        navigate("/customer/customerdatagrid");
      });
      
  }

  else if(operation === 'edit') {
    // alert( name) 
    axios
      .put(`http://localhost:8000/masterapp/customer/update/${customerEditId}`,
      
      
      {
        "name":name,  
        'company_name':foreginkeycompanyname,
        'city':city,
        'state':state,
        'country':country,
        'address':address,
        'description':description,    
        "created_by": created_by,
        'status':status,
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
        navigate("/customer/customerdatagrid");
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
              <td class="productionOrderReportSearchTD">Name</td>
              <td class="productionOrderReportSearchTD">
                {namefield}
                </td>
            </tr>
            <tr>
              <td class="productionOrderReportSearchTD">Country</td>
                <td class="productionOrderReportSearchTD">
                  {countryfield}
              </td>
            </tr>
            <tr>
              <td class="productionOrderReportSearchTD"> State</td>
              <td class="productionOrderReportSearchTD">
                {statefield}
              </td>
            </tr>
            <tr>
              <td class="productionOrderReportSearchTD"> Address</td>
              <td class="productionOrderReportSearchTD">
                {addressfield}
              </td>
            </tr>
            <tr>
            <td class="productionOrderReportSearchTD"> City</td>
              <td class="productionOrderReportSearchTD">
                {cityfield}
              </td>
            </tr>
            
            <tr>
              <td class="productionOrderReportSearchTD"> Description</td>
                <td class="productionOrderReportSearchTD">
                  {desfield}
                </td>
            </tr>
            <tr>
              <td class="productionOrderReportSearchTD"> Company Name</td>
              <td class="productionOrderReportSearchTD">
                {companynamefield}
              </td>
            </tr>

            <tr>
              <td class="productionOrderReportSearchTD">Created By</td>
              <td class="productionOrderReportSearchTD">
                {createdbyfield}
              </td>
            </tr>

          <tr></tr>
          <tr>
                  <td class="productionOrderReportSearchTD">Status</td>
                  <td class="productionOrderReportSearchTD">
                  <input type="checkbox" checked={status} onChange={e => setStatus(e.target.checked)}/>
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

export default Customercreate    