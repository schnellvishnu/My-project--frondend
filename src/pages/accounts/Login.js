import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
 import Navbar from '../../components/Navigation/Navbar';
const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);

        axios
        .post('http://127.0.0.1:8000/accounts/userAuthVerify', 
        {
          "username": username,    
          "password": password, 
        },
        {
            auth: {
              username: username,
              password: password
            }
        })
        .then((response) => {
          //navigate("/account/read");
          //if(response.data === 201) {

            //alert(response.data)
            window.localStorage.setItem('username', username);
            window.localStorage.setItem('password', password);
            window.localStorage.setItem('userrole', response.data);

            navigate("/account/readDataGrid");
        });
     };

    ///   For navigate function
    //const navigate = useNavigate();
    //navigate("/account/read");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userrole, setUserrole] = useState("");

    useEffect(() => {
        axios
        .post('http://127.0.0.1:8000/accounts/userAuthVerify', 
        {
          "username": window.localStorage.getItem('username'),    
          "password": window.localStorage.getItem('password'), 
        },
        {
            auth: {
              username: window.localStorage.getItem('username'),
              password: window.localStorage.getItem('password')
            }
        })
        .then((response) => {
          //navigate("/account/read");
          //if(response.data === 201) {

            //alert(response.data)
            window.localStorage.setItem('username', window.localStorage.getItem('username'));
            window.localStorage.setItem('password', window.localStorage.getItem('password'));
            window.localStorage.setItem('userrole', window.localStorage.getItem('userrole'));

            navigate("/account/readDataGrid");
        });
    });

    var usernameFieldWidget = <input
          type="text"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
        /> 

    var passwordFieldWidget = <input
          type="password"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setPassword(e.target.value)}
        />

    return(
        <>
        {/* <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> */}
            <div className="mb-3">
            <label className="form-label">Email ID</label>
                {usernameFieldWidget}
            </div>

            <div className="mb-3">
            <label className="form-label">Password</label>
                {passwordFieldWidget}
            </div>

            <button type="submit"
                className="btn btn-primary"
                onClick={handleSubmit} >
                Log in
            </button>
        </>
    )
};

export default Login;