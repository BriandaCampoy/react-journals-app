import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PdfViewer from '../../../components/PdfViewer';
import JournalService from '../../../services/JournalService';
import { useParams } from 'react-router-dom';
import DateFormater from '../../../utils/DateFormater';
import ResearcherService from '../../../services/ResearcherService';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { useUserContext } from '../../../context/useUserContext';

/**
 * JournalView component to view a specific journal entry.
 * Displays information about the journal, such as title, author, and published date.
 * Allows researchers to edit and delete their own journal entries.
 * @returns {JSX.Element} A JSX element representing the JournalView component.
 */
const JournalView = () => {
  // Get the user context using the custom hook.
  const { user } = useUserContext();

  // State to store the journal data for viewing.
  const [journal, setJournal] = useState({});

  // State to store the researcher data for the journal author.
  const [researcher, setResearcher] = useState({});

  // Get the journal id from the URL parameters.
  const { id } = useParams();

  // Hook to allow navigation between different routes.
  const navigate = useNavigate();

  // State to control the display of the delete confirmation modal.
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Opens the delete confirmation modal.
   */
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Closes the delete confirmation modal.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Handles the delete action for the journal.
   * Calls the JournalService to delete the journal entry.
   * Navigates to the researcher's profile page after successful deletion.
   */
  const handleConfirmActionModal = () => {
    JournalService.deleteJournal(id).then((res) => {
      handleCloseModal();
      navigate(`/researcher/profile/${user.researcherId}`);
    });
  };

  /**
   * Fetches the journal data and the researcher data from the API and updates the state.
   * This function runs once when the component is mounted.
   */
  useEffect(() => {
    JournalService.getJournalById(id).then((res) => {
      // Update the state with the fetched journal data.
      setJournal(res);
      ResearcherService.getResearcherById(res.researcherId).then(
        (researcher) => {
          // Fetch the researcher data for the author of the journal.
          setResearcher(researcher);
        }
      );
    });
  }, []);
  return (
    <>
      <header className="m-3">
        <h2>{journal.title}</h2>
        <div>
          <NavLink to={`/researcher/profile/${researcher.researcherId}`}>
            by {researcher.name}
          </NavLink>
          <h6> {DateFormater(journal.publishedDate)}</h6>
        </div>
      </header>
      {user.researcherId === researcher.researcherId && (
        <div className="d-flex gap-3 m-2">
          <NavLink
            to={`/journal/edit/${journal.journalId}`}
            className="btn btn-primary"
          >
            Edit Journal
          </NavLink>

          <button onClick={handleOpenModal} className="btn btn-danger">
            Delete
          </button>
        </div>
      )}
      {journal.url !== undefined && (
        <div className="card mb-4">
          <PdfViewer pdfUrl={journal.url} />
        </div>
      )}
      {isModalOpen && (
        <ConfirmationModal
          title={'Are you sure?'}
          message={'you want to delete this journal?'}
          close={handleCloseModal}
          confirmed={handleConfirmActionModal}
        />
      )}
    </>
  );
};

export default JournalView;
