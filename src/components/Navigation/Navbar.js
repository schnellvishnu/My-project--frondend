import React from "react";
import { useNavigate } from "react-router";


const Navbar = (props) => {
  const navigate = useNavigate();
  function logout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("userrole");

    navigate("/");
  }
  return (
   
  
<div className="naclass">
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      
      <a className="navbar-brand" href="#">
        Track and Trace
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          
        
          {/* <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/account/ReadDataGrid">
              Registered users
            </a>
          </li> */}

          <li className="nav-item">
            <a className="nav-link" href="/">
              Log in
            </a>
          </li>
           {/* <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/report/productionorderreport/">
              Report 
            </a>
          </li> */}
          {/* <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/company/comdatagrid">
              Company
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/manufacture/manudatagrid">
              Manufacturinglocation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/customer/customerdatagrid">
             Customer
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/product/productdatagrid">
             Product
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/stock/stockdatagrid">
              Stock
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/po/podatagrid">
             Productionorder
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/customer/cuslocdatagrid">
          CustomerLocation
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="http://localhost:3000/snprovider/sndatagrid">
          Snprovider
            </a>
          </li> */} 

          <li className="nav-item">
            <a className="nav-link" >
              Welcome &nbsp;{window.localStorage.getItem('username')}
            </a>
          </li>

          {window.localStorage.getItem('username') ? <li className="nav-item">
            <button
                type="submit"
                className="btn btn-primary"
                onClick={logout}
              >
                Logout
            </button>
          </li>: ""}
          
        </ul>
        
      </div>
    </nav>
    </div>
 
  );
};

export default Navbar;
