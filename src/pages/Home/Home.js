import React from 'react'
import { useNavigate } from "react-router";

function Home() {
  const navigate=useNavigate();
  return (
    <div className='homepage' >
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/">
              Log in
            </a>
          </li>

      </ul>
      
    </div>
  </div>
</nav>
<div className='gt'>
<h1>gh</h1>
</div>


 </div>
  )
}

export default Home