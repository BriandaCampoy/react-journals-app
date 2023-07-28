import React from 'react';
import FeedItem from '../Feed-item';

const Feed = ({ journals }) => {
  return (
    <div className="container-fluid px-4">
      <div className="row mt-4">
       
          {journals.map((journalItem) => (
            <FeedItem journal={journalItem} key={journalItem.journalId} />
          ))}
        {journals.length === 0 && (
          <div>
            <h3>Nothing to show</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
