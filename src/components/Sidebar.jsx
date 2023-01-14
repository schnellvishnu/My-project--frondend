import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BsFillBarChartFill } from "react-icons/bs";
import {BsFileEarmarkLockFill } from "react-icons/bs";


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path: "/",
            name: "Home",
            icon:<FaThList/>
          },
          
          {
            path: "/account/ReadDataGrid",
            name: "Account",
            icon: <BsFileEarmarkLockFill />,
          },
          {
            path: "/dashboard/dashboard",
            name: "Dashboard",
            icon:<FaThList/>
          },
        
        {
            path:"/product/productdatagrid/",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/stock/stockdatagrid/",
            name:"Stock",
            icon:<FaThList/>
        },
        {
            path:"/company/companydatagrid",
            name:"Company",
            icon:<FaShoppingBag/>
        },

        {
            path:"/customer/customerdatagrid/",
            name:"Customer",
            icon:<FaShoppingBag/>
        },
        {
            path:"/shipping/shippingdatagrid/",
            name:"Shipping Orders",
            icon:<FaShoppingBag/>
        },
        {
            path:"/history/historydatagrid/",
            name:"History",
            icon:<FaShoppingBag/>
        },
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;