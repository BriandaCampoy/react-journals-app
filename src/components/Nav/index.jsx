import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext ';

const Nav = () => {
  const {logout, user} = useContext(AuthContext);
  const sidebarToggled = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem(
      'sb|sidebar-toggle',
      document.body.classList.contains('sb-sidenav-toggled')
    );
  };

  const handleLogout=()=>{
    logout();
  }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <NavLink className="navbar-brand ps-3" to="/">
        Start Bootstrap
      </NavLink>
      <button
        id="sidebarToggle"
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        onClick={sidebarToggled}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <div className="dropdown-item">
                <NavLink to="/researcher/edit/" className="list-group-item">Settings</NavLink>
              </div>
            </li>
            <li>
              <div className="dropdown-item">
                <NavLink to={`/researcher/profile/${user.researcherId}`} className="list-group-item">Profile</NavLink>
              </div>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
