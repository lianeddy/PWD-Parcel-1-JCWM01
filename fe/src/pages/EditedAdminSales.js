import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import SalesReport from "../components/adminComponents/SalesReport";
import EdSidebar from "../components/adminComponents/EdSidebar";
import EdHome from "./adminPage/EdHome";
import EdRestock from "./adminPage/EdRestock";
import EdUserList from "./adminPage/EdUserList";

function EditedAdminSales() {
  let { path, url } = useRouteMatch();

  return (
    <>
      {/* <SalesReport /> */}
      <div
        className="container-admin"
        style={{ display: "flex", backgroundColor: "white" }}
      >
        <EdSidebar />
        <Switch>
          <Route path={`${path}/users`}>
            <EdUserList />
          </Route>
          <Route path={`${path}/restock`}>
            <EdRestock />
          </Route>
          <Route exact path={path}>
            <EdHome />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default EditedAdminSales;
