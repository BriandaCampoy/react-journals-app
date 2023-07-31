import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import DateFormater from '../../utils/DateFormater';
import ResearcherService from '../../services/ResearcherService';

/**
 * FeedItem Component
 *
 * This component represents an individual item in the feed displaying journal information.
 *
 * @param {Object} props - Props for the FeedItem component.
 * @param {Object} props.journal - The journal object containing information about the item to be displayed.
 * @returns {JSX.Element} - The JSX element representing the individual feed item.
 */
const FeedItem = ({ journal }) => {
  const [researcher, setResearcher] = useState({});

  // Fetch the researcher data for the author of the journal.
  useEffect(() => {
    ResearcherService.getResearcherById(journal.researcherId).then((res) => {
      setResearcher(res);
    });
  }, []);

  return (
    <div className="col-xl-3 col-md-6">
      <div className="card bg-primary text-white mb-4">
        <div className="card-body">
          <p>{journal.title}</p>
          <p className="small text-white stretched-link">
            {researcher.name}
            <br />
            {DateFormater(journal.publishedDate)}
          </p>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between">
          <NavLink
            to={`/journal/view/${journal.journalId}`}
            className="small text-white stretched-link"
          >
            View Journal
          </NavLink>
          <div className="small text-white">
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
