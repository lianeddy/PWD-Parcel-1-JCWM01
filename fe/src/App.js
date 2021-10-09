import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RegisterDonePage from "./pages/RegisterDonePage";
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
          <RegisterDonePage
            path="/registerdone"
            exact
            component={RegisterDonePage}
          />
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
