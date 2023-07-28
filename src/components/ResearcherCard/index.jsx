import React from 'react';
import { NavLink } from 'react-router-dom';
import FollowBtn from '../Follow-btn';

const ResearcherCard = ({ researcher }) => {
  return (
    <div className="card mb-4">
      <div className="card-body ">
        <p>{researcher.name}</p>
        <FollowBtn researcherId={researcher.researcherId}/>
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
