import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import UserTransaksi from "./components/UserTransaksi";
import AdminTransaksi from "./components/AdminTransaksi";

// commect

function App() {
  return (
    <>
      <Router>
        <Route path="/UserTransaksi" component={UserTransaksi} />
        <Route path="/AdminTransaksi" component={AdminTransaksi} />
       


      </Router>
    </>
  );
}

export default App;
