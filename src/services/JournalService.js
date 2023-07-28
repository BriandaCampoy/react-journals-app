import { BASE_URL } from './config';

const service_enpoint = `${BASE_URL}/Journal`;

export default {
  getJournalById: async (journalId) => {
    try {
      const response = await fetch(`${service_enpoint}/${journalId}`);
      const data = response.json();
      return data;
    } catch (error) {}
  },
  getJournalByResearcher: async (researcherId) => {
    try {
      const response = await fetch(
        `${service_enpoint}/researcher/${researcherId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  uploadJournal: async (journal, journalFile) => {
    try {
      const formData = new FormData();
      formData.append('ResearcherId', journal.researcherId);
      formData.append('Title', journal.title);
      formData.append('journalFile', journalFile);
      
      const response = await fetch(service_enpoint, {
        method: 'POST',
        body: formData
      })
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  updateJournal: async (journal, journalFile) => {
    try {
      const formData = new FormData();
      formData.append('title', journal.title);
      if (journalFile != undefined) {
        formData.append('journalFile', journalFile);
      }
      const response = await fetch(`${service_enpoint}/${journal.journalId}`,{
        method: 'PUT',
        body: formData
      })
      const data = await response.json();
      return data;
    } catch (error) {}
  },
  deleteJournal: async (journalId) => {
    try {
      const response = await fetch(`${service_enpoint}/${journalId}`,{
        method: 'DELETE'
      });
      const data = await response.json();
      return data;
    } catch (error) {}
  }
};
