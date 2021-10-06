import React from "react";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../redux/actions/user";
import { connect } from "react-redux";
import styled from "styled-components";

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

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    if (this.props.userGlobal.id) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <div className="row">
          <div className="col-12 text-center">
            <h1>Login now !</h1>
            <p className="lead">
              Login now and start shopping in the most affordable ecommercer
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            {this.props.userGlobal.errMsg ? (
              <div className="alert alert-danger">
                {this.props.userGlobal.errMsg}
              </div>
            ) : null}
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3"></h5>
                <input
                  onChange={this.inputHandler}
                  name="username"
                  placeholder="Username"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  onChange={this.inputHandler}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      this.props.loginUser(this.state);
                    }}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                  <Link>Forgot Password?</Link>
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
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
