import Axios from "axios";
import React, { useState } from "react";

function TestMysql() {
  const [orderList, setOrderList] = useState();
  const [returnOrder, setReturnOrder] = useState("test");

  const postProduct = () => {
    Axios.post(`http://localhost:3302/testpostproduk`)
      .then((res) => {
        console.log(res);
        console.log("check email berhasil");
      })
      .catch((err) => {
        console.log("check email gagal");
      });
    console.log("axios post");
  };

  const getProduct = () => {
    Axios.get(`http://localhost:3302/admin/getorderlist`)
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
        console.log(res.data[1]);
        console.log("get order berhasil");
        setOrderList(res.data);
      })
      .catch((err) => {
        console.log("get order gagal");
      });
    console.log("axios get");
  };

  const renderOrder = () => {
    console.log("renderOrder masuk");
    var test = orderList.map((i) => {
      console.log("map i");
      return (
        <div>
          <h1>{i.id}</h1>
          <h1>{i.user_id}</h1>
          <h1>{i.total}</h1>
          <h1>{i.status}</h1>
        </div>
      );
    });
    setReturnOrder(test);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          renderOrder();
        }}
      >
        render product
      </button>
      <div>
        <h1>Data Order List</h1>
        <div>{returnOrder}</div>
      </div>
    </div>
  );
}

export default TestMysql;
