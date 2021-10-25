import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

import { Button } from "react-bootstrap";

function UserProfile() {
  const [userData] = useState({});
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState();
  const [age, setAge] = useState();

  let id = 1;
  const user = () => {
    console.log(userData);

    // ngambil data dari database by id yang login
    Axios.get(`http://localhost:3302/user?id=${id}`, userData)
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
      <div className="UserProfile">
        <div className="reg-container">
          <div className="UserProfile-side">
            <div className="reg-icon"></div>
            <div className="right">
              <h1 className="info">Your Profile</h1>
              <p className="reg-desc-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="user-profile">
              <form className="right-profile">
                
                <label>
                  <h2 className="profile">Full Name</h2>
                  <p>{full_name}</p>
                </label>
                <br></br>
                <label>
                  <h2 className="email">Email</h2>
                  <p>{email}</p>
                </label>
                <br></br>

                <label>
                  <h2 className="gender">Gender</h2>
                  <p>{gender}</p>
                </label>
                <br></br>
                <label>
                  <h2 className="Address">Address</h2>
                  <p>{adress}</p>
                </label>
                <br></br>
                <label>
                  <h2 className="age">Age</h2>
                  <p>{age}</p>
                </label>
                <br></br>
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
