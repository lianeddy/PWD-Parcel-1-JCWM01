import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <RegisterPage />
      </Router>
    </>
  );
}

export default App;
