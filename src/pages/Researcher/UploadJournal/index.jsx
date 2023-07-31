import React from 'react';
import JournalForm from '../../../components/JournalForm';
import JournalService from '../../../services/JournalService';
import { useUserContext } from '../../../context/useUserContext';
import { useNavigate } from 'react-router-dom';

/**
 * UploadJournal component to allow a researcher to upload a new journal entry.
 * Displays a form to enter the journal title and upload a file.
 * @returns {JSX.Element} A JSX element representing the UploadJournal component.
 */
const UploadJournal = () => {
  // Hook to allow navigation between different routes.
  const navigate = useNavigate();

  // Get the user context using the custom hook.
  const { user } = useUserContext();

  /**
   * Handles the form submission to upload the new journal entry.
   * Creates a journal object with the researcher's id, title, and the uploaded file.
   * Calls the JournalService to upload the journal to the server.
   * Navigates to the researcher's profile page after successful upload.
   * @param {string} title - The title of the journal entry.
   * @param {File} file - The file to be uploaded along with the journal entry.
   */
  const uploadJournal = (title, file) => {
    // Create a journal object with the researcher's id, title, and file.
    const journal = {
      researcherId: user.researcherId,
      title: title
    };
    // Call the JournalService to upload the journal to the server.
    JournalService.uploadJournal(journal, file).then((res) => {
      // Navigate to the researcher's profile page after successful upload.
      navigate(`/researcher/profile/${user.researcherId}`);
    });
  };

  return <JournalForm formAction={0} SubmitAction={uploadJournal} />;
};

export default UploadJournal;
