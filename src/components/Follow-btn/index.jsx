import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext ';
import SubscriptionService from '../../services/SubscriptionService';

const FollowBtn = ({ researcherId }) => {
  const { user, isFollowed, refreshSubscriptions } = useContext(AuthContext);
  const [followed, setFollowed] = useState(isFollowed(researcherId));
  // console.log(researcherId);
  // useEffect(()=>{
  //   setFollowed();
  // },[])

  const handleFollowBtn = () => {
    if (followed) {
      unFollow();
    } else {
      follow();
    }
  };

  const follow = () => {
    SubscriptionService.setSubscription({
      researcherId: user.researcherId,
      followedResearcherId: researcherId
    }).then((res) => {
      setFollowed(res.value);
      refreshSubscriptions();
    });
  };

  const unFollow = () => {
    SubscriptionService.unSubscribe(followed.subscriptionId).then((res) => {
      setFollowed(undefined);
      refreshSubscriptions();
    });
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
