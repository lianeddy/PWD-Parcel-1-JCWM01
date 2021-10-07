import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./EditProfile.css";
import {Button} from "react-bootstrap";
import "./UserProfile";


function EditProfile() {
  // const [userData, setUserData] = useState({});
  const [full_name, setFullname] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [adress, setAdress] = useState();
  const [age, setAge] = useState();

  let id = 1
  const [userData, setUserData] = useState({});
  const user = () => {
   
    console.log(userData);
    Axios.patch(`http://localhost:3302/edit-user?id=${id}`, userData)
      .then((res) => {
        console.log(res.data);

        setFullname(res.data[0].full_name);
        setEmail(res.data[0].email);
        setGender(res.data[0].gender);
        setAdress(res.data[0].addres);
        setAge(res.data[0].age);
      })
      .catch((err) => console.log(err));
  };

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
      <div className="EditProfile">
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
                  <p>{full_name}</p>
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
                  <p>{email}</p>
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
                  <p>{gender}</p>
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
                  <p>{adress}</p>
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
                  <p>{age}</p>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Age"
                    onChange={(e) => {
                      setUserData({ ...userData, full_name: e.target.value });
                    }}
                  />
                </label>
                <Link to={`/profile/edit-user/${id}`}>
                  <Button className="reg-button" type="button">
                  Update Data
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

export default EditProfile;
