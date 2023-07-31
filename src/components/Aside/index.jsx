import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';

/**
 * Aside Component
 *
 * This component represents the side navigation menu that displays profile information and links for researchers.
 *
 * @returns {JSX.Element} - The JSX element representing the side navigation menu.
 */
const Aside = () => {
  const {user} = useUserContext() 
  return (
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Profile</div>
              <NavLink
                className="nav-link"
                to={`/researcher/profile/${user.researcherId}`}
              >
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-user"></i>
                </div>
                See profile
              </NavLink>
              <NavLink className="nav-link" to="/researcher/upload-journal">
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-upload"></i>
                </div>
                Upload Journal
              </NavLink>
              <div className="sb-sidenav-menu-heading">Researchers</div>
              <NavLink className="nav-link" to="/researchers-list">
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-users"></i>
                </div>
                Researchers list
              </NavLink>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {user.name}
          </div>
        </nav>
      </div>
  );
};

export default Aside;
