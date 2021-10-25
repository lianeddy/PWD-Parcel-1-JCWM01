import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./Register.css";
import { URL_API } from "../helper";

function Register() {
  const [userData, setUserData] = useState({});
  const [privacy, setPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  const [isMessagePass, setIsMessagePass] = useState("");

  let history = useHistory();

  const checkEmail = () => {
    Axios.get(`${URL_API}/users/checkemail?email=${userData.email}`)
      .then((res) => {
        if (Boolean(res.data[0])) {
        }
        console.log(res.data);
        console.log(Boolean(res.data[0]));
        console.log("check email berhasil");
      })
      .catch((err) => {
        console.log(err);
        console.log("check email gagal");
      });
  };

  const register = () => {
    console.log(!userData.email);
    console.log(!userData.password);
    console.log(!userData.full_name);
    console.log(!privacy);
    setIsLoading(true);

    console.log(userData, "userData");
    Axios.get(`${URL_API}/users/checkemail?email=${userData.email}`)
      .then((res) => {
        console.log(userData.email);
        console.log(Boolean(res.data[0]) + "a  truuue");
        console.log(userData.password.length);
        if (!Boolean(res.data[0]) && userData.password.length >= 8) {
          console.log(res.data);
          console.log("check email berhasil");
          Axios.post(`${URL_API}/users/registeruser`, userData)
            .then((res) => {
              console.log(res.data);
              console.log("register done");
              // setIsLoading(false);
              // conditial rendering
              history.push("/registerdone");
            })
            .catch((err) => console.log(err));
        } else if (
          !Boolean(res.data[0]) == true &&
          userData.password.length <= 8
        ) {
          setIsLoading(false);
          setIsMessage("");
          setIsMessagePass("Password minimal 8 character.");
        } else if (
          !Boolean(res.data[0]) == false &&
          userData.password.length >= 8
        ) {
          setIsLoading(false);
          setIsMessage("Email already used.");
          setIsMessagePass("");
        } else {
          setIsLoading(false);
          setIsMessage("Email already used.");
          setIsMessagePass("Password minimal 8 character.");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("check email gagal");
      });
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
        <div className="register-container">
          <div className="register-side">
            <div className="register-icon">
              <Link className="register-icon-text" tabIndex="-1">
                icon <i className="fas fa-box-open" />
              </Link>
            </div>
            <div className="register-desc">
              <h1 className="register-desc-h1">Sign up.</h1>
              <p className="register-desc-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="register-input">
              <form className="register-input-form">
                <label>
                  <h2 className="register-input-text">Full Name</h2>
                  <input
                    type="text"
                    className="register-input-bar"
                    placeholder="Name"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <label>
                  <h2 className="register-input-text">Email</h2>
                  <input
                    type="text"
                    className="register-input-bar"
                    placeholder="name@email.com"
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                      setIsMessagePass("");
                      setIsMessage("");
                    }}
                  />
                  <p className="message-email">
                    {isMessage ? isMessage : null}
                  </p>
                </label>
                <label>
                  <h2 className="register-input-text">Password</h2>
                  <input
                    type="password"
                    className="register-input-bar"
                    placeholder="at least 8 character"
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                      setIsMessagePass("");
                      setIsMessage("");
                    }}
                  />
                  <p className="message-pass">
                    {isMessagePass ? isMessagePass : null}
                  </p>
                </label>
                <label className="register-privacy">
                  <input
                    type="checkbox"
                    className="register-privacy-left"
                    tabIndex="-1"
                    id="myCheck"
                    onClick={() => {
                      checkboxPrivacy();
                    }}
                  />
                  <p className="register-privacy-right">
                    By creating an account you agree to the term of use and our
                    privary policy.
                  </p>
                </label>
                <button
                  className="register-button"
                  type="button"
                  // disabled={
                  //   !userData.email &&
                  //   !userData.password &&
                  //   !userData.full_name &&
                  //   !privacy
                  // }
                  disabled={
                    // normalnya
                    // userData.email = false, isLoading = false
                    //      Jadi disabled = false (ga bsa di click)
                    // begitu terisi semua data, dan di click isLoading() jalan = true
                    //      Jadi disabled nya 4true = bisa diclick, begitu diclick sekali setIsLoading = true
                    // conditionnya jika 3true 1false MAKA true
                    // conditionnya jika 1true 3false MAKA true
                    // conditionnya jika 4false MAKA false
                    !userData.email ||
                    !userData.password ||
                    !userData.full_name ||
                    !privacy ||
                    isLoading
                  }
                  onClick={() => {
                    register();
                  }}
                >
                  <p className="register-button-text">
                    {isLoading ? "Loading..." : "Create account"}
                  </p>
                </button>
                <div className="register-login">
                  <p className="register-login-left">
                    Already have an account?
                  </p>
                  <Link className="register-login-right">Login</Link>
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
