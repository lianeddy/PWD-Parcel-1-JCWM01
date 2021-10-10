import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import RegisterPage from "./pages/RegisterPage";
import EditProfile from "./components/EditProfile";
import userProfile from "./components/userProfile";
import UserTransaksi from "./components/UserTransaksi";
// commect

function App() {
  return (
    <>
      <Router>
        <Route path="/profile" component={userProfile} />
        <Route path="/edit" component={EditProfile} />
        <Route path="/UserTransaksi" component={UserTransaksi} />

      </Router>
    </>
  );
}

export default App;
