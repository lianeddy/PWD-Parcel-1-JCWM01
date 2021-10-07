import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";


function UserProfile() {
  const [userData, setUserData] = useState({});
  const UserProfile = () => {
    console.log(userData);
    Axios.post(`http://localhost:3302/user/profile`, userData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("test")
  });

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
      <div className="UserProfile">
        <div className="reg-container">
          <div className="UserProfile-side">
            <div className="reg-icon">
              <Link className="reg-icon-text" tabIndex="-1">
                Picture <i className="fas fa-portrait" />
              </Link>
            </div>
            <div className="reg-desc">
              <h1 className="reg-desc-h1">Profile</h1>
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
                  <h2 className="reg-input-text">Gender</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Gender"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Address</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Address"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Age</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Age"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <button
                  className="reg-button"
                  type="button"
                  onClick={() => {
                    UserProfile();
                  }}
                  disabled={
                    !userData.email && !userData.password && !userData.full_name
                  }
                >
                  <p className="reg-button-text">Edit Profile</p>
                </button>
                <div className="reg-login">
                  <Link className="reg-login-right">Update</Link>
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

export default UserProfile;
