// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router";
// import Navbar from '../../components/Navigation/Navbar';

// const Login = () => {

//     const navigate = useNavigate();

//     ///////   Warniv DIV on top of Log in box
//     var warningDIV =       
//           <div class="alert alert-success" role="alert">
//             Input your Email ID and Password
//           </div>

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [userrole, setUserrole] = useState("");

//     const [warningDIVstate, changeWarnignDIVstate] = useState(warningDIV); 

//     //////////  Login Widget
//     const logInWidget =             

//       <form>
      
//         {warningDIVstate}

//         <div class="form-outline mb-4">
//           <input type="email" id="form2Example1" class="form-control" onChange={(e) => setUsername(e.target.value)}/>
//           <label class="form-label" for="form2Example1">Email address</label>
//         </div>
      
//         <div class="form-outline mb-4">
//           <input type="password" id="form2Example2" class="form-control" onChange={(e) => setPassword(e.target.value)}/>
//           <label class="form-label" for="form2Example2">Password</label>
//         </div>
      
//         <div class="row mb-4">
//           <div class="col d-flex justify-content-center">
      
//             <div class="form-check">
//               <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
//               <label class="form-check-label" for="form2Example31"> Remember me </label>
//             </div>
//           </div>
      
//           <div class="col">
//             <a href="#!">Forgot password?</a>
//           </div>
//         </div>
      
//         <button type="button" class="btn btn-primary btn-block mb-4 w-100" onClick={handleSignIn}>Sign in</button>
      
//         <div class="text-center">
//           <p>Not a member? <a href="#!">Register</a></p>
//           <p>or sign up with:</p>
//           <button type="button" class="btn btn-link btn-floating mx-1">
//             <i class="fab fa-facebook-f"></i>
//           </button>
      
//           <button type="button" class="btn btn-link btn-floating mx-1">
//             <i class="fab fa-google"></i>
//           </button>
      
//           <button type="button" class="btn btn-link btn-floating mx-1">
//             <i class="fab fa-twitter"></i>
//           </button>
      
//           <button type="button" class="btn btn-link btn-floating mx-1">
//             <i class="fab fa-github"></i>
//           </button>
//         </div>
//       </form>

//     ///  Check email validity
//     function isValidEmail(email) {
//       return /\S+@\S+\.\S+/.test(email);
//     }

//     ////   Sign in function
//     function handleSignIn() {
//       //alert(username);
//       //alert(password);

//       var testPassed = false;

//       if(username === "" || !isValidEmail(username)) {
//         warningDIV =       
//           <div class="alert alert-danger" role="alert">
//             Invalid Email ID
//           </div>

//         changeWarnignDIVstate(warningDIV);
//       }
//       else {
//         testPassed = true;
//       }

//       if(testPassed) {
//         if(password == "") {
//           warningDIV =       
//             <div class="alert alert-danger" role="alert">
//               Invalid password
//             </div>

//           changeWarnignDIVstate(warningDIV);
//           testPassed = false;         
//         }
//         else {
//           testPassed = true;
//         }
//       }

//       //alert(testPassed);

//       if(testPassed) {
//         axios
//         .post('http://127.0.0.1:8000/accounts/logInController', 
//         {
//           "username": username,    
//           "password": password, 
//         },
//         {
         
//             auth: {
//               username: username,
//               password: password
//             }
        
//         })
//         .then((response) => {
//           //alert(response.data);
//           if(response.data == "UserDoesNotExist") {
//             warningDIV =       
//               <div class="alert alert-danger" role="alert">
//                 User does not exist
//               </div>

//             changeWarnignDIVstate(warningDIV);
//           }
//           else if(response.data == "passwordDoesNotMatch") {
//             warningDIV =       
//               <div class="alert alert-danger" role="alert">
//                 Password does not match
//               </div>

//             changeWarnignDIVstate(warningDIV);            
//           }
//           else {
//             window.localStorage.setItem('username', username);
//             window.localStorage.setItem('password', password);
//             window.localStorage.setItem('userrole', response.data);

//             navigate("/account/ReadDataGrid");            

//             //alert(response.data);
//           }
          
//         });
//       }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         window.localStorage.setItem('username', username);
//         window.localStorage.setItem('password', password);

//         axios
//         .post('http://127.0.0.1:8000/accounts/userAuthVerify', 
//         {
//           "username": username,    
//           "password": password, 
//         },
//         {
//             auth: {
//               username: username,
//               password: password
//             }
//         })
//         .then((response) => {
//           //navigate("/account/read");
//           //if(response.data === 201) {

