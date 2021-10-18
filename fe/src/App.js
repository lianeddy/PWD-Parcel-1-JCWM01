import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RegisterDonePage from "./pages/RegisterDonePage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePicture from "./components/ProfilePicture";
import AdminSalesReport from "./pages/AdminSalesReport";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const user = false;

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
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
          <Route path="/admin/salesreport">
            <AdminSalesReport />
            <Route component={Home} path="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
