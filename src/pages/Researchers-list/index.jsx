import React, { useEffect, useState } from 'react';
import ResearcherCard from '../../components/ResearcherCard';
import ResearcherService from '../../services/ResearcherService';

const ResearcherList = () => {
  const [researchers, setResearchers] = useState([]);

  useEffect(() => {
    ResearcherService.getResearchers().then((res) => {
      setResearchers(res);
    });
  }, []);

  return (
    <div className="container-fluid px-4">
      <div className="row mt-4">
        {researchers.map((researcher) => (
          <ResearcherCard key={researcher.researcherId} researcher={researcher} />
        ))}
      </div>
    </div>
  );
};

export default ResearcherList;
