import React, { useContext } from 'react'
import JournalForm from '../../../components/Journal-form'
import JournalService from '../../../services/JournalService';
import AuthContext from '../../../context/AuthContext ';
import { useNavigate } from 'react-router-dom';


const UploadJournal = () => {

  const navigate = useNavigate()
  const{user}= useContext(AuthContext);


  const uploadJournal=(title, file)=>{
    const journal = {
      researcherId:user.researcherId,
      title:title,
    }
    JournalService.uploadJournal(journal, file).then((res)=>{
      navigate(`/researcher/profile/${user.researcherId}`)
    });
  }

  return (
    <JournalForm formAction={0} SubmitAction={uploadJournal}/>
  )
}

export default UploadJournal