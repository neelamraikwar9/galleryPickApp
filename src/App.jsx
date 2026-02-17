
import './App.css'
import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp'; 
import SignIn from './components/SignIn'; 


function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<SignUp/>}></Route>
          <Route path="/SignIn" element={<SignIn/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
