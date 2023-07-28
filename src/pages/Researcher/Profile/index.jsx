import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ResearcherService from '../../../services/ResearcherService';
import Feed from '../../../components/Feed';
import AuthContext from '../../../context/AuthContext ';
import FollowBtn from '../../../components/Follow-btn';
import JournalService from '../../../services/JournalService';

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [researcher, setResearcher] = useState({});
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    ResearcherService.getResearcherById(id).then((res) => {
      setResearcher(res);
      JournalService.getJournalByResearcher(res.researcherId).then((journals) => {
        setJournals(journals)
      });
    });
  }, [id]);

  return (
    <div>
      <header className="m-3">
        <h1>{researcher.name}</h1>

        {user.researcherId === researcher.researcherId && (
          <>
            <NavLink className="btn btn-primary" to="/researcher/upload-journal">
              Upload new journal
            </NavLink>
          </>
        )}
        {researcher?.researcherId!==undefined && (
          <div>
            <FollowBtn researcherId={researcher.researcherId}/>
          </div>
        )}
      </header>
      <Feed journals={journals} />
    </div>
  );
};

export default Profile;
