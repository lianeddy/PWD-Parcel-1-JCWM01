import React from "react";
import "./RegisterDone.css";

function RegisterDone() {
  return (
    <div className="register-done">
      <div className="register-done-container">
        <i className="far fa-paper-plane" />
        <h1 className="done-word-1">Thanks for Registering!</h1>
        <p className="done-word-2">
          A verification mail has been sent to your email account. Please check
          your inbox to verify.
        </p>
      </div>
    </div>
  );
}

export default RegisterDone;
