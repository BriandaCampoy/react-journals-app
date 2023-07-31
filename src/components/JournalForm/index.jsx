import React, { useState, useRef } from 'react';

/**
 * JournalForm Component
 *
 * This component represents a form for uploading or updating a journal.
 *
 * @param {Object} props - Props for the JournalForm component.
 * @param {number} props.formAction - The action to be performed by the form (0: Upload, 1: Update).
 * @param {function} props.SubmitAction - The function to be called when the form is submitted.
 * @param {Object} props.journal - The journal object containing information for updating (optional).
 * @returns {JSX.Element} - The JSX element representing the journal form.
 */
const JournalForm = ({ formAction, SubmitAction, journal }) => {
  const [error, setError] = useState(false);
  const title = useRef();
  const file = useRef();
  const keepOriginal = useRef();

  /**
   * Handle form submission and call the appropriate SubmitAction function based on formAction.
   *
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formAction === 0) {
      SubmitAction(title.current.value, file.current.files[0]);
    } else {
      const newJournal = {
        journalId: journal.journalId,
        title: title.current.value
      };
      if (!keepOriginal.current.checked && file.current.files.length === 0) {
        setError(true);
      } else if (keepOriginal.current.checked) {
        setError(false);
        SubmitAction(newJournal);
      } else if (
        file.current.files.length !== 0 &&
        !keepOriginal.current.checked
      ) {
        setError(false);
        SubmitAction(newJournal, file.current.files[0]);
      }
    }
  };

  const Actions = ['Upload Journal', 'Update Journal'];

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                {Actions[formAction]}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3 mb-md-0">
                      <input
                        className="form-control"
                        id="inputTitle"
                        type="text"
                        name="title"
                        defaultValue={
                          journal?.title !== undefined ? journal.title : ''
                        }
                        required
                        ref={title}
                        placeholder="Enter the title"
                      />
                      <label htmlFor="inputTitle">Title: </label>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="inputJournalFile"
                        type="file"
                        required={formAction === 0 ? true : false}
                        name="file"
                        ref={file}
                        accept=".pdf"
                        placeholder="Upload journal file"
                      />
                      <label htmlFor="inputJournalFile">Journal File:</label>
                    </div>
                    {formAction === 1 && (
                      <div className="">
                        <div className="form-check">
                          <input
                            id="inputKeepOriginal"
                            type="checkbox"
                            name="keepOriginal"
                            ref={keepOriginal}
                          />
                          <label htmlFor="inputKeepOriginal">
                            Keep original file
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger">
                    ¡Select a file or select to keep original!
                  </div>
                )}
                <div className="mt-4 mb-0">
                  <div className="d-grid">
                    <button className="btn btn-primary btn-block" type="submit">
                      Upload
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

export default JournalForm;
