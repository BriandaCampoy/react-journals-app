import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext';

/**
 * Login Component
 *
 * This component represents a login form where users can enter their email and password to log in.
 *
 * @returns {JSX.Element} - The JSX element representing the login form.
 */
const Login = () => {
  const [correctData, setCorrectData] = useState(true);
  const { login } = useUserContext();
  const email = useRef();
  const password = useRef();

  /**
   * Handle login form submission.
   * Calls the login function from the user context with the provided email and password.
   * Updates the correctData state to display an error message if login is unsuccessful.
   *
   * @param {Event} event - The form submission event.
   */
  function handleLogin(event) {
    event.preventDefault();
    login(email.current.value, password.current.value).then((res) => {
      setCorrectData(res);
    });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    required
                    name="email"
                    id="inputEmail"
                    type="email"
                    placeholder="name@example.com"
                    ref={email}
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={password}
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                {!correctData && (
                  <div className="alert alert-danger">
                    ¡Incorrect user information!
                  </div>
                )}
                <div></div>
                <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                  <button
                    type="submit"
                    className="d-grid btn btn-primary btn-block"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <NavLink to="/signup">Need an account? Sign up!</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
