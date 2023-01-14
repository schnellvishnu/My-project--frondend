import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";

import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
                    GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';
                  
function StockDatagrid() {

const[data,setData]=useState("");
const [tabledark, setTableDark] = useState("");
const [userDataRows, setUserDataRows] = useState([]);


const navigate=useNavigate();

var username=window.localStorage.getItem("username")
var password=window.localStorage.getItem("password")
var currentUserrole=window.localStorage.getItem("userrole")

function logout(){
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("password") 
    navigate("/");               
}

let userDatacolumns=[
  { field: 'id', headerName: 'Id', width:110 },
  { field: 'ponumber', headerName: 'Ponumber', width:180 },
  { field: 'name', headerName: 'Name', width:180 },
  { field: 'description', headerName: 'Description', width:180 },
  { field: 'created_by', headerName: 'Created By', width:180 },
  { field: 'created_at', headerName: 'Created At', width:180 },
  { field: 'updated_at', headerName: 'Updated At', width:180 },
  { field: 'status', headerName: 'Status', width:180 },

  {
 field: 'edit',
headerName: 'Edit',
 sortable: false,
renderCell: (params) => {
const onClick = (e) => {
 e.stopPropagation(); // don't select this row after clicking
                                   
const api: GridApi = params.api;
const thisRow: Record<string, GridCellValue> = {};
                                   
api
 .getAllColumns()
.filter((c) => c.field !== '__check__' && !!c)
.forEach(
(c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                                        );
 navigate("/product/productcreate/edit/"+ thisRow.id)
  }

 const api2: GridApi = params.api;
const thisRow2: Record<string, GridCellValue> = {};

api2
.getAllColumns()
 .filter((c) => c.field !== '__check__' && !!c)
 .forEach(
  (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),
         );

 if(currentUserrole == 'admin' && thisRow2.status=='Draft'){
 return <button
 className="btn btn-primary" 
   onClick={onClick}>Edit</button>;
 }

 else{

 return <button
 className="btn btn-primary"
 disabled="true"
 onClick={onClick}>Edit</button>;
}
 }
 },


 {
  field: 'delete',
  headerName: 'Detete',
     sortable: false,
  renderCell: (params) => {
  const onClick = (e) => {
  e.stopPropagation(); // don't select this row after clicking
                                   
     const api: GridApi = params.api;
 const thisRow: Record<string, GridCellValue> = {};
                                   
 api
.getAllColumns()
   .filter((c) => c.field !== '__check__' && !!c)
  .forEach(
   (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
 );
                    
 axios
 .delete(`http://127.0.0.1:8000/masterapp/stock/delete/${thisRow.id}`,
                                             
  {
   auth: {
    username: username,
    password: password
   }
   }
  )
  .then(() => {
    getData();
                    //alert("anu");
                    //navigate("/account/read");
   window.location.reload()
                     });
 };
                             
    if(currentUserrole == 'admin'|| currentUserrole =='staff'){
  return <button
 className="btn btn-danger" 
 onClick={onClick}>Delete</button>;
 }
  else{
    return <button
 className="btn btn-danger" 
  disabled="true"
  onClick={onClick}>Delete</button>;
   }
},
},




]

function createRows(rowDatas){
  let editButton = <button></button>; 
   rowDatas.map(rowData=>{
     setUserDataRows(userDataRows=>[
        ...userDataRows,
        {"id":rowData.id,"ponumber":rowData.ponumber,"name":rowData.ponumber,
"description":rowData.description,"created_by":rowData.created_by,"created_at":rowData.created_at,
"updated_at":rowData.updated_at,"status":rowData.status}            
     
])               
   })               
}

function getData(){
   axios
   .get("http://127.0.0.1:8000/masterapp/stock/closed",

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
   .then((res)=>{
     setData(res.data)
     createRows(res.data)               
   })                 
}

useEffect(()=>{
  if(window.localStorage.getItem('username') && window.localStorage.getItem('password')) {
    getData();
     }
     else{
      navigate("/");
     }                
},[]);

const navigateToCreatePage =()=>{
   navigate("/stock/stockcreate/new/new")                
}


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}  

  return (
    <>
    <Navbar/> 
   
   
      <div style={{ height: 700, width: '130%',backgroundImage: `url("https://img.freepik.com/free-vector/realistic-white-monochrome-background_23-2149023988.jpg?size=626&ext=jpg&ga=GA1.2.1508111170.1671688676&semt=ais")` }}>
        <h5>STOCK</h5>
        <button align='right'
        disabled={currentUserrole=="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        
        <DataGrid rows={userDataRows} columns={userDatacolumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>        
      </>
  )
}

export default StockDatagrid