import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import "./Verification.css";

function Verification(props) {
  const [verifyState, setVerifyState] = useState({
    message: "Verifing Account... Please wait...",
    verify: false,
  });

  let history = useHistory();

  useEffect(() => {
    console.log("masuk axios");
    console.log(props);
    console.log(props.req.computedMatch);
    console.log(props.req.computedMatch.params.token);
    console.log(verifyState);
    Axios.patch(
      "http://localhost:3302/user/verified",
      {},
      {
        headers: {
          Authorization: `Bearer ${props.req.computedMatch.params.token}`,
        },
      }
    )
      .then((res) => {
        console.log("res 1");
        setVerifyState({
          message: "Your Account is Verified",
          verify: true,
          messagePlus: "You will be redirected to landing page...",
        });
        setTimeout(() => {
          // redirect ke login
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        console.log("error cuy");
        setVerifyState({ message: "Failed to Verified Account" });
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="verification">
        <div className="verification-container">
          <i className={verifyState.verify ? "fas fa-check" : "none"} />
          <div className="ver-done-word">
            <h1 className="ver-done-word-1">{verifyState.message}</h1>
            <p className="ver-done-word-2">{verifyState.messagePlus}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Verification;
