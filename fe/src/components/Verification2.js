import React from "react";
import Axios from "axios";
// import { useHistory } from "react-router";
import "./Verification.css";
import { URL_API } from "../helper";

class Verification2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Verifing Account... Please wait...",
      verify: false,
    };
  }

  componentDidMount() {
    console.log("masuk axios");
    console.log(this);
    console.log(this.props);
    console.log(this.props.req.computedMatch);
    console.log(this.props.req.computedMatch.params.token);
    console.log(this.state);
    Axios.patch(
      `${URL_API}/user/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.props.req.computedMatch.params.token}`,
        },
      }
    )
      .then((res) => {
        console.log("res 1");
        this.setState({
          message: "Your Account is Verified",
          verify: true,
          messagePlus: "You will be redirected to landing page...",
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("error cuy");
        this.setState({ message: "Failed to Verified Account" });
      });
  }
  // Axios.patch(
  //   "http://localhost:3302/user/verified",
  //   {},
  //   {
  //     headers: {
  //       Authorization: `Bearer ${this.props.computedMatch.params.token}`,
  //     },
  //   }
  // )

  // useEffect(() => {
  //   console.log("masuk usEffect");
  //   // console.log(props);
  //   Axios.patch("http://localhost:3302/user/verified", { full_name: "test" })
  //     .then((res) => {
  //       console.log("ok");
  //       setVerifyMessage("Your Account is verified");
  //       console.log(verifyMessage);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  render() {
    return (
      <>
        <div className="verification">
          <div className="verification-container">
            <i className={this.state.verify ? "fas fa-check" : "none"} />
            <div className="ver-done-word">
              <h1 className="ver-done-word-1">{this.state.message}</h1>
              <p className="ver-done-word-2">{this.state.messagePlus}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Verification2;
