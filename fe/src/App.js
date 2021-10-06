import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./components/UserProfile";



function App() {
  return (
    <>
      <Router>
        <UserProfile />
      </Router>
    </>
  );
}

export default App;
