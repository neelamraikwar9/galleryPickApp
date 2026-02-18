import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
