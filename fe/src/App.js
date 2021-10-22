import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import RegisterPage from "./pages/RegisterPage";
import RegisterDonePage from "./pages/RegisterDonePage";
import LandingPage from "./pages/LandingPage";
import VerificationPage from "./pages/VerificationPage";

import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Login from "./pages/Login";
import MyNavbar from "./components/MyNavbar";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/userProfile";
import UserTransaksi from "./components/UserTransaksi";
import AdminTransaksi from "./components/AdminTransaksi";

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";
import AdminSalesReport from "./pages/AdminSalesReport";

// import ProfilePicture from "./components/ProfilePicture";
import ProfilePictureNoEdit from "./components/ProfilePictureNoEdit";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");
    if (userLocalStorage) {
      const userData = userLocalStorage;
      //this.props.userKeepLogin(userData);
      //this.props.getCartData(userData.id);
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
          <Route component={Login} path="/login" />
          <Route component={Forgot} path="/forgot" />
          <RegisterPage path="/register" exact component={RegisterPage} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/UserTransaksi" component={UserTransaksi} />
          <Route path="/AdminTransaksi" component={AdminTransaksi} />
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
          <Route path="/admin/salesreport">
            <AdminSalesReport />
          </Route>

          <ProfilePictureNoEdit
            path="/pictprofile"
            exact
            component={ProfilePictureNoEdit}
          />

          <Route component={Home} path="/" />
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
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
