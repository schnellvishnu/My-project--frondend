import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
 import Navbar from "../../components/Navigation/Navbar";
// import { SidebarData } from "../../components/SidebarData";

import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';



const Customerdatagrid=()=> {
  const[data,setData]=useState("");
  const [tabledark, setTableDark] = useState("");
  const [userDataRows, setUserDataRows] = useState([]);

var username = window.localStorage.getItem('username')
var password = window.localStorage.getItem('password')
var currentUserrole = window.localStorage.getItem('userrole')

const navigate = useNavigate();
function logout(){
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("password");

  navigate("/");
}
  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'name',headerName: 'Customer Name', width: 180 },
   
    { field: 'city', headerName: 'City', width: 100 },
    { field: 'state', headerName: 'State', width: 150 },

    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'created_by', headerName: 'Created By', width: 170 },
    { field: 'description', headerName: 'Description', width: 170 },
    { field: 'address', headerName: 'Address', width: 170 },
    { field: 'company_name', headerName: 'Company name', width: 170 },
    { field: 'status', headerName: 'Status', width: 170 },
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
            navigate("/customer/cuscreate/edit/"+ thisRow.id)
        }
        const api2: GridApi = params.api;
        const thisRow2: Record<string, GridCellValue> = {};

        api2
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),
          );
        if(currentUserrole == 'admin'&& thisRow2.created_by==username){
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
        const api3: GridApi = params.api;
        const thisRow3: Record<string, GridCellValue> = {};

        api3
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow3[c.field] = params.getValue(params.id, c.field)),
          );
          
  if( thisRow3.status=='True') {

    return("Confirmed");
  

    }
    else
      
    return("Not Confirmed");
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
                .delete(`http://127.0.0.1:8000/masterapp/customer/delete/${thisRow.id}`,
                
                {
                  data: { 
                    loggedInUser:username,
                    userrole :currentUserrole
                  }, 
                  headers: { 
                    "Authorization": "***" 
                  } 
                }
              )
              .then(() => {
                getData();
                //alert("anu");
                //navigate("/account/read");
                window.location.reload();
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
        rowDatas.map (rowData =>{
          
          axios
          .get("http://127.0.0.1:8000/masterapp/company/"+rowData.company_name,
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
            if(rowData.status==true){
              rowData.status="Confirmed"
            }
            else{
              rowData.status="Not Confirmed"
            }
          setUserDataRows(userDataRows =>[
            ...userDataRows,
            {'id':rowData.id,'name':rowData.name,'city':rowData.city,'state':rowData.state,'country':rowData.country,'created_by':rowData.created_by,'description':rowData.description,'address':rowData.address,
            'company_name':res.data[0].name,"status":rowData.status}
          ])
        })
      })
        
      }

      function getData(){
      
        axios
        .get(`http://127.0.0.1:8000/masterapp/customer/`,
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

      const navigateToCreatePage = () => {
        navigate("/customer/cuscreate/new/new");
      };
      useEffect(()=>{
        if(window.localStorage.getItem('username') && window.localStorage.getItem('password')) {
          getData();
           }
           else{
            navigate("/");
           }

      },[])
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

  return(
    <>
    <Navbar/> 
   
   
      <div style={{ height: 700, width: '240%',backgroundImage: `url("https://img.freepik.com/free-vector/realistic-white-monochrome-background_23-2149023988.jpg?size=626&ext=jpg&ga=GA1.2.1508111170.1671688676&semt=ais")` }}>
        <h5>CUSTOMERS</h5>
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        
        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>
      </>
  )
  
 
  
}

export default Customerdatagrid  