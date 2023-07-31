import React from 'react';
import { NavLink } from 'react-router-dom';
import FollowBtn from '../FollowBtn';

/**
 * ResearcherCard Component
 *
 * This component represents a card displaying information about a researcher.
 *
 * @param {Object} researcher - The researcher object containing information like name and researcherId.
 * @returns {JSX.Element} - The JSX element representing the researcher card.
 */
const ResearcherCard = ({ researcher }) => {
  return (
    <div className="card mb-4">
      <div className="card-body ">
        <p>{researcher.name}</p>
        <FollowBtn researcherId={researcher.researcherId} />
      </div>
      <div className="card-footer d-flex align-items-center justify-content-between">
        <NavLink
          to={`/researcher/profile/${researcher.researcherId}`}
          className="card-link"
        >
          See profile
        </NavLink>
        <div className="small text-white">
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default ResearcherCard;
