import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
 import Navbar from "../../components/Navigation/Navbar";
// import { SidebarData } from "../../components/SidebarData";

import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';




const Companydatagrid=() =>{
  const[data,setData]=useState("");
  const [tabledark, setTableDark] = useState("");
  const [userDataRows, setUserDataRows] = useState([]);

  ///   For navigate function
  const navigate = useNavigate();

  function logout(){
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

    navigate("/");
  }

 var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')

  function handleDelete(id){
    axios
    .delete(`http://127.0.0.1:8000/masterapp/company/delete/${id}`,
    {
      auth: {
        username:username,
        password:password

      }
    })
    .then(()=>{
      navigate("company/companydatagrid");
    });
  }

  const setToLocalStorage = (id,name,zip,state,country,created_at)=>{
    localStorage.setItem("id", id);
    localStorage.setItem("name",name);
    localStorage.setItem("zip",zip);
    localStorage.setItem("country",country);
    localStorage.setItem("created_at",created_at);


  }

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'name',headerName: 'Company Name', width: 180 },
   
    { field: 'zip', headerName: 'Zip', width: 100 },
    { field: 'state', headerName: 'State', width: 150 },

    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'created_at', headerName: 'Created At', width: 170 },
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
            navigate("/company/comcreate/edit/"+ thisRow.id)
        }
        if(currentUserrole == 'admin'){
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

        const api2: GridApi = params.api;

    const thisRow2: Record<string, GridCellValue> = {};



    api2

      .getAllColumns()

      .filter((c) => c.field !== '__check__' && !!c)

      .forEach(

        (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),

      );

  //alert(currentUserrole);



   

  if( thisRow2.status=='True') {

    return("Confirmed");
  

    }
    else
      
    return("Not Confirmed");
      }
    },
    //http://127.0.0.1:8000/masterapp/company/delete/${thisRow.id}
        {
          field: 'delete',
          headerName: 'Detete',
          sortable: false,
          renderCell: (params) => {
            const onClick = (e) => {




              const confirmBox = window.confirm(
                "Do you really want to delete this Crumb?"
              )
              if (confirmBox === true) { 
          
          
          
          
                e.stopPropagation(); // don't select this row after clicking
          
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
          
                api
                  .getAllColumns()
                  .filter((c) => c.field !== '__check__' && !!c)
                  .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                  );
                //alert(thisRow.id);
          
                //return alert(JSON.stringify(thisRow, null, 4));
          
                axios
                .delete(`http://127.0.0.1:8000/masterapp/company/delete/${thisRow.id}`,
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
          
          
          
          
              }
          
              
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
          if(rowData.status==true){
            rowData.status="Confirmed"
          }
          else{
            rowData.status="Not Confirmed"
          }
          setUserDataRows(userDataRows =>[
            
            ...userDataRows,
            
            {'id':rowData.id,'name':rowData.name,'zip':rowData.zip,'state':rowData.state,'country':rowData.country,'created_at':rowData.created_at,'status':rowData.status}
          ])
        })  
      }

      function getData(){
        axios
        .get(`http://127.0.0.1:8000/masterapp/company/`,
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

      function handleDelete(id){
        axios
        .delete(`http://localhost:8000/masterapp/company/delete/${id}`,
          {
            auth: {
              username: username,
              password: password
            }
          }
        )
        .then(() => {
          getData();
        });

      }

      const navigateToCreatePage = () => {
        navigate("/company/comcreate/new/new");
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





                    

  return (
    <>
    <Navbar/> 
   
   
      <div style={{ height: 700, width: '390%',backgroundImage: `url("https://img.freepik.com/free-vector/realistic-white-monochrome-background_23-2149023988.jpg?size=626&ext=jpg&ga=GA1.2.1508111170.1671688676&semt=ais")` }}>
        <h5>COMPANYS</h5>
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        
        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>
      </>
  )
}

export default Companydatagrid  