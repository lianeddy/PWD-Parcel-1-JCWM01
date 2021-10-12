import Axios from "axios";
import React, { useState } from "react";
import "./ProfilePicture.css";

function ProfilePicture() {
  const [filePict, setFilePict] = useState();

  console.log(filePict);

  const onBtnAddFile = (e) => {
    // console.log("e", e);
    // console.log("get elemt by id", document.getElementById("img-preview"));
    // console.log("Target", e.target);
    // console.log("Target files", e.target.files);
    // console.log("URL create", URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      setFilePict({
        addFileName: e.target.files[0].name,
        addFile: e.target.files[0],
      });

      let preview = document.getElementById("img-preview");

      preview.src = URL.createObjectURL(e.target.files[0]);

      // console.log("preview src", preview.src);
      // function URL.createObjectUrl tiap kali run, ngehasilin src baru
      // console.log("createObjectUrl 1", URL.createObjectURL(e.target.files[0]));
      // console.log("createObjectUrl 2", URL.createObjectURL(e.target.files[0]));
      // console.log("createObjectUrl 3", URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadFunction = () => {
    console.log("masuk upload func");
    console.log(filePict);
    if (filePict.addFile) {
      // File yg dikirimkan ga bsa dibawa lsg pke JSON, jdi hrs pake FormData
      let formData = new FormData();

      // console.log(formData);
      // console.log(filePict);

      // let obj = {
      //   profile_pict: "test",
      // };

      // formData.append("data", JSON.stringify(obj));
      formData.append("file", filePict.addFile);
      // formData.append("file", filePict);

      // console.log(formData);
      console.log("otw masuk axios");
      console.log(formData);
      Axios.post("http://localhost:3302/album/uploadprofile", formData)
        .then((res) => {
          console.log("axios res");
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("axios err");
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="pict-container">
        <h1>Ada tulisan</h1>
        <div className="pict-container-1">{/* <img id="img-preview" /> */}</div>
        <div className="pict-container-2">
          <img id="img-preview" className="img-prev" />
        </div>
        <div className="pict-container-3">
          <label htmlFor="img">Image : </label>
          <input type="file" className="form-control" onChange={onBtnAddFile} />
          <button
            onClick={() => {
              uploadFunction();
            }}
          >
            Click here
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePicture;
