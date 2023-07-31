import React, { useState } from 'react';
import { useUserContext } from '../../context/useUserContext';

/**
 * FollowBtn Component
 *
 * This component represents a follow/unfollow button to interact with a researcher's profile.
 *
 * @param {Object} props - Props for the FollowBtn component.
 * @param {string} props.researcherId - The researcher ID of the profile to follow/unfollow.
 * @returns {JSX.Element} - The JSX element representing the follow/unfollow button.
 */
const FollowBtn = ({ researcherId }) => {
  const { user, addSub, removeSub } = useUserContext();
  const [followed, setFollowed] = useState(
    user.subs.find((sub) => sub.followedResearcherId === researcherId)
  );

  /**
   * Handle click event of the follow/unfollow button.
   * Adds or removes a subscription to the researcher's profile based on the current follow status.
   */
  const handleFollowBtn = () => {
    if (followed) {
      removeSub(followed.subscriptionId);
      setFollowed(undefined);
    } else {
      setFollowed(addSub(researcherId));
    }
  };

  return (
    <>
      {user.researcherId !== researcherId && (
        <button
          className={`btn ${
            followed === undefined ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={handleFollowBtn}
        >
          {followed !== undefined ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </>
  );
};

export default FollowBtn;
