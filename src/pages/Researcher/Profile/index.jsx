import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ResearcherService from '../../../services/ResearcherService';
import Feed from '../../../components/Feed';
import FollowBtn from '../../../components/FollowBtn';
import JournalService from '../../../services/JournalService';
import { useUserContext } from '../../../context/useUserContext';

/**
 * Profile component to display the profile of a researcher.
 * Shows the researcher's name, a button to upload a new journal (if the user is the owner),
 * and the researcher's journal feed.
 * @returns {JSX.Element} A JSX element representing the Profile component.
 */
const Profile = () => {
  // Get the researcher id from the URL parameters.
  const { id } = useParams();

  // Get the user context using the custom hook.
  const { user } = useUserContext();

  // State to store the researcher data.
  const [researcher, setResearcher] = useState({});

  // State to store the journals authored by the researcher.
  const [journals, setJournals] = useState([]);

  /**
   * Fetches the researcher data and the journals authored by the researcher from the API and updates the state.
   * This function runs once when the component is mounted or when the researcher id changes.
   */
  useEffect(() => {
    ResearcherService.getResearcherById(id).then((res) => {
      // Update the state with the fetched researcher data.
      setResearcher(res);
      // Fetch the journals authored by the researcher.
      JournalService.getJournalByResearcher(res.researcherId).then(
        (journals) => {
          // Update the state with the fetched journals data.
          setJournals(journals);
        }
      );
    });
  }, [id]);

  return (
    <div>
      <header className="m-3">
        <h1>{researcher.name}</h1>
        {user.researcherId === researcher.researcherId && (
          <>
            <NavLink
              className="btn btn-primary"
              to="/researcher/upload-journal"
            >
              Upload new journal
            </NavLink>
          </>
        )}
        {researcher?.researcherId !== undefined && (
          <FollowBtn researcherId={researcher.researcherId} />
        )}
      </header>
      <Feed journals={journals} />
    </div>
  );
};

export default Profile;
