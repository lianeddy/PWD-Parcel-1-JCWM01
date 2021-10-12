import Axios from "axios";
import React, { useState } from "react";
import "./ProfilePicture2.css";

function ProfilePicture2() {
  const [file, setFile] = useState({});
  const sendPicture = (e) => {
    console.log("func send Picture");
    const dataForm = new FormData();
    dataForm.append("file", file);

    Axios.post("http://localhost:3302/album/multer", dataForm)
      .then((res) => {
        console.log("berhasil");
        console.log(res);
      })
      .catch((err) => {
        console.log("gagal");
        console.log(err);
      });
  };

  return (
    <>
      <div className="pict-container">
        <div className="pict-container-3">
          <label htmlFor="file">Image : </label>
          <input
            type="file"
            id="file"
            className="form-control"
            accept=".jpg"
            onChange={(event) => {
              console.log(event);
              const file = event.target.files[0];
              setFile(file);
            }}
          />
          <button onClick={sendPicture}>Upload Profile Picture</button>
        </div>
      </div>
    </>
  );
}

export default ProfilePicture2;
