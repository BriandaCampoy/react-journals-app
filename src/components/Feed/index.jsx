import React from 'react';
import FeedItem from '../FeedItem';

/**
 * Feed Component
 *
 * This component represents a feed that displays a list of journal items.
 *
 * @param {Object} props - Props for the Feed component.
 * @param {Array} props.journals - An array of journal items to be displayed in the feed.
 * @returns {JSX.Element} - The JSX element representing the feed.
 */
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
