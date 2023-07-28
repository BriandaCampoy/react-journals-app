import React from 'react';
import { NavLink } from 'react-router-dom';
import DateFormater from '../../utils/DateFormater';

const FeedItem = ({ journal }) => {
  const author = '';

  return (
    <div className="col-xl-3 col-md-6">
      <div className="card bg-primary text-white mb-4">
        <div className="card-body">
          <p>{journal.title}</p>
          <p className="small text-white stretched-link">
            {author}
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
