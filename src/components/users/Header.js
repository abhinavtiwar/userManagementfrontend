import React ,{useContext}from 'react'
import { Link, NavLink ,useNavigate} from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const navigate = useNavigate();
  const { startupLoggedin, setStartupLoggedin } = useContext(UserContext);

  return (
    <div>
        <header>
  
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink className="nav-link" to="/main/home">
          Home
        </NavLink>
      </li>
 
        </ul>
        {
            startupLoggedin ? 
            <button className='btn btn-primary' onClick={e => {
              setStartupLoggedin(false);
              sessionStorage.removeItem('startup');
              navigate("/main/UserLogin")
            }}>User Logout</button>
            :
            <Link className="btn btn-link" to="/main/UserLogin">User Login</Link>
          }
      </div>
    </div>
  </nav>
 
 
</header>
    </div>
  )
}

export default Header