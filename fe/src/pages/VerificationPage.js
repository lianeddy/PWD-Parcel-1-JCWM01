import React from "react";
import Verification from "../components/Verification";

// Verification Page if component and page seperated

function VerificationPage(props) {
  return (
    <>
      {console.log(props)}
      <Verification req={props} />
    </>
  );
}

export default VerificationPage;
