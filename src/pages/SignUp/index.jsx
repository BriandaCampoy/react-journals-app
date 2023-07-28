import React from 'react';
import { NavLink } from 'react-router-dom';

const SignUp = () => {
  const handleSignUp = () => {};

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
                          required
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />
                        <label htmlFor="inputPasswordConfirm">
                          Confirm Password
                        </label>
                        {/* Error */}
                        <span className="text-danger">¡Passwords must match!</span>
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
