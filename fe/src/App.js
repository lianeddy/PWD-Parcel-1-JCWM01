import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EditPassword from "./pages/EditPassword";

import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";

import { connect } from "react-redux";
import { keepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("token");
    console.log("userLocalStorage", userLocalStorage);
    if (userLocalStorage) {
      const userData = userLocalStorage;
      this.props.keepLogin(userData);
      //this.props.getCartData(userData.id);
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
            <Route component={Admin} path="/admin" />
            <Route component={EditPassword} path="/EditPassword" />

            <Route component={ProductDetail} path="/product-detail/:id" />

            <Route component={Home} path="/" />
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
  //getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
