import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./WidgetBigOrder.css";

function WidgetBigOrder() {
  const [orderList, setOrderList] = useState();
  const [returnOrder, setReturnOrder] = useState("test");

  const Button = ({ type }) => {
    return <button className={"wid-lg-button" + type}>{type}</button>;
  };

  useEffect(() => {
    getProduct();
  }, []);

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
        <tr className="wid-lg-tr">
          <td className="wid-lg-user">
            <img
              className="wid-lg-img"
              src="https://images.unsplash.com/photo-1634430078581-1bec7774a622?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            ></img>
            <span className="wid-lg-name">{i.id}</span>
          </td>
          <td className="wid-lg-date">
            {i.created_at.slice(0, 10) + " " + i.created_at.slice(11, 19)}
          </td>
          <td className="wid-lg-amount">{`Rp.${i.total}`}</td>
          <td className="wid-lg-status">
            <Button type={i.status} />
          </td>
        </tr>
        // <tr>
        //   <h1>{i.id}</h1>
        //   <h1>{i.user_id}</h1>
        //   <h1>{i.total}</h1>
        //   <h1>{i.status}</h1>
        // </tr>
      );
    });
    setReturnOrder(test);
  };

  return (
    <div className="widget-large">
      <h3 className="wid-large-title">Latest Transactions</h3>
      <table className="wid-lg-table">
        <tr className="wid-lg-tr">
          <th className="wid-lg-th">Customer</th>
          <th className="wid-lg-th">Date</th>
          <th className="wid-lg-th">Amount</th>
          <th className="wid-lg-th">Status</th>
        </tr>
        {/* <tr className="wid-lg-tr">
          <td className="wid-lg-user">
            <img
              className="wid-lg-img"
              src="https://images.unsplash.com/photo-1634430078581-1bec7774a622?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            ></img>
            <span className="wid-lg-name">Susan Carol</span>
          </td>
          <td className="wid-lg-date">2 Jun 2021</td>
          <td className="wid-lg-amount">Rp. 100.000,00</td>
          <td className="wid-lg-status">
            <Button type="Pending" />
          </td>
        </tr> */}
        {returnOrder}
      </table>
      <button
        type="button"
        onClick={() => {
          renderOrder();
        }}
        className="wid-button"
      >
        render product
      </button>
    </div>
  );
}

export default WidgetBigOrder;
