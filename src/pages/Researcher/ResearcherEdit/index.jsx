import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/useUserContext';

/**
 * ResearcherEdit component to allow a researcher to update their profile.
 * Displays a form to update the researcher's name and password.
 * @returns {JSX.Element} A JSX element representing the ResearcherEdit component.
 */
const ResearcherEdit = () => {
  // Get the user context using the custom hook.
  const { user, update } = useUserContext();

  // State to store the error status for incorrect password.
  const [error, setError] = useState(false);

  // Refs to access the input field values.
  const newPassword = useRef();
  const password = useRef();
  const name = useRef();

  // Hook to allow navigation between different routes.
  const navigate = useNavigate();

  /**
   * Handles the form submission to update the researcher's profile.
   * Updates the researcher's name and password based on the input fields.
   * Navigates to the researcher's profile page after successful update.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.current.value != user.password) {
      setError(true);
    } else {
      // Call the update function from the user context to update the profile.
      update(name.current.value, newPassword.current.value);
      // Navigate to the researcher's profile page after successful update.
      navigate(`/researcher/profile/${user.researcherId}`);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Update researcher
              </h3>
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
                      <label htmlFor="inputOldPassword">
                        Current password:
                      </label>
                    </div>
                    {error && (
                      <div className="text-danger mb-3">
                        ¡Incorrect password!
                      </div>
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
