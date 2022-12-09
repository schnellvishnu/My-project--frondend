import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from '../../components/Navigation/Navbar';
// import Sidebar from "../Sidebar/Sidebar";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';
  import * as  AiIcons from "react-icons/ai";
import { elementAcceptingRef } from "@mui/utils";
  



const Podatagrid= () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");
  const [productionLineSystemName, setProductionLineSystemName] = useState("");
  const [productionOrderCounter, setProductionOrderCounter] = useState(0);

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
      .delete(`http://localhost:8000/master/productionorder/delete/${id}`,
        {
          auth: {
            username: username,
            password: password
          }
        }
      )
      .then(() => {
        //getData();
        // alert("anu");
        navigate("/po/podatagrid");
      });
  }

  const setToLocalStorage = (id, process_order_number,batch_number,manufacturing_location,product_conn,regulation,production_date,produced,requested,created_by,status) => {
    localStorage.setItem("id", id);
    localStorage.setItem("process_order_number", process_order_number );
    localStorage.setItem("batch_number", batch_number );
    localStorage.setItem("manufacturing_location", manufacturing_location );
    localStorage.setItem("product_conn", product_conn );
    // localStorage.setItem("Production_line_id", Production_line_id );
    localStorage.setItem("regulation", regulation);   
    localStorage.setItem("production_date", production_date);    
    localStorage.setItem("requested", requested);    
    localStorage.setItem("produced", produced);
    localStorage.setItem("created_by", created_by);
    localStorage.setItem("status", status);
    // localStorage.setItem("packaging_Version", packaging_Version);
    // localStorage.setItem("expiration_date", expiration_date);
  };

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'process_order_number', headerName: 'Process Order Number ', width: 230 },

     { field: 'batch_number', headerName: 'Batch Number ', width: 170 },

    { field: 'manufacturing_location', headerName: 'Manufacturing Location ', width: 230 },
    { field: 'product_conn', headerName: 'Product Name', width: 180 },
/*
    { field: 'Production_line_id', headerName: 'Productionline id ', width: 170 },
*/
    { field: 'regulation', headerName: 'Regulation', width: 170 },
    { field: 'production_date', headerName: 'Production Date', width: 180 },
    { field: 'produced', headerName: 'produced', width: 170 },
    { field: 'requested', headerName: 'requested', width: 170 },
    { field: 'created_by', headerName: 'created by', width: 170 },
    { field: 'status', headerName: 'Status', width: 170 },

/*
    { field: 'packaging_Version', headerName: 'packaging Version', width: 170 },
    { field: 'expiration_date', headerName: 'Expiration Date', width: 170 },
*/
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
          //alert(thisRow.id);
  
          window.localStorage.setItem("productionOrderEditID", thisRow.id);

          navigate("/po/pocreate/edit");

          /*
          setToLocalStorage(
            thisRow.id,
            thisRow.process_order_number,
            thisRow.manufacturing_location,
            thisRow.batch_number,
            thisRow.product_conn,
            thisRow.Production_line_id,
            thisRow.regulation,
            thisRow.production_date,
            thisRow.produced,
            thisRow.requested,
            thisRow.created_by,
            thisRow.Packaging_Version,
            thisRow.expiration_date,
            thisRow.status,
          );
        
          */

          //return alert(JSON.stringify(thisRow, null, 4));
        };

        const api2: GridApi = params.api;
        const thisRow2: Record<string, GridCellValue> = {};

        api2
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),
          );

          //if(currentUserrole == 'admin') {
        if(thisRow2.status == "Draft" && currentUserrole == 'admin') {
          return <button
            className="btn btn-primary" 
            onClick={onClick}><i class="fa-solid fa-pen"></i></button>;
            //EDIT
         
        }
        else {
          return <button
            className="btn btn-primary" 
            disabled="true"
            onClick={onClick}><i class="fa-solid fa-pen"></i></button>;
            //EDIT
        }
  
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
          .delete(`http://localhost:8000/master/productionorder/delete/${thisRow.id}`,
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
        const api2: GridApi = params.api;
        const thisRow2: Record<string, GridCellValue> = {};

        api2
          .getAllColumns()
          .filter((c) => c.field !== '__check__' && !!c)
          .forEach(
            (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),
          );
        if(currentUserrole == 'admin' &&  thisRow2.status =="Draft") {
        return <button
          className="btn btn-danger" 
          //DELETE
          onClick={onClick}><i class="fa-solid fa-trash"></i></button>;
        }
        else if(currentUserrole == 'staff' &&  thisRow2.status =="Draft" ){
          return <button
          className="btn btn-danger" 
          //DELETE
          onClick={onClick}><i class="fa-solid fa-trash"></i></button>;

        }
     
       
        else{
          return <button
          className="btn btn-danger" 
          disabled="true"
          //DELETE
          onClick={onClick}><i class="fa-solid fa-trash"></i></button>;

        }
      },
    },




    {
      field: 'properties',
      headerName: 'Properties',
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
  
          window.localStorage.setItem("productionOrderEditID", thisRow.id);

          navigate("/po/poproperties/new");


          
          /*
          setToLocalStorage(
            thisRow.id,
            thisRow.process_order_number,
            thisRow.manufacturing_location,
            thisRow.batch_number,
            thisRow.product_conn,
            thisRow.Production_line_id,
            thisRow.regulation,
            thisRow.production_date,
            thisRow.produced,
            thisRow.requested,
            thisRow.created_by,
            thisRow.Packaging_Version,
            thisRow.expiration_date,
            thisRow.status,
          );
        
          */

          //return alert(JSON.stringify(thisRow, null, 4));
        };

     

          //if(currentUserrole == 'admin') {
   
  
        //alert(currentUserrole);


        if(currentUserrole == 'admin') {
          return <button
            className="btn btn-primary" 
            //PROPERTIES
            onClick={onClick}><i class="fa-solid fa-folder-open"></i></button>;
         
        }
        else {
          return <button
            className="btn btn-primary" 
            disabled="true"
            //PROPERTIES
            onClick={onClick}><i class="fa-solid fa-folder-open"></i></button>;
        }
      },
    },
