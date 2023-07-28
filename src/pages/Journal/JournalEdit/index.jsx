import React, { useContext, useEffect, useState } from 'react'
import JournalForm from '../../../components/Journal-form'
import { useParams, useNavigate } from 'react-router-dom'
import JournalService from '../../../services/JournalService';
import AuthContext from '../../../context/AuthContext ';

const JournalEdit = () => {
  const {id} = useParams();
  const [journal, setJournal] = useState({});
  const navigate = useNavigate()
  const {user}= useContext(AuthContext)

  useEffect(()=>{
    JournalService.getJournalById(id).then((res)=>{
      setJournal(res)
    })
  },[])

  const handleUpdateJournal = (newJournal, journalFile) => {
    
    JournalService.updateJournal(newJournal, journalFile).then((res)=>{
      navigate(`/journal/view/${journal.journalId}`)
    })
  }

  return (
    <JournalForm formAction={1} SubmitAction={handleUpdateJournal} journal={journal}/>

  )
}

export default JournalEdit