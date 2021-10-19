import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";
import "./EditProfile.css";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function EditProfile() {
  // const [userData, setUserData] = useState({});
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [addres, setAddres] = useState("");
  const [age, setAge] = useState("");
  // back to profile
  let history = useHistory();

  let id = 12;

  const user = () => {
    // console.log(userData);
    Axios.get(`http://localhost:3302/user/get?id=${id}`).then((res) => {
      console.log(res.data);

      setFullname(res.data[0].full_name);
      setEmail(res.data[0].email);
      setGender(res.data[0].gender);
      setAddres(res.data[0].addres);
      setAge(res.data[0].age);
    });
  };

  function edituser(event) {
    event.preventDefault();

    let userData = {
      full_name: full_name,
      email: email,
      gender: gender,
      addres: addres,
      age: age,
    };
    console.log(event.target[0].value);

    Axios.patch(`http://localhost:3302/edit-user/${id}`, userData)
      .then((res) => {
        console.log(res.data);
        alert("Data Anda Telah Berubah");
        // back to profile
        history.push("/profile");
      })
      .catch((err) => console.log(err));
  }
  // use effect [] untuk perubahan data
  console.log(user);
  useEffect(() => {
    console.log("test");
    user();
  }, []);

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
      <div className="edit-wrapper">
        <div className="edit-wrapper-container">
          <div className="editUserProfile-side">
            <div className="edit-wrap-1">
              <h1 className="edit-wrap-1-info">Profile</h1>
              <p className="edit-wrap-1-text">
                Give us your information to access further PAGE.
              </p>
            </div>
            <div className="edit-wrap-2">
              <Form className="edit-wrap-2-form" onSubmit={edituser}>
                <label className="edit-wrap-2-form-container">
                  <h2 className="edit-wrap-2-text">Full Name</h2>
                  <input
                    type="text"
                    className="edit-wrap-2-data"
                    placeholder="Name"
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </label>
                <label className="edit-wrap-2-form-container">
                  <h2 className="edit-wrap-2-text">Email</h2>
                  <input
                    type="text"
                    className="edit-wrap-2-data"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
                <label className="edit-wrap-2-form-container">
                  <h2 className="edit-wrap-2-text">Gender</h2>
                  <input
                    type="text"
                    className="edit-wrap-2-data"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </label>
                <label className="edit-wrap-2-form-container">
                  <h2 className="edit-wrap-2-text">Address</h2>
                  <input
                    type="text"
                    className="edit-wrap-2-data"
                    placeholder="Address"
                    value={addres}
                    onChange={(e) => {
                      setAddres(e.target.value);
                    }}
                  />
                </label>
                <label className="edit-wrap-2-form-container">
                  <h2 className="edit-wrap-2-text">Age</h2>
                  <input
                    type="text"
                    className="edit-wrap-2-data"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </label>

                <Button className="edit-wrap-button" type="submit">
                  Update Data
                </Button>
              </Form>
            </div>
          </div>
          {/* <div className="content-side"></div> */}
        </div>
      </div>
    </>
  );
}

export default EditProfile;
