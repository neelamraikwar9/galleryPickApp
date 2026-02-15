
import './App.css'
import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp'; 


function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path="/Sign Up" element="<SignUp/>"></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
