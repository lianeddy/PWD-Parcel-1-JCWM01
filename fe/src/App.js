import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import MyNavbar from "./components/MyNavbar";

import { connect } from "react-redux";
import { keepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";
import Admin from "./pages/Admin";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("token");
    if (userLocalStorage) {
      const userData = userLocalStorage;
      this.props.keepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar />
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Forgot} path="/forgot" />
            <Route component={Home} path="/" />
            <Route component={Admin} path="/admin" />
          </Switch>
        </BrowserRouter>
      );
    }

    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
