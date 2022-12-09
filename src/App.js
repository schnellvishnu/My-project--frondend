import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account/create/:operation" element={<Create />} />
        <Route path="/account/ReadDataGrid" element={<ReadDataGrid/>} />
        <Route path="/po/podatagrid" element={<Podatagrid />} />
        <Route path="/po/pocreate/:operation/:uniqueID" element={<Pocreate />} />


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />





        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;