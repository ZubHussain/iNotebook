import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('authToken')
    // window.location.href = '/login'
    navigate('/login')

  }

  let location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/inotes"? "active":""}`} aria-current="page" to="/inotes">iNotes</Link>
        </li>
      </ul>
     {!localStorage.getItem('authToken')?<form className="d-flex">
      <Link className="btn btn-light mx-2" to="/login" role="button">Login</Link>
      <Link className="btn btn-light" to="signup" role="button">Signup</Link>
      </form>:<button className='btn btn-danger' onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
  )
}
