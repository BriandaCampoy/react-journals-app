import { BASE_URL } from './config';

const service_enpoint = `${BASE_URL}/Researcher`;

export default{
  getResearchers:async()=>{
    try{
      const response = await fetch(service_enpoint)
      const data = await response.json();
      return data;
    }catch(error){
      throw error;
    }
  },
  getResearcherById:async(id)=>{
    try {
      const response = await fetch(`${service_enpoint}/${id}`)
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
  postResearcher:async(researcher)=>{
    try {
      const response = await fetch(service_enpoint,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(researcher)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
  putResearcher:async(id, researcher)=>{
    try {
      const response = await fetch(`${service_enpoint}/${id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(researcher)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}