import React from "react";
import Axios from "axios";

// Verification Page if without Components

class VerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("masuk axios");
    console.log(this.props);
    console.log(this.props.computedMatch);
    console.log(this.props.computedMatch.params);
    console.log(this.props.computedMatch.params.token);
    console.log(this.state);
    Axios.patch(
      "http://localhost:3302/user/verified",
      {},
      {
        headers: {
          Authorization: `Bearer ${this.props.computedMatch.params.token}`,
        },
      }
    )
      .then((res) => {
        console.log("res 1");
        this.setState({ message: "Your Acoount Verified" });
      })
      .catch((err) => {
        console.log(err);
        console.log("error cuy");
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
        <>
          <div className="verification-container">
            <p>Test</p>
            <h1>{"for now" + this.state.message}</h1>
            <p>Test</p>
          </div>
        </>
      </>
    );
  }
}

export default VerificationPage;