//             //alert(response.data)
//             window.localStorage.setItem('username', username);
//             window.localStorage.setItem('password', password);
//             window.localStorage.setItem('userrole', response.data);

//             navigate("/account/read");
//         });
//     };

//     ///   For navigate function
//     //const navigate = useNavigate();
//     //navigate("/account/read");

//     useEffect(() => {
//         axios
//         .post('http://127.0.0.1:8000/accounts/userAuthVerify', 
//         {
//           "username": window.localStorage.getItem('username'),    
//           "password": window.localStorage.getItem('password'), 
//         },
//         {
//             auth: {
//               username: window.localStorage.getItem('username'),
//               password: window.localStorage.getItem('password')
//             }
//         })
//         .then((response) => {
//           //navigate("/account/read");
//           //if(response.data === 201) {

//             //alert(response.data)
//             window.localStorage.setItem('username', window.localStorage.getItem('username'));
//             window.localStorage.setItem('password', window.localStorage.getItem('password'));
//             window.localStorage.setItem('userrole', window.localStorage.getItem('userrole'));

//             navigate("/account/read");
//         });
//     });

//     var usernameFieldWidget = <input
//           type="text"
//           className="form-control"
//           onChange={(e) => setUsername(e.target.value)}
//         /> 

//     var passwordFieldWidget = <input
//           type="password"
//           className="form-control"
//           aria-describedby="emailHelp"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//     return(
//         <>
//       {/*
//             <div className="mb-3">
//             <label className="form-label">Email ID</label>
//                 {usernameFieldWidget}
//             </div>

//             <div className="mb-3">
//             <label className="form-label">Password</label>
//                 {passwordFieldWidget}
//             </div>

//             <button type="submit"
//                 className="btn btn-primary"
//                 onClick={handleSubmit} >
//                 Log in
//             </button>
//     */}

//             <div class="row">
//               <div class="col-sm"></div>
              

//               <div class="col-sm p-5">
//                 <div class="container pt-3 pb-2 bg-secondary d-flex justify-content-center">
//                   <h4 class="text-light">ADMINISTRATION</h4>
//                 </div>
//                 <div class="container border pt-3">
//                   {logInWidget}
//                 </div>
//               </div>

              
//               <div class="col-sm"></div>
//             </div>

//         </>
//     )
// };

// export default Login;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import Navbar from '../../components/Navigation/Navbar';
const Login = () => {
  var warningDIV = <div className="alert alert-success pt-4" role="alert">
  <h5>Input all the values</h5>
</div>

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
    const [message,setMessage] =useState("");

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
            if(response.data.username == "invalid username"){
            warningDIV= <div className='alert alert-danger pt-4 ' role='alert'>
              <h5>invalid username</h5>
            </div>
            setMessage(warningDIV);
            }
            else{

            
            window.localStorage.setItem('username', window.localStorage.getItem('username'));
            window.localStorage.setItem('password', window.localStorage.getItem('password'));
            window.localStorage.setItem('userrole', window.localStorage.getItem('userrole'));

            navigate("/account/readDataGrid");}
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

            {/* <div className="mb-3">
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
            </button> */}
            
            <div className='head'>
              <div className='full'>
            {/* <h2>Track And Trace Login</h2> */}
            {/* <div className='hw'>
            <h2>Track And Trace Login</h2>
            </div>
         */}
            {/* <div className='ho'>
            <h2>Track And Trace Login</h2>
            </div> */}
            {/* <div className='hu'>
            <h2>Track And Trace Login</h2>
            </div> */}
            
            {message}

            

<table class="table table-borderless productionOrderReportSearchTable" id="loginReportSearchTableID"  >
<h2>Login</h2>
                      <tbody>
                  

                      <tr>
                      <td class="productionOrderReportSearchTD">Email</td>
                      <td class="productionOrderReportSearchTD">
                      {usernameFieldWidget}
                      </td>
                      
                      
                      
                      </tr>
                      <tr>
                      <td class="productionOrderReportSearchTD">Password</td>
                      <td class="productionOrderReportSearchTD">
                      {passwordFieldWidget}
                      </td>
                      </tr>
                      
                      
                      
                     
                      
                      <tr>
                      <td class="productionOrderReportSearchTD">
                       
                      <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
                      </td>
                      </tr>
                      
                      
                      
                      
                      
                      </tbody>
                      </table>
                      </div>
                      </div>
                     
        </>
    )
};

export default Login;