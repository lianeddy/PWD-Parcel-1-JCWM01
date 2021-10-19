import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

import { Button } from "react-bootstrap";

import ProfilePictureNoEdit from "./ProfilePictureNoEdit";

function UserProfile() {
  const [userData] = useState({});
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState();
  const [age, setAge] = useState();

  let id = 12;
  const user = () => {
    console.log(userData);

    // ngambil data dari database by id yang login
    Axios.get(`http://localhost:3302/user/get?id=${id}`, userData)
      .then((res) => {
        console.log(res.data);
        setFullname(res.data[0].full_name);
        setEmail(res.data[0].email);
        setGender(res.data[0].gender);
        setAdress(res.data[0].addres);
        setAge(res.data[0].age);
        // console.log(userEdit);
      })
      .catch((err) => console.log(err));
  };
  // const [userEdit, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    console.log("test");
    user();
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
      <div className="wrapper">
        <div className="wrap-container">
          <div className="userProfile-side">
            {/* <div className="reg-icon"></div> */}
            {/* <div className="wrap-picture">
              <ProfilePicture />
            </div> */}
            <div className="wrap-1">
              <h1 className="wrap-1-info">Your Profile</h1>
              <p className="wrap-1-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="wrap-2">
              <form className="wrap-2-form">
                <label className="wrap-2-form-container">
                  <h2 className="wrap-2-text">Full Name</h2>
                  <p className="wrap-2-data">{full_name}</p>
                </label>
                <label className="wrap-2-form-container">
                  <h2 className="wrap-2-text">Email</h2>
                  <p className="wrap-2-data">{email}</p>
                </label>
                <label className="wrap-2-form-container">
                  <h2 className="wrap-2-text">Gender</h2>
                  <p className="wrap-2-data">{gender}</p>
                </label>
                <label className="wrap-2-form-container">
                  <h2 className="wrap-2-text">Address</h2>
                  <p className="wrap-2-data">{adress}</p>
                </label>
                <label className="wrap-2-form-container">
                  <h2 className="wrap-2-text">Age</h2>
                  <p className="wrap-2-data">{age}</p>
                </label>
                <div className="wrap-picture">
                  <ProfilePictureNoEdit />
                </div>
                <Link to={`/edit/${id}`}>
                  <Button className="wrap-button" type="button">
                    Edit Profile
                  </Button>
                </Link>
              </form>
            </div>
          </div>
          {/* <div className="content-side"></div> */}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
