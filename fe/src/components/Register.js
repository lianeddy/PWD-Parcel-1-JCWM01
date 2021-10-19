import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";
import { URL_API } from "../helper";

function Register() {
  const [userData, setUserData] = useState({});
  const [privacy, setPrivacy] = useState(false);

  let history = useHistory();

  const register = () => {
    console.log(!userData.email);
    console.log(!userData.password);
    console.log(!userData.full_name);
    console.log(!privacy);

    console.log(userData);
    Axios.post(URL_API + `/users/registeruser`, userData)
      .then((res) => {
        console.log(res.data);
        console.log("register done");
        setTimeout(() => {
          history.push("/registerdone");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  const checkboxPrivacy = () => {
    var checkbox = document.getElementById("myCheck");

    console.log(checkbox);
    console.log(checkbox.checked);

    if (checkbox.checked) {
      setPrivacy(true);
    } else {
      setPrivacy(false);
    }
  };

  // FOR ADMIN CHECKING USER
  // const get = () => {
  //   Axios.get("http://localhost:3302/user/getuser")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="register">
        <div className="reg-container">
          <div className="register-side">
            <div className="reg-icon">
              <Link className="reg-icon-text" tabIndex="-1">
                icon <i className="fas fa-box-open" />
              </Link>
            </div>
            <div className="reg-desc">
              <h1 className="reg-desc-h1">Sign up.</h1>
              <p className="reg-desc-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="reg-input">
              <form className="reg-input-form">
                <label>
                  <h2 className="reg-input-text">Full Name</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Name"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Email</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="name@email.com"
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Password</h2>
                  <input
                    type="password"
                    className="reg-input-bar"
                    placeholder="at least 8 character"
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                  />
                </label>
                <label className="reg-privacy">
                  <input
                    type="checkbox"
                    className="reg-privacy-left"
                    tabIndex="-1"
                    id="myCheck"
                    onClick={() => {
                      checkboxPrivacy();
                    }}
                  />
                  <p className="reg-privacy-right">
                    By creating an account you agree to the term of use and our
                    privary policy.
                  </p>
                </label>
                <button
                  className="reg-button"
                  type="button"
                  // disabled={
                  //   !userData.email &&
                  //   !userData.password &&
                  //   !userData.full_name &&
                  //   !privacy
                  // }
                  disabled={
                    !userData.email ||
                    !userData.password ||
                    !userData.full_name ||
                    !privacy
                  }
                  onClick={() => {
                    register();
                  }}
                >
                  <p className="reg-button-text">Create account</p>
                </button>
                <div className="reg-login">
                  <p className="reg-login-left">Already have an account?</p>
                  <Link className="reg-login-right">Login</Link>
                </div>
              </form>
            </div>
          </div>
          <div className="content-side"></div>
        </div>
      </div>
    </>
  );
}

export default Register;
