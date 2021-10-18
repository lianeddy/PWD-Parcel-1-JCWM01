import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const inputHandler = (e) => {
    console.log("input handler masuk");
    const value = e.target.value;
    const name = e.target.name;

    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="login">
      <div className="log-1">
        <div className="log1-text">
          <h1 className="log1-text-upper">Login now !</h1>
          <p className="log1-text-lower">
            Login now and start shopping in the most affordable ecommercer
          </p>
        </div>
      </div>
      <div className="log-2">
        <div className="log-2-container">
          {this.props.userGlobal.errMsg ? (
            <div className="alert alert-danger">
              {this.props.userGlobal.errMsg}
            </div>
          ) : null}
          <div className="log2-con">
            <div className="log2-con2">
              {/* <h5 className="font-weight-bold mb-3"></h5> */}
              <input
                onChange={this.inputHandler}
                name="email"
                placeholder="Email"
                type="text"
                className="log2-email"
              />
              <input
                onChange={this.inputHandler}
                name="password"
                placeholder="Password"
                type="password"
                className="log2-password"
              />
              <div className="log2-button">
                <button
                  onClick={() => {
                    console.log("login clicked");
                    this.props.loginUser(this.state);
                  }}
                  className="log2-but"
                >
                  Login
                </button>
                <Link to={"/forgot"} className="log2-forget">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
