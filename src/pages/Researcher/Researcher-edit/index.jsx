import React, { useContext, useRef, useState } from 'react';
import AuthContext from '../../../context/AuthContext ';
import ResearcherService from '../../../services/ResearcherService';
import { useNavigate } from 'react-router-dom';

const ResearcherEdit = () => {
  const {user}=useContext(AuthContext)
  const [error, setError] = useState(false);
  const newPassword= useRef();
  const password = useRef();
  const name = useRef();
  const navigate= useNavigate();

  const handleSubmit = () => {
    if (password.current.value != user.password) {
      setError(true);
    } else {
      // Update the researcher information with the new data
      // this.loggedUser.name = this.newUserData.name;
      // this.loggedUser.password = this.newUserData.newPassword;

      // Call the researcher service to update the researcher
      ResearcherService.putResearcher(user.researcherId, {
        'name':name.current.value,
        'password':newPassword.current.value
      }).then((res)=>{
        navigate(`/researcher/profile/${user.researcherId}`)
      })
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="card shadow-lg border-0 rounded-lg mt-5">
            <div class="card-header">
              <h3 class="text-center font-weight-light my-4">Researcher</h3>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit}>
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-floating">
                      <input
                        class="form-control"
                        id="inputName"
                        type="text"
                        name="name"
                        defaultValue={user.name}
                        required
                        placeholder="Enter your name"
                      />
                      <label for="inputTitle">Name: </label>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-floating">
                      <input
                        class="form-control"
                        id="inputOldPassword"
                        type="password"
                        required
                        name="oldPassword"
                        placeholder="Enter your current password:"
                      />
                      <label for="inputOldPassword">Current password:</label>
                    </div>
                    {error && (
                      <div class="text-danger mb-3">¡Incorrect password!</div>
                    )}
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="form-floating">
                      <input
                        class="form-control"
                        id="inputNewPassword"
                        type="password"
                        required
                        name="newPassword"
                        placeholder="Enter your new password:"
                      />
                      <label for="inputNewPassword">New password</label>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-0">
                  <div class="d-grid">
                    <button class="btn btn-primary btn-block" type="submit">
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
