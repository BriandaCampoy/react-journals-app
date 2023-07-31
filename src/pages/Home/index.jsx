import React, { useEffect, useState } from 'react';
import SubscriptionService from '../../services/SubscriptionService';
import Feed from '../../components/Feed';
import { useUserContext } from '../../context/useUserContext';

/**
 * Home component displaying the user's feed.
 * Fetches the user's feed data from the API and renders the journals in a feed format.
 * @returns {JSX.Element} A JSX element representing the Home component.
 */
const Home = () => {
  // State to store the list of journals in the user's feed.
  const [Journals, setJournals] = useState([]);

  // Get the user context using the custom hook.
  const { user } = useUserContext();

  /**
   * Fetches the user's feed data from the API and updates the state.
   * This function runs once when the component is mounted.
   */
  useEffect(() => {
    // Call the SubscriptionService to fetch the user's feed based on their researcherId.
    SubscriptionService.getFeed(user.researcherId).then((res) => {
      // Update the state with the fetched journals data.
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
