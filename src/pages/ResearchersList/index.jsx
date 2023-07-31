import React, { useEffect, useState } from 'react';
import ResearcherCard from '../../components/ResearcherCard';
import ResearcherService from '../../services/ResearcherService';

/**
 * ResearcherList component to display a list of researchers.
 * Fetches the list of researchers from the API and renders a ResearcherCard component for each researcher.
 * @returns {JSX.Element} A JSX element representing the ResearcherList component.
 */
const ResearcherList = () => {
  // State to store the list of researchers.
  const [researchers, setResearchers] = useState([]);

  /**
   * Fetches the list of researchers from the API and updates the state.
   * This function runs once when the component is mounted.
   */
  useEffect(() => {
    ResearcherService.getResearchers().then((res) => {
      // Update the state with the fetched researchers data.
      setResearchers(res);
    });
  }, []);

  return (
    <div className="container-fluid px-4">
      <div className="row mt-4">
        {researchers.map((researcher) => (
          <ResearcherCard
            key={researcher.researcherId}
            researcher={researcher}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearcherList;
