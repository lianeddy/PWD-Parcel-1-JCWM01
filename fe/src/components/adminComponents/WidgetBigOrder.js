import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./WidgetBigOrder.css";

function WidgetBigOrder() {
  const [orderList, setOrderList] = useState();
  const [returnOrder, setReturnOrder] = useState("test");
  const [generateMonth, setGenerateMonth] = useState([<option>None</option>]);

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
            <span className="wid-lg-name">{i.full_name}</span>
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

  const generateSelectMonth = () => {
    let dateToday = new Date();
    let todayMonth = dateToday.getMonth() + 1;
    let todayYear = dateToday.getFullYear();
    console.log(dateToday);
    console.log(todayMonth);
    console.log(todayYear);

    var monthArr = [];

    var monthList = [
      "Januari",
      "Febuari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    for (let i = 0; i < todayMonth; i++) {
      monthArr.push(<option>{monthList[i]}</option>);
    }

    console.log(monthArr);

    setGenerateMonth(monthArr);
    console.log(generateMonth);
  };

  return (
    <div className="widget-large">
      <button onClick={generateSelectMonth}>Generate Select Month</button>
      <select>
        {/* <option>option 1</option> */}
        {generateMonth}
      </select>
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
