import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ResearcherService from '../../services/ResearcherService';

/**
 * SignUp component to allow users to create a new account.
 * Displays a form to enter user details such as name, email, password, and confirm password.
 * @returns {JSX.Element} A JSX element representing the SignUp component.
 */
const SignUp = () => {
  // State to store the error status for password mismatch.
  const [error, setError] = useState(false);

  // React Router's `useNavigate` hook to handle navigation.
  const navigate = useNavigate();

  // Refs to access the input field values.
  const nameForm = useRef();
  const emailForm = useRef();
  const passwordForm = useRef();
  const confirmPasswordForm = useRef();

  /**
   * Handles the form submission to create a new account.
   * Checks if the passwords entered by the user match.
   * If passwords match, it logs "crear usuario" to the console (should be replaced with the actual account creation logic).
   * Otherwise, it sets the error state to true to display a password mismatch message.
   * @param {Event} event - The form submission event.
   */
  const handleSignUp = (event) => {
    event.preventDefault();
    if (passwordForm.current.value !== confirmPasswordForm.current.value) {
      setError(true);
    } else {
      // Create a new researcher object with the input field values.
      const newResearcher = {
        name: nameForm.current.value,
        email: emailForm.current.value,
        password: passwordForm.current.value
      };
      // Call the ResearcherService to create a new researcher account.
      ResearcherService.postResearcher(newResearcher).then((res) => {
        // If the account creation is successful, navigate to the homepage.
        navigate('/');
      });
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  Create Account
                </h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSignUp}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          className="form-control"
                          ref={nameForm}
                          id="inputName"
                          type="text"
                          required
                          name="name"
                          placeholder="Enter your name"
                        />
                        <label htmlFor="inputName">Name:</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="inputEmail"
                      ref={emailForm}
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-floating mb-3 mb-md-0">
                        <input
                          className="form-control"
                          id="inputPassword"
                          type="password"
                          ref={passwordForm}
                          required
                          name="password"
                          placeholder="Create a password"
                        />
                        <label htmlFor="inputPassword">Password</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3 mb-md-0">
                        <input
                          className="form-control"
                          id="inputPasswordConfirm"
                          type="password"
                          ref={confirmPasswordForm}
                          required
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />
                        <label htmlFor="inputPasswordConfirm">
                          Confirm Password
                        </label>
                        {error && (
                          <span className="text-danger">
                            ¡Passwords must match!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-4 mb-0">
                    <button
                      className="d-grid btn btn-primary btn-block"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-center py-3">
                <div className="small">
                  <NavLink to="/">Have an account? Go to login</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
