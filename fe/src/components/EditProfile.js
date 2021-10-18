import React, { useState, useEffect } from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";
// import "./EditProfile.css";
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

  let id = 1;

  const user = () => {
    // console.log(userData);
    Axios.get(`http://localhost:3302/user?id=${id}`).then((res) => {
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
      <div className="EditProfile">
        <div className="r-container">
          <div className="UserProfile-side">
            <div className="reg-desc">
              <h1 className="reg-desc-h1">Profile</h1>
              <p className="reg-desc-text">
                Give us your information to access further page.
              </p>
            </div>
            <div className="reg-input">
              <Form className="reg-input-form" onSubmit={edituser}>
                <label>
                  <h2 className="reg-input-text">Full Name</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Name"
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Email</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Gender</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Address</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Address"
                    value={addres}
                    onChange={(e) => {
                      setAddres(e.target.value);
                    }}
                  />
                </label>
                <label>
                  <h2 className="reg-input-text">Age</h2>
                  <input
                    type="text"
                    className="reg-input-bar"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </label>

                <Button className="reg-button" type="submit">
                  Update Data
                </Button>
              </Form>
            </div>
          </div>
          <div className="content-side"></div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
