import React from "react";
import { Link, Redirect } from "react-router-dom";
import { URL_API } from "../helper";
import { connect } from "react-redux";

import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://umroh.com/blog/wp-content/uploads/2020/03/5-macam-parcel-lebaran-source-pixabay1.png")
      center;
  background-size: cover;
`;

class Edit extends React.Component {
  state = {
    password: "",
    newpassword: "",
    confirmnewpassword: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  submitHandler = () => {
    console.log(this.props.userGlobal)
    if (this.state.confirmnewpassword !== this.state.newpassword) {
      alert("Password Baru tidak match");
  
    } else {
      axios.patch(`${URL_API}/users/editPassword/${this.props.userGlobal.id}`, this.state)
      .then(res=> {
        console.log(res)
      })
    }
  };

  render() {
  

    return (
      <Container>
        <div className="row">
          <div className="col-12 text-center">
            <p className="lead">
              Edit Your Password
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3"></h5>
                <input
                  onChange={this.inputHandler}
                  name="password"
                  placeholder="password"
                  type="password"
                  className="form-control my-2"
                />
                <input
                  onChange={this.inputHandler}
                  name="newpassword"
                  placeholder="New Password"
                  type="password"
                  className="form-control my-2"
                />
                <input
                  onChange={this.inputHandler}
                  name="confirmnewpassword"
                  placeholder="Confirm New Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      this.submitHandler(this.state);
                    }}
                    className="btn btn-primary mt-2"
                  >
                    Edit Password
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
    // cartGlobal: state.cart,
  };
};

export default connect(mapStateToProps)(Edit);
