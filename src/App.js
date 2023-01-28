import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Analytics from './pages/Analytics.jsx';
import Comment from './pages/Comment.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';
import Create from './pages/accounts/Create';
import ReadDataGrid from './pages/accounts/ReadDataGrid';
import Login from './pages/accounts/Login';
import Pocreate from './pages/Productionorder/Pocreate';
import Podatagrid from './pages/Productionorder/Podatagrid';
import Companydatagrid from './pages/Company/Companydatagrid';
import Companycreate from './pages/Company/Companycreate';
import Customerdatagrid from './pages/Customers/Customerdatagrid';
import Customercreate from './pages/Customers/Customercreate';
import ProductDatagrid from './pages/Products/ProductDatagrid';
import ProductCreate from './pages/Products/ProductCreate';
import Properties from './pages/Products/Properties';
import StockDatagrid from './pages/Stock/StockDatagrid';
import ShipingDatagrid from './pages/Shiping/ShipingDatagrid';
import ShipingCreate from './pages/Shiping/ShipingCreate';
import HistoryDatagrid from './pages/History/HistoryDatagrid';

import Home from './pages/Home/Home';



const App = () => {
  return (
   
   
    <Router>
   
   
    
    
   
  
      
      <Sidebar>
      <Routes><Route path="/home/" element={<Home />} /></Routes>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account/create/:operation" element={<Create />} />
        <Route path="/account/ReadDataGrid" element={<ReadDataGrid/>} />
        <Route path="/po/podatagrid" element={<Podatagrid />} />
        <Route path="/po/pocreate/:operation/:uniqueID" element={<Pocreate />} />

        <Route path="/company/companydatagrid" element={<Companydatagrid />} />
        <Route path="/company/comcreate/:operation/:uniqueID" element={<Companycreate />} />


        <Route path="/customer/customerdatagrid/" element={<Customerdatagrid />} />
        <Route path="/customer/cuscreate/:operation/:uniqueID" element={<Customercreate />} /> 


        <Route path="/product/productdatagrid/" element={<ProductDatagrid />} />
         <Route path="/product/productcreate/:operation/:uniqueID" element={<ProductCreate />} />
         <Route path="/product/property/:uniqueID" element={<Properties />} />

         <Route path="/stock/stockdatagrid/" element={<StockDatagrid />} />

          <Route path="/shipping/shippingdatagrid/" element={<ShipingDatagrid />} />
          <Route path="/shipping/shippingcreate/:operation/:uniqueID/:production" element={<ShipingCreate />} /> 

          <Route path="/history/historydatagrid/" element={<HistoryDatagrid />} /> 

         
        


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />





        </Routes>
      </Sidebar>
     
    </Router>
  );
};

export default App;