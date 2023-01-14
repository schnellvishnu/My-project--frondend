import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";

import * as  MdIcons from "react-icons/md";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';

function HistoryDatagrid() {
    const [data, setData] = useState([]);
    const [tabledark, setTableDark] = useState("");
  
    const [userDataRows, setUserDataRows] = useState([]);
  
    ///   For navigate function
    const navigate = useNavigate();
  
    function logout() {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("password");
  
      navigate("/account/login");
    }
  
    var username = window.localStorage.getItem('username')
    var password = window.localStorage.getItem('password')
    var currentUserrole = window.localStorage.getItem('userrole')
    //alert(window.localStorage.getItem('password'));
  
  
    function handleDelete(id) {
      axios
        .delete(`http://localhost:8000/accounts/history/delete/${id}`,
          {
            auth: {
              username: username,
              password: password
            }
          }
        )
        .then(() => {
          //getData();
          alert("anu");
          navigate("/audittrail/auditdatagrid");
        });
    }
  
   
  
    let userDataColumns = [
      { field: 'id', headerName: 'Id', width: 100 },
      { field: 'modelname', headerName: 'Model Name', width: 170 },
      { field: 'savedid', headerName:'User ID', width: 170 },
      { field: 'operationdone', headerName:'Operation', width: 170 },
      { field: 'donebyuser', headerName: 'User', width: 170 },
      { field: 'donebyUserRole', headerName: 'UserRole', width: 170 },
      { field: 'doneDateTime', headerName: 'Date and Time', width: 170 },
      
      {
        field: 'delete',
        headerName: 'Delete',
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
            //alert(thisRow.id);
      
            //return alert(JSON.stringify(thisRow, null, 4));
  
            axios
            .delete(`http://localhost:8000/accounts/history/delete/${thisRow.id}`,
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
              window.location.reload();
            });
          };
          if(currentUserrole == 'admin') {
          return <button
            className="btn btn-danger" 
            onClick={onClick}><i class="fa-solid fa-trash"></i></button>;
          }
          else{
            return <button
            className="btn btn-danger" 
            disabled="true"
            onClick={onClick}><i class="fa-solid fa-trash"></i></button>;
  
          }
        },
      },
    ];  
    // modelName,savedID,opertionDone,doneByUser,doneByUserRole,doneDateTime
  
    function createRows(rowDatas) {
      //alert(rowDatas.length);
  
      let editButton = <button></button>;  
  
      rowDatas.map(rowData => {
        // alert(rowData.opertionDone);
        setUserDataRows( userDataRows => [
          ...userDataRows,
          {'id':rowData.id,'modelname':rowData.modelname,'savedid':rowData.savedid,
          'operationdone':rowData.operationdone,'donebyuser':rowData.donebyuser,'donebyUserRole':rowData.donebyUserRole,
          'doneDateTime':rowData.doneDateTime},
        ]);
  
      })
    }
  
    function getData() {
      //alert("anu");
      axios
        .get("http://localhost:8000/accounts/history/",
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
          //alert(res.data.length);
          setData(res.data);
          createRows(res.data);
        });
    }
  
    function handleDelete(id) {
      axios
        .delete(`http://localhost:8000/accounts/history/delete/${id}`,
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
  
    // const navigateToCreatePage = () => {
    //   navigate("/audittrail/auditcreate/new");
    // };
  
    useEffect(() => {
      //console.log('i fire once');
      if(window.localStorage.getItem('username') && window.localStorage.getItem('password')) {
        getData();
      }
      else {
        navigate("/");
      }
  
      //alert("anu");
    }, []);
  
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
  
      <br/>
{/*   
      <div class="container"> */}
        <div class="row">
       
          <div class="col-10">
            <div className="prr" style={{ height: 700, width: '133%',backgroundImage: `url("https://img.freepik.com/free-vector/realistic-white-monochrome-background_23-2149023988.jpg?size=626&ext=jpg&ga=GA1.2.1508111170.1671688676&semt=ais")` }}>
            <br></br>   
            <h3>&nbsp;&nbsp;History</h3> 
              {/* <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button> */}
              <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
            </div>
          </div>
  
        </div>
      {/* </div> */}
  
    </>
    );
}

export default HistoryDatagrid