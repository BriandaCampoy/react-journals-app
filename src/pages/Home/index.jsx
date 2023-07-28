import React, { useEffect, useState, useContext } from 'react';
import SubscriptionService from '../../services/SubscriptionService';
import AuthContext from '../../context/AuthContext ';
import Feed from '../../components/Feed';

const Home = () => {
  const [Journals, setJournals] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    SubscriptionService.getFeed(user.researcherId).then((res) => {
      setJournals(res);
    });
  }, []);

  return (
    <>
      <div>
        <Feed journals={Journals} />
      </div>
    </>
  );
};

export default Home;
