import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Header = () => {

  const { startupLoggedin, setStartupLoggedin } = useContext(UserContext);

  return (
    <>
  
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      {/* Container wrapper */}
      <div className="container-fluid">
      
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Link */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/home"> 
                Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/UserSignup">
            User SignUp
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/main/UserLogin">
             User Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users/UserProfile">
              User Profile
              </NavLink>
            </li>
            
           
          
          </ul>
          {
            startupLoggedin ? 
            <button className='btn btn-primary' onClick={e => {
              setStartupLoggedin(false);
              sessionStorage.removeItem('startup');
              // navigate
            }}>User Logout</button>
            :
            <Link className="btn btn-link" to="/main/UserLogin">User Login</Link>
          }
         
        </div>
      </div>
      {/* Container wrapper */}
    </nav>
    {/* Navbar */}
  </>
  
  )
}

export default Header;