import React from 'react';

/**
 * ConfirmationModal Component
 *
 * This component represents a confirmation modal dialog that prompts the user to confirm an action.
 *
 * @param {Object} props - Props for the ConfirmationModal component.
 * @param {string} props.title - The title of the confirmation modal.
 * @param {string} props.message - The message to display in the confirmation modal.
 * @param {function} props.confirmed - The function to be executed when the user confirms the action.
 * @param {function} props.close - The function to be executed when the user closes the confirmation modal.
 * @returns {JSX.Element} - The JSX element representing the confirmation modal.
 */

const ConfirmationModal = ({ title, message, confirmed, close }) => {
  const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={close}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={confirmed}
            >
              Delete
            </button>
            <button type="button" className="btn btn-secondary" onClick={close}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