//<i class="fa-sharp fa-solid fa-paper-plane"></i>
{

  field: 'shipping',

  headerName: 'Shipping',

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



      window.localStorage.setItem("productionOrderIDforShippingOrder", thisRow.id);

      // window.localStorage.setItem("productionid", thisRow.product_conn);

      navigate("/shippo/shippodatagrid/");




      //return alert(JSON.stringify(thisRow, null, 4));

    };
    const api2: GridApi = params.api;

    const thisRow2: Record<string, GridCellValue> = {};



    api2

      .getAllColumns()

      .filter((c) => c.field !== '__check__' && !!c)

      .forEach(

        (c) => (thisRow2[c.field] = params.getValue(params.id, c.field)),

      );

  //alert(currentUserrole);



   

  if(currentUserrole == 'admin' && thisRow2.status=='Closed') {

    return <button

      className="btn btn-primary"

      onClick={onClick}><i class="fa-sharp fa-solid fa-paper-plane"></i></button>;

    }

    // else{

    //   return <button

    //   className="btn btn-primary"

    //   disabled="true"

    //   onClick={onClick}><GiIcons.GiCargoShip size={23}/></button>;



    // }

  //if(currentUserrole == 'admin') {









},

},

  ];  


  // function createRows(rowDatas) {
  //   //alert(rowDatas.length);

  //   let editButton = <button></button>;  

  //   rowDatas.map(rowData => {
  //     //alert(rowData.id);
  //     setUserDataRows( userDataRows => [
  //       ...userDataRows,
  //       {'id':rowData.id, 'process_order_number':rowData.process_order_number,'batch_number':rowData.batch_number,
  //      'manufacturing_location':rowData.manufacturing_location,'Production_line_id':rowData.Production_line_id,'product_conn':rowData.product_conn,
  //      'regulation':rowData.regulation,'production_date':rowData.production_date,'produced':rowData.produced,'requested':rowData.requested,
  //      'created_by':rowData.created_by,'status':rowData.status,'packaging_Version':rowData.packaging_Version,'expiration_date':rowData.expiration_date},
  //     ]);

  //   })
  // }
  function createRows(rowDatas) {
    //alert(rowDatas.length);

    rowDatas.map(rowData => {
      
      axios
      .get("http://localhost:8000/productionline/manufacturinglocation/"+rowData.manufacturing_location,
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
        //alert(res.data[0].name);
        //setProductionLineSystemName(res.data[0].system_name);

        axios
        .get("http://127.0.0.1:8000/master/product/"+rowData.product_conn,
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
          //alert(res.data[0].system_name);
          //setProductionLineSystemName(res.data[0].system_name);
  
          //alert(res2.data[0].name);
  
          setUserDataRows(userDataRows => [
            ...userDataRows,
            {
              'id':rowData.id, 
              'process_order_number':rowData.process_order_number,
              'batch_number':rowData.batch_number,
              'manufacturing_location':res.data[0].name,
              //'Production_line_id':res.data[0].system_name,
              'product_conn':res2.data[0].name,
              'regulation':rowData.regulation,
              'production_date':rowData.production_date,
              'produced':rowData.produced,
              'requested':rowData.requested,
              'created_by':rowData.created_by,
              'status':rowData.status,
              // 'packaging_Version':rowData.packaging_Version,
              // 'expiration_date':rowData.expiration_date
            },
          ]);
        });

      });

    })
  }
  // 'production_date':rowData.production_date,'produced':rowData.produced,'requested':rowData.requested,
  function getData() {
    //alert("anu");
    axios
      .get("http://127.0.0.1:8000/master/productionorder/",
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
      .delete(`http://localhost:8000/master/productionorder/delete/${id}`,
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
    navigate("/po/pocreate/new");
  };
const navigateToHrfPage =()=>{
  navigate("/po/pohrfcreate/new")
}
const navigateToPropertiesPage =()=>{
  navigate("/po/poproperties/new")
}

  useEffect(() => {
    //console.log('i fire once');
    getData();
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


    <div class="container">
      <div class="row">
      {/* <div class="col-2">

<Sidebar currentPage="Podatagrid"/>
</div> */}
        <div class="col-10">

          <div className="spinner-container">
            <div className="loading-spinner">
            </div>
          </div>

          <div style={{ height: 650, width: '390%',backgroundColor:'#6199c7' }}>
            <h3>Production Order</h3>
            <button align='right'
      disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
      onClick={navigateToCreatePage} 
      className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <button align='right'
  
      onClick={navigateToHrfPage} 
      className="btn btn-success">HRF</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button align='right'
  
  onClick={navigateToPropertiesPage} 
  className="btn btn-success">Properties</button>
 
            <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={5} components={{ Toolbar: CustomToolbar }}/>
          </div>
        </div>

      </div>
</div>

  </>
  );
};

export default Podatagrid;