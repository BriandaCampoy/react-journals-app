import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthContext ';
import { useNavigate } from 'react-router-dom';

const ResearcherEdit = () => {
  const {user, updateLoggedResearcher}=useContext(AuthContext)
  const [error, setError] = useState(false);
  const newPassword= useRef();
  const password = useRef();
  const name = useRef();
  const navigate= useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.current.value != user.password) {
      setError(true);
    } else {
      updateLoggedResearcher({
        'name':name.current.value,
        'password':newPassword.current.value
      })
      navigate(`/researcher/profile/${user.researcherId}`)
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Update researcher</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="inputName"
                        type="text"
                        ref={name}
                        name="name"
                        defaultValue={user.name}
                        required
                        placeholder="Enter your name"
                      />
                      <label htmlFor="inputTitle">Name: </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="inputOldPassword"
                        type="password"
                        ref={password}
                        required
                        name="oldPassword"
                        placeholder="Enter your current password:"
                      />
                      <label htmlFor="inputOldPassword">Current password:</label>
                    </div>
                    {error && (
                      <div className="text-danger mb-3">¡Incorrect password!</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="inputNewPassword"
                        type="password"
                        ref={newPassword}
                        required
                        name="newPassword"
                        placeholder="Enter your new password:"
                      />
                      <label htmlFor="inputNewPassword">New password</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-0">
                  <div className="d-grid">
                    <button className="btn btn-primary btn-block" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearcherEdit;
