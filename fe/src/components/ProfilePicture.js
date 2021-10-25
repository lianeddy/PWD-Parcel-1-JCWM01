import Axios from "axios";
import React, { useState, useEffect } from "react";
import { URL_API } from "../helper";
// import "./ProfilePicture.css";

function ProfilePicture(req) {
  const [filePict, setFilePict] = useState({});

  const id = 1;
  console.log("test");
  // console.log(req);
  // console.log(req.computedMatch.params);

  useEffect(() => {
    getAlbum();
  }, []);

  const getAlbum = () => {
    console.log("getAlbum");
    Axios.get(`${URL_API}/album/getuserphoto?id=${id}`)
      .then((res) => {
        console.log("axios get berhasil");
        console.log(res);
        console.log(res.data);
        console.log(res.data[0]);
        console.log(res.data[0].profile_pic);
        setFilePict(res.data[0].profile_pic);

        // change preview data
        let preview = document.getElementById("img-preview");
        preview.src = URL_API + res.data[0].profile_pic;
        console.log(preview);
      })
      .catch((err) => {
        console.log("axios get error");
        console.log(err);
      });
  };

  // console.log(filePict);

  const onBtnAddFile = (e) => {
    // console.log("e", e);
    console.log("get elemt by id", document.getElementById("img-preview"));
    console.log("Target", e.target);
    console.log("Target files", e.target.files);
    // console.log("URL create", URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      setFilePict({
        // addFileName: e.target.files[0].name,
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

  // POST PICTURE (GA KEPAKE SIH HRSNYA SOALNYA UDH ADA PATCH)
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
      Axios.post(`${URL_API}/album/uploadprofile`, formData)
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

  // PATCH URL PROFILE_PICT
  const patchPicture = () => {
    console.log("masuk patchPicture");

    if (filePict.addFile) {
      let formData = new FormData();
      console.log("Form");

      formData.append("file", filePict.addFile);

      Axios.patch(`${URL_API}/album/editprofilepicture`, formData)
        .then((res) => {
          console.log("axios patch berhasil");
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("axios patch error");
          console.log(err);
        });
    }
    console.log("ga ada file");
  };

  return (
    <>
      <div className="pict-container">
        <div>
          {/* <h1 className="pict-word">Profile Picture</h1> */}
          <div className="pict-container-1">
            <img id="img-preview" className="img-prev" />
          </div>
        </div>
        <div className="pict-container-3">
          <p className="pict-input-upperText">
            Select an image from your computer (jpg, jpeg, gif, jfif, etc)
          </p>
          <label htmlFor="img" for="form-control" className="pict-input-file">
            <i className="pict-input-text">Choose Picture</i>
          </label>
          <input
            type="file"
            id="form-control"
            onChange={onBtnAddFile}
            accept="image/jpg, image/jpeg"
          />
          {/* <button
            onClick={() => {
              uploadFunction();
            }}
          >
            Click here
          </button> */}
          <button
            onClick={() => {
              patchPicture();
            }}
            className="pict-button-patch"
          >
            Set Profile Picture
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePicture;
