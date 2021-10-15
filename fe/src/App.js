import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import RegisterPage from "./pages/RegisterPage";
import RegisterDonePage from "./pages/RegisterDonePage";
import LandingPage from "./pages/LandingPage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePicture from "./components/ProfilePicture";
import AdminSalesReport from "./pages/AdminSalesReport";

import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/MyNavbar";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/userProfile";

import { connect } from "react-redux";
import { keepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("token");
    if (userLocalStorage) {
      const userData = userLocalStorage;
      // this.props.userKeepLogin(userData);
      //this.props.getCartData(userData.id);
      this.props.keepLogin(userData);
      this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    // if (this.props.userGlobal.storageIsChecked) {
    return (
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route component={Home} path="/" />
          <Route component={Login} path="/login" />
          <Route component={Forgot} path="/forgot" />
          <RegisterPage path="/register" exact component={RegisterPage} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/edit" component={EditProfile} />
          <Route component={Admin} path="/admin" />
          <Route component={ProductDetail} path="/product-detail/:id" />
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
      </BrowserRouter>
    );
    //}

    //return <div>Loading...</div>;
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
