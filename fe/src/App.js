import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";
import VerificationPage from "./pages/VerificationPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <LandingPage path="/" exact component={LandingPage} />
          <RegisterPage path="/register" exact component={RegisterPage} />
          <VerificationPage
            path="/authentication/:token"
            exact
            component={VerificationPage}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
