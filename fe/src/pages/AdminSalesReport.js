import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import SalesReport from "../components/adminComponents/SalesReport";
import Sidebar from "../components/adminComponents/Sidebar";
import Home from "./adminPage/Home";
import Restock from "./adminPage/Restock";
import UserList from "./adminPage/UserList";

function AdminSalesReport() {
  let { path, url } = useRouteMatch();

  return (
    <>
      {/* <SalesReport /> */}
      <div
        className="container-admin"
        style={{ display: "flex", backgroundColor: "white" }}
      >
        <Sidebar />
        <Switch>
          <Route path={`${path}/users`}>
            <UserList />
          </Route>
          <Route path={`${path}/restock`}>
            <Restock />
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
