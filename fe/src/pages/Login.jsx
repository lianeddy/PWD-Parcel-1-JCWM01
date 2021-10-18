import React from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../redux/actions/user";
import { connect } from "react-redux";
import styled from "styled-components";
import "./Login.css";

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.5)
//     ),
//     url("https://umroh.com/blog/wp-content/uploads/2020/03/5-macam-parcel-lebaran-source-pixabay1.png")
//       center;
//   background-size: cover;
// `;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    if (this.props.userGlobal.email) {
      return <Redirect to="/" />;
    }

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
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
