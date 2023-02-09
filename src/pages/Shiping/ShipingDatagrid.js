import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";

import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
                    GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';
                  // import background from "../../image/img6.jpg";

function ShipingDatagrid() {

const [data, setData] = useState([]);
const [tabledark, setTableDark] = useState("");
                  
const [userDataRows, setUserDataRows] = useState([]);
  
const navigate=useNavigate();

function logout(){
  window.localStorage.removeItem("username");
  window.localStorage.removeItem("password");
  
  navigate("/account/login");
}
var username = window.localStorage.getItem('username')
var password = window.localStorage.getItem('password')
var currentUserrole = window.localStorage.getItem('userrole')

let userDataColumns=[
{ field: 'id', headerName: 'Id', width: 100 },
{ field: 'shipping_order_name', headerName: 'Shipping Order Name', width: 180 },
{ field: 'ponumber', headerName: 'Ponumber', width: 160 },
{ field: 'company', headerName: 'Company', width: 160 },
{ field: 'date', headerName: 'Date', width: 160 },
{ field: 'createdby', headerName: 'Createdby', width: 160 },
{ field: 'po', headerName: 'Po', width: 160 },
{ field: 'status', headerName: 'Status', width: 160 },
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
                        //alert(thisRow.name);
                        navigate("/shipping/shippingcreate/edit/"+ thisRow.id+"/"+thisRow.po)
              
           
                        // setToLocalStorage(
                        //   thisRow.id,
                        //   thisRow.name,
                        //   thisRow.company_prefix,
                        //   thisRow.company_gln,
                        //   thisRow.address,
                        //   thisRow.zip,
                        //   thisRow.created_by,
                        // );
                
                        //return alert(JSON.stringify(thisRow, null, 4));
                      };
                
                      //alert(currentUserrole);
            
              
                      if(currentUserrole == 'admin') {
                        return <button
                          className="btn btn-primary" 
                          onClick={onClick}><i class="fa-solid fa-pen"></i></button>;
                       
                      }
                      else {
                        return <button
                          className="btn btn-primary" 
                          disabled="true"
                          onClick={onClick}><i class="fa-solid fa-pen"></i></button>;
                      }
                    },
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
                          .delete(`http://127.0.0.1:8000/masterapp/shippo/delete/${thisRow.id}`,
                          
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
    // alert("anu")
    axios
    .get("http://localhost:8000/masterapp/products/"+rowData.ponumber,
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


      axios
      .get("http://127.0.0.1:8000/masterapp/company/"+rowData.company,
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
      .then((res2) => {
    setUserDataRows(userDataRows =>[
      ...userDataRows,
      {'id':rowData.id,'shipping_order_name':rowData.shipping_order_name,'ponumber':res.data[0].name,'company':res2.data[0].name,'date':rowData.date,'createdby':rowData.createdby,'status':rowData.status,'po':rowData.po}
    ])
  })
})
})  
}

function getData(){
      
  axios
  .get(`http://127.0.0.1:8000/masterapp/shippo/`,
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
  navigate("/shipping/shippingcreate/new/new");
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
                   
                   
                      <div style={{ height: 700, width: '120%',backgroundImage: `url("https://img.freepik.com/free-vector/realistic-white-monochrome-background_23-2149023988.jpg?size=626&ext=jpg&ga=GA1.2.1508111170.1671688676&semt=ais")` }}>
                        <h5>SHIPPING</h5>
                        <button align='right'
                        disabled={currentUserrole=="operator" || currentUserrole==="staff" ? true : false}
                        onClick={navigateToCreatePage} 
                        className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                        
                        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
                       
                      </div>
                      </>
  )
}

export default ShipingDatagrid