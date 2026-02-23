import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNoteFound() {
    const navigate = useNavigate(); 
  return (
    <div> 
    <h2>404 Page Note Found</h2>
    <button onClick={() => navigate('/signIn')}>Login</button>
    </div>
  )
}

export default PageNoteFound