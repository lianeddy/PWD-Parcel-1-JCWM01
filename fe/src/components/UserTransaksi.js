import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

import {Button} from "react-bootstrap";


function UserTransaksi() {
  const [userData] = useState({});
  const [no_order, setNoOrder] = useState();
  const [status, setStatus] = useState();
  const [created_at, setDate] = useState();
  const [total, setTotal] = useState();
  const [parcel_id, setParcel] = useState();
  const [quantity, setQuantity] = useState();
  const [harga, setHarga] = useState();
  
  let id = 1
  const user = () => {
    console.log(userData);

    // ngambil data dari database by id yang login
    Axios.get(`http://localhost:3302/order?id=${id}`, userData)
      .then((res) => {
        console.log(res.data);
        setNoOrder(res.data[0].no_order);
        setStatus(res.data[0].status);
        setDate(res.data[0].created_at);
        setTotal(res.data[0].total);
        setParcel(res.data[0].parcel_id);
        setQuantity(res.data[0].quantity);
        setHarga(res.data[0].harga);

        // console.log(userEdit);
      })
      .catch((err) => console.log(err));
  };
  // const [userEdit, setUser] = useState({});
  console.log(user)
  useEffect(() => {
    console.log("test")
    user()
  });

  // FOR ADMIN CHECKING USER
  // const get = () => {
  //   Axios.get("http://localhost:3302/user/getuser")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <>
      <div className="wrapper">
        <div className="reg-container">
          <div className="UserProfile-side">
            <div className="reg-icon">
            </div>
            <div className="right">
              <h1 className="info">Your Transactions</h1>
            </div>
            <div className="right">
              <form className="right-form">
                <label>
                  <h2 className="status">Status</h2>
                  <p>{status}</p>
                </label>
                <label>
                  <h2 className="date">Date</h2>
                  <p>{created_at}</p>
                </label>
                <label>
                  <h2 className="parcel">Order Number</h2>
                  <p>{no_order}</p>
                </label>

                <label>
                  <h2 className="data">Quantity</h2>
                  <p>{quantity}</p>
                </label>
                <label>
                  <h2 className="data">Parcel Price</h2>
                  <p>{harga}</p>
                </label>
                <label>
                  <h2 className="data">Total</h2>
                  <p>{total}</p>
                </label>
                <Link to={`/edit/${id}`}>
                  <Button className="reg-button" type="button">
                  Order Detail
                </Button>
                 </Link>
              </form>
            </div>
          </div>
          <div className="content-side"></div>
        </div>
      </div>
    </>
  );
}

export default UserTransaksi;
