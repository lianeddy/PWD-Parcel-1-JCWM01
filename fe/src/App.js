import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RegisterDonePage from "./pages/RegisterDonePage";
import LandingPage from "./pages/LandingPage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePicture from "./components/ProfilePicture";
import AdminSalesReport from "./pages/AdminSalesReport";

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
          <ProfilePicture path="/profile" exact component={ProfilePicture} />
          <AdminSalesReport
            path="/admin/salesreport"
            exact
            component={AdminSalesReport}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
