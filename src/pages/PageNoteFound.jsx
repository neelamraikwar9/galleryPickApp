import "./pageNoteFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageNoteFound() {
  const navigate = useNavigate();
  return (
    <main className="mainContainer pgNotFoundCon">
      <div className="notFoundCont" style={{}}>
        <h1 className="error">404 error</h1>
        <h1 className="pgnotfnd">Page Note Found</h1>
        <button onClick={() => navigate("/signin")} className="nfBtn">
          Login
        </button>
      </div>
    </main>
  );
}

export default PageNoteFound;
