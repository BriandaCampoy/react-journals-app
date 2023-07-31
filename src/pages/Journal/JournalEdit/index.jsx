import React, { useEffect, useState } from 'react';
import JournalForm from '../../../components/JournalForm';
import { useParams, useNavigate } from 'react-router-dom';
import JournalService from '../../../services/JournalService';

/**
 * JournalEdit component to edit an existing journal entry.
 * Uses the JournalForm component for the form layout.
 * @returns {JSX.Element} A JSX element representing the JournalEdit component.
 */
const JournalEdit = () => {
  // Get the journal id from the URL parameters.
  const { id } = useParams();
  // State to store the journal data for editing.
  const [journal, setJournal] = useState({});
  // Hook to allow navigation between different routes.
  const navigate = useNavigate();

  /**
   * Fetches the journal data from the API based on the id and updates the state.
   * This function runs once when the component is mounted.
   */
  useEffect(() => {
    JournalService.getJournalById(id).then((res) => {
      // Update the state with the fetched journal data.
      setJournal(res);
    });
  }, []);

  /**
   * Handles the update of the journal entry.
   * Calls the JournalService to update the journal with new data and file (if provided).
   * Navigates to the view page of the updated journal after successful update.
   * @param {Object} newJournal - The updated journal data to be sent to the server.
   * @param {File} journalFile - The optional file associated with the journal.
   */
  const handleUpdateJournal = (newJournal, journalFile) => {
    JournalService.updateJournal(newJournal, journalFile).then((res) => {
      // Navigate to the view page of the updated journal.
      navigate(`/journal/view/${journal.journalId}`);
    });
  };

  return (
    <JournalForm
      formAction={1}
      SubmitAction={handleUpdateJournal}
      journal={journal}
    />
  );
};

export default JournalEdit;
