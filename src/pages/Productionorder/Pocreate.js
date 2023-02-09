
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import Select from "react-select";
 import * as  AiIcons from "react-icons/ai";
import { Alert } from "bootstrap";
import moment from "moment";
// import Sidebar from "../Sidebar/Sidebar";

const Pocreate=()=>{

  let statusOptions = [ {value:"Draft", label:"Draft"},
                      {value:"Inproduction", label:"Inproduction"},
                      {value:"Closed", label:"Closed"},
                      {value:"Shipping", label:"Shipping"}
                    ];

  ////  Warning section

  var warningDIVcontentFillData = "Input all the values"

  var warningDIV = <div className="alert alert-success pt-4" role="alert">
                        <h5>Input all the values</h5>
                     </div>

  /////   End warning section

  const [id, setId] = useState(0);
  const [manufacturinglocations,setManufacturinglocations]=useState("");
  const [manufactureforegin,setManufactureforegin]=useState("");
  // const[man,setMan]=useState("")
  const [products,setProducts]=useState("");
  const [prodforegin,setProdforegin]=useState("");
  const [productionline,setProductionline]=useState("");
  const [productionforegin,setProductionforegin]=useState("");
  const [processOrderNumber, setProcessOrderNumber] = useState("");
  const [batch,setBatch]=useState("");
  const [created_by,setCreatedby]=useState("");
  const [status,setStatus]=useState("");
  const [regulation,setRegulation]=useState("");
  const [packaging_Version,setPackVer]=useState("");
  const [expiration_date,setExpir]=useState("");
  const [production_date,setProductiondate]=useState("");
  const [productionOrderEditID, setProductionOrderEditID] = useState();
  const [statusOptionsSelected, setStatusOptionsSelected] = useState("");
  const [statusOptionsState, setStatusOptionsState] = useState(statusOptions);
  const [statusReceivedFromDataGrid, setStatusReceivedFromDataGrid] = useState("");
  const [availableProcessOrderNumbersState, setAvailableProcessOrderNumbersState] = useState("");
  const [warningDIVstate, setWarningDIVstate] = useState(warningDIV);
  const [showPropertiesState, setShowPropertiesState] = useState(false);

  

  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  let optionsNew=[]
  let optionsNewproduct=[]
  let optionsNewline=[]
  const navigate = useNavigate();

  let availableProcessOrderNumbers = [];

  const numbers = [1, 2, 3, 4, 5];

  function getProductOrderEditRequestData() {
    var productionOrderEditID = window.localStorage.getItem("productionOrderEditID");
    //alert(productionOrderEditID);
    axios
      .get("http://127.0.0.1:8000/master/productionorder/"+productionOrderEditID+"/",
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
    .then((res) => {
      
      setCreatedby(res.data[0].created_by);
      setRegulation(res.data[0].regulation);
      setProductiondate(moment(res.data[0].production_date).utc().format('YYYY-MM-DD'));
      setPackVer(res.data[0].packaging_Version);
      //setExpir(res.data[0].expiration_date);
      setExpir(moment(res.data[0].expiration_date).utc().format('YYYY-MM-DD'));
      setStatusOptionsSelected(res.data[0].status);

      setProcessOrderNumber(res.data[0].process_order_number);
      setBatch(res.data[0].batch_number);
      setManufactureforegin(res.data[0].manufacturing_location);
      setProdforegin(res.data[0].product_conn);
      setProductionforegin(res.data[0].Production_line_id);

      setStatusReceivedFromDataGrid(res.data[0].status);
    });
  } 

  useEffect(() => {

    //alert(window.localStorage.getItem("productionOrderEditID"));

    if(operation === 'edit') {
      getProductOrderEditRequestData();
    }
    getManufacturinglocations() ;
    getProducts() ;
    getProductionlines() ;
    getAllProcessOrderNumberDataFromSAP();
  
  }, []);


  const statusOptionsChangeFunction = event => {
    //setBatchNumber(event.value);    
    //alert(event.value);

    setStatusOptionsSelected(event.value);
  }

  function getProcessOrderNumberData() {
    //alert(processOrderNumber);

    if(processOrderNumber == "") {
      warningDIV =  <div className="alert alert-danger pt-4" role="alert">
          <h5>Input process order number</h5>
        </div>

      setWarningDIVstate(warningDIV);
    }

    axios
    .get("http://127.0.0.1:8000/sapapp/sapproductionorder/"+processOrderNumber+"/",
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
    .then((res) => {
        if(res.data.length > 0) {
          setBatch(res.data[0].batch_number)
          // setMan(res.data[0].manufacturing_location)
          setCreatedby(res.data[0].created_by)
          setStatus(res.data[0].status)
          setProductiondate(moment(res.data[0].production_date).utc().format('YYYY-MM-DD'))
          setExpir(moment(res.data[0].expiration_date).utc().format('YYYY-MM-DD'))
          //setPackVer(res.data[0].packaging_Version)
          //setRegulation(res.data[0].regulation)

          warningDIV =  <div className="alert alert-success pt-4" role="alert">
              <h5>Production order fetched from SAP successfully</h5>
            </div>

          setWarningDIVstate(warningDIV);
        }
        else {
          warningDIV =  <div className="alert alert-danger pt-4" role="alert">
              <h5>Such a process order number does not exists in SAP</h5>
            </div>

          setWarningDIVstate(warningDIV);
        }
    });
  }

  function getAllProcessOrderNumberDataFromSAP() {
    //alert(processOrderNumber);

    axios
    .get("http://127.0.0.1:8000/sapapp/sapproductionorder/",
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
    .then((res) => {
      res.data.map(data => {
        //alert(data.process_order_number);
        availableProcessOrderNumbers.push(data.process_order_number);
      });

      const availableProcessOrderNumbersList = availableProcessOrderNumbers.map((number) =>  <li class="list-group-item">{number}</li>);

      setAvailableProcessOrderNumbersState(availableProcessOrderNumbersList);
    });
  }

  const getManufacturingasoptions = event => {
    // alert(event.value)
    setManufactureforegin(event.value); 
    // setCustomername(event.label); 
    //  window.localStorage.setItem(option)    
  }
  const getProductasoptions = event => {
    // alert(event.value)
    setProdforegin(event.value); 
    // setCustomername(event.label); 
    //  window.localStorage.setItem(option)    
  }
  const getProductionlineasoptions = event => {
    //alert(event.value)
    setProductionforegin(event.value); 
    // setCustomername(event.label); 
    //  window.localStorage.setItem(option)    
  }
  
  var propertiesWidget = 
    <table class="table table-borderless productionOrderReportSearchTable" id="productionOrderReportSearchTableID">
      <tbody>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
        <tr>
          <td class="productionOrderReportSearchTD">Process Order Number</td>
          <td class="productionOrderReportSearchTD">
              <input
                  type="text"
                  className="form-control"
              /> 
          </td>
        </tr>
      </tbody>
    </table>

  function getManufacturinglocations() {
    axios
      .get("http://localhost:8000/productionline/manufacturinglocation/",
      {
        auth: {
          username: username,
          password: password
        }
      },
      {
        'param': 'anu' 
      })
      .then((res) => {
        // let batchNumberOptionsInitial = "";
        // alert("anu")
        res.data.map(data => {
        optionsNew.push({ value: data.id, label: data.name });
      });
        
      setManufacturinglocations(optionsNew);
      //  alert(optionsNew)
    });
  }

  function getProducts() {
    axios
    .get("http://localhost:8000/master/product/",
    {
      auth: {
        username: username,
        password: password
      }
    },
    {
      'param': 'anu' 
    })
    .then((res) => {
      // let batchNumberOptionsInitial = "";
      // alert("anu")
      res.data.map(data => {
        optionsNewproduct.push({ value: data.id, label: data.name });
      });
            
      setProducts(optionsNewproduct);
        //  alert(optionsNew)
    });
  }

  function getProductionlines() {
    axios
     .get("http://localhost:8000/productionline/registeredsystem/",
      {
        auth: {
          username: username,
          password: password
        }
      },
      {
        'param': 'anu' 
      })
      .then((res) => {
        // let batchNumberOptionsInitial = "";
        //  alert("jinu")
        res.data.map(data => {
        optionsNewline.push({ value:data.id, label: data.line});
      });
                
      setProductionline(optionsNewline);
        // alert(productionline)
    });
  }
               
  if(operation=='new') {
    var processnowidget=<input
        type="text"
        className="form-control"
        onChange={(e) => setProcessOrderNumber(e.target.value)}
      />

    var fetchwidget=  <button className="btn btn-primary"
            onClick={() => getProcessOrderNumberData()}>
            <AiIcons.AiOutlineCloudDownload size={35}/>
        </button>

    var productwidget=<Select options={products} onChange={getProductasoptions}/>
    var batchnowidget=<input
        type="text"
        className="form-control"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        /> 
    var manufactwidget= <Select options={manufacturinglocations} onChange={getManufacturingasoptions}/>
    var createdbywidget=<input
        type="text"
        className="form-control"
        value={created_by}
        onChange={(e) => setCreatedby(e.target.value)}
        /> 
    var regulationwidget= <input
        type="text"
        className="form-control"
        value={regulation}
        onChange={(e) => setRegulation(e.target.value)}
        /> 
    var productiondatewidget=<input
          type="date"
          className="form-control"
          value={production_date}
          onChange={(e) => setProductiondate(e.target.value)}
        />
    var packageverwidget=<input
        type="text"
        className="form-control"
        value={packaging_Version}
        onChange={(e) => setPackVer(e.target.value)}
        /> 
    var expwidget=     <input
          type="date"
          className="form-control"
          value={expiration_date}
          onChange={(e) => setExpir(e.target.value)}
          /> 
    var statusOptionsWidget= <input
          type="text"
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        /> 
    var productionlinewidget= <Select options={productionline} onChange={getProductionlineasoptions}/>
  }
  else if(operation==='edit') {
    var createdbywidget=<input
          type="text"
          className="form-control"
          value={created_by}
          onChange={(e) => setCreatedby(e.target.value)}
          /> 
    var regulationwidget= <input
          type="text"
          className="form-control"
          value={regulation}
          onChange={(e) => setRegulation(e.target.value)}
        /> 
    var productiondatewidget=<input
        type="Date"
        className="form-control"
        value={production_date}
        onChange={(e) => setProductiondate(e.target.value)}
        />
    var packageverwidget=<input
        type="text"
        className="form-control"
        value={packaging_Version}
        onChange={(e) => setPackVer(e.target.value)}
        /> 
    var expwidget=  <input
        type="Date"
        className="form-control"
        value={expiration_date}
        onChange={(e) => setExpir(e.target.value)}
        /> 

    var statusOptionsWidget=  <Select onChange={statusOptionsChangeFunction} 
                                      options={statusOptionsState}
                                      value={{label:statusOptionsSelected, value:statusOptionsSelected}}
                                  />
  }

  const showProperties =(e) => {
    //alert("PAuls");
    //setShowPropertiesState(true);
    showPropertiesState ? setShowPropertiesState(false) : setShowPropertiesState(true);
  }

  const handleSubmit = (e) => {

    var productionOrderEditID = window.localStorage.getItem("productionOrderEditID");
    //alert(production);

    e.preventDefault();

    //alert(regulation);

    var testPassed = "false";

    ///////  Production order testing

    if(processOrderNumber != "") {
      testPassed = "true";
    }
    else {
      warningDIV =  <div className="alert alert-danger pt-4" role="alert">
        <h5>Input process order number</h5>
      </div>

      setWarningDIVstate(warningDIV);
      testPassed = "false";
    }

    //////////////////  Product name testing

    if(testPassed == "true") {
      if(prodforegin != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
            <h5>Input product name</h5>
          </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }
    
    ///////  Batch number testing

    if(testPassed == "true") {
      if(batch != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                        <h5>Input batch number</h5>
                      </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }

    ///////  Manufacturing location testing

    if(testPassed == "true") {
      if(manufactureforegin != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                        <h5>Input manufacturing location</h5>
                      </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }

    ////////   Regulation testing

    if(testPassed == "true") {
      if(regulation != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                        <h5>Input regulation</h5>
                      </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }

    //////////  Packing version testing

    if(testPassed == "true") {
      if(packaging_Version != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                        <h5>Input packing version</h5>
                      </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }

    ///////////  Production line testing

    if(testPassed == "true") {
      if(productionforegin != "") {
        testPassed = "true";
      }
      else {
        warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                        <h5>Input production line</h5>
                      </div>

        setWarningDIVstate(warningDIV);
        testPassed = "false";
      }
    }

    if(testPassed == "true") {
      warningDIV =  <div className="alert alert-warning pt-4" role="alert">
                      <h5>Verifying data</h5>
                    </div>

      setWarningDIVstate(warningDIV);
    }

    if(testPassed == "true") {
      if(operation === 'new') {
        axios
          .post('http://127.0.0.1:8000/master/productionorder/', 
          {
            "process_order_number": processOrderNumber, 
            "product_conn":prodforegin,   
            "batch_number": batch, 
            "manufacturing_location" :manufactureforegin,  
            "Production_line_id":productionforegin,
            "created_by": created_by,
            "status": status,
            "production_date":production_date,
            "regulation":regulation,
            "packaging_Version":packaging_Version,
            "expiration_date":expiration_date,
            // "produced":produced,
            // "requested":requested,

            // "password":pass
          },
          {
            auth: {
              username: username,
              password: password
            }
          })
          .then((res) => {
            //alert("Paulsin");
            alert(res.data.process_order_number);
            if(res.data.process_order_number == "production order with this process order number already exists.") {
              warningDIV =  <div className="alert alert-danger pt-4" role="alert">
                              <h5>Process order already downloaded, try another process order</h5>
                            </div>

              setWarningDIVstate(warningDIV);
            }
            else {
              navigate("/po/podatagrid");
            }
          });
              
        }
      
        else if( operation=== "edit")
        {
          
          //alert(expiration_date);
          
          axios
          .put(`http://127.0.0.1:8000/master/productionorder/update/${productionOrderEditID}`, 
          
          {
            "process_order_number": processOrderNumber, 
            "product_conn":prodforegin,   
            "batch_number": batch, 
            "manufacturing_location" :manufactureforegin,  
            "Production_line_id":productionforegin,
            "created_by": created_by,
            "status": statusOptionsSelected,
            "production_date":production_date,
            "regulation":regulation,
            "packaging_Version":packaging_Version,
            "expiration_date":expiration_date,
            // "produced":produced,
            // "requested":requested,    
          },
          {
            auth: {
              username: username,
              password: password
            }
          })
          .then(() => {
            //navigate("/po/podatagrid");
          });
          
          
        }
      }
      
    }

    var editSaveButtonDisabled = 
        <button disabled="true" className="btn btn-primary" onClick={handleSubmit}>Save</button>

    var editSaveButtonEnabled = 
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
    
    //const listItems = numbers.map((number) =>  <li>{number}</li>);

    var editSaveButton = "";
        
    //if(statusReceivedFromDataGrid == "Draft") {
    //  editSaveButton = editSaveButtonEnabled;
    //}
    //else {
      editSaveButton = editSaveButtonEnabled;
    //}

    return(
        <>
            <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/>
            
            <br/>


                <div class="row">
                     {/* <div class="col-2">
                        <Sidebar  currentPage="productionOrderDataGrid"/>
                    </div> */}
                    <div class="col-10">

                    <div className="d-flex justify-content-between m-2">
                      <h2>Production order</h2>
                    </div>

                    {warningDIVstate}

<table class="table table-borderless productionOrderReportSearchTable" id="productionOrderReportSearchTableID">
  <tbody>
    <tr>
      <td class="productionOrderReportSearchTD">Process Order Number</td>
      <td class="productionOrderReportSearchTD">
        {processnowidget}
      </td>

      <td class="productionOrderReportSearchTD">
{fetchwidget}
</td>

    </tr>

    <tr>
      <td class="productionOrderReportSearchTD">Available process order numbers</td>
      <td class="productionOrderReportSearchTD">
        <ul class="list-group list-group-horizontal-sm">
          {availableProcessOrderNumbersState}
        </ul>
      </td>
    </tr>

    <tr>
      <td class="productionOrderReportSearchTD">Product</td>
      <td class="productionOrderReportSearchTD">
   {productwidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Batch Number</td>
      <td class="productionOrderReportSearchTD">
    {batchnowidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Manufacturing Location</td>
      <td class="productionOrderReportSearchTD">
     {manufactwidget}
      </td>
    </tr>

    <tr>
      <td class="productionOrderReportSearchTD">Created by</td>
      <td class="productionOrderReportSearchTD">
      {createdbywidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Regulation</td>
      <td class="productionOrderReportSearchTD">
       {regulationwidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Production Date</td>
      <td class="productionOrderReportSearchTD">
       {productiondatewidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">packaging_Version</td>
      <td class="productionOrderReportSearchTD">
      {packageverwidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Expiration date</td>
      <td class="productionOrderReportSearchTD">
   {expwidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Status</td>
      <td class="productionOrderReportSearchTD">
        {statusOptionsWidget}
      </td>
    </tr>
    <tr>
      <td class="productionOrderReportSearchTD">Production line</td>
      <td class="productionOrderReportSearchTD">
      {productionlinewidget}
      </td>
    </tr>

  </tbody>
</table>

<button className="btn btn-outline-secondary" onClick={showProperties}>Show properties &#62;&#62;&#62;</button>
<br/><br/>

{showPropertiesState ? propertiesWidget : null}

{editSaveButton}

                    </div>
                </div>
        </>
    )
}
export default Pocreate