import React, { useEffect, useState } from "react";
import Axios from "axios";

function VerificationPage() {
  const [verifyMessage, setVerifyMessage] = useState("loading???....");

  console.log("test");

  useEffect(() => {
    console.log("masuk usEffect");
    // console.log(props);
    // Axios.patch("http://localhost:3302/user/verified", { full_name: "test" })
    //   .then((res) => {
    //     console.log("ok");
    //     setVerifyMessage("Your Account is verified");
    //     console.log(verifyMessage);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  });

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

  return (
    <>
      <p>Test</p>
      <h1>{verifyMessage}</h1>
    </>
  );
}

export default VerificationPage;
