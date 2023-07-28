import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PdfViewer from '../../../components/PdfViewer';
import JournalService from '../../../services/JournalService';
import { useParams } from 'react-router-dom';
import DateFormater from '../../../utils/DateFormater';
import ResearcherService from '../../../services/ResearcherService';
import AuthContext from '../../../context/AuthContext ';
import ConfirmationModal from '../../../components/ConfirmationModal';

const JournalView = () => {
  const { user } = useContext(AuthContext);
  const [journal, setJournal] = useState({});
  const [researcher, setResearcher] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmActionModal = () => {
    JournalService.deleteJournal(id).then((res)=>{
      handleCloseModal();
      navigate(`/researcher/profile/${user.researcherId}`)
    })
    // Delete journal
  };

  useEffect(() => {
    JournalService.getJournalById(id).then((res) => {
      setJournal(res);
      ResearcherService.getResearcherById(res.researcherId).then(
        (researcher) => {
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
      {isModalOpen && <ConfirmationModal title={"Are you sure?"} message={'you want to delete this journal?'} close={handleCloseModal} confirmed={handleConfirmActionModal}/>}
    </>
  );
};

export default JournalView;
