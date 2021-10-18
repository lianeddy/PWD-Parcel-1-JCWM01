import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

import {Button} from "react-bootstrap";


function UserProfile() {
  const [userData] = useState({});
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState();
  const [age, setAge] = useState();
  
  let id = 1
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
  console.log(user)
  useEffect(() => {
    console.log("test")
    user()
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
        <div className="reg-container">
          <div className="UserProfile-side">
            <div className="reg-icon">
            </div>
            <div className="right">
              <h1 className="info">Your Profile</h1>
              <p className="reg-desc-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="right">
              <form className="right-form">
                <label>
                  <h2 className="data">Full Name</h2>
                  <p>{full_name}</p>
                </label>
                <label>
                  <h2 className="data">Email</h2>
                  <p>{email}</p>
                </label>
                <label>
                  <h2 className="data">Gender</h2>
                  <p>{gender}</p>

                </label>
                <label>
                  <h2 className="data">Address</h2>
                  <p>{adress}</p>
                </label>
                <label>
                  <h2 className="data">Age</h2>
                  <p>{age}</p>
                </label>
                <Link to={`/edit/${id}`}>
                  <Button className="reg-button" type="button">
                  Edit Profile
                </Button>
                 </Link>
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
