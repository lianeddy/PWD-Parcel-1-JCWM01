import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
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
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Email</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="name@email.com"
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Password</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="at least 8 character"
                  />
                </label>
                <label className="reg-privacy">
                  <input
                    type="checkbox"
                    className="reg-privacy-left"
                    tabIndex="-1"
                  />
                  <p className="reg-privacy-right">
                    By creating an account you agree to the term of use and our
                    privary policy.
                  </p>
                </label>
                <button className="reg-button">
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
