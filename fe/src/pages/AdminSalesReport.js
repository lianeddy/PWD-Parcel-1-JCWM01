import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import SalesReport from "../components/adminComponents/SalesReport";
import Sidebar from "../components/adminComponents/Sidebar";
import Home from "./adminPage/Home";
import UserList from "./adminPage/UserList";

function AdminSalesReport() {
  let { path, url } = useRouteMatch();

  return (
    <>
      {/* <SalesReport /> */}
      <div className="container" style={{ display: "flex" }}>
        <Sidebar />
        <Switch>
          <Route path={`${path}/users`}>
            <UserList />
          </Route>
          <Route exact path={path}>
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default AdminSalesReport;