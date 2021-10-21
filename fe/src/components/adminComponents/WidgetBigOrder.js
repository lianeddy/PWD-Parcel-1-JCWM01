import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./WidgetBigOrder.css";

function WidgetBigOrder() {
  // get data from db
  const [orderList, setOrderList] = useState();
  // generate UI(tr, td) for data
  const [returnOrder, setReturnOrder] = useState("test");
  // generate HTML option month + year
  const [generateMonth, setGenerateMonth] = useState([<option>None</option>]);
  const [generateYear, setGenerateYear] = useState([<option>None</option>]);
  // get current month and year value
  const [selectPeriod, setSelectPeriod] = useState({
    month: "1",
    year: "2017",
  });

  const Button = ({ type }) => {
    return <button className={"wid-lg-button" + type}>{type}</button>;
  };

  useEffect(() => {
    getProduct();
    generateOption();
    // renderOrder();
  }, []);

  // set state product with data selected
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

  // render to appear in UI
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

  // generate <option> month and year
  const generateOption = () => {
    let dateToday = new Date();
    let todayMonth = dateToday.getMonth() + 1;
    let todayYear = dateToday.getFullYear();
    console.log(dateToday);
    console.log(todayMonth);
    console.log(todayYear);

    if (dateToday.getFullYear()) {
    }

    console.log("[Slice Year]", generateYear);
    console.log("[Slice Year]", generateYear[0]);

    var monthArr = [];
    var yearArr = [];

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
    var initialYear = 2017;

    var selisihTahun = todayYear - initialYear;
    console.log(selisihTahun);

    for (let i = 0; i < 12; i++) {
      monthArr.push(<option value={i + 1}>{monthList[i]}</option>);
    }

    for (let i = initialYear; i <= todayYear; i++) {
      yearArr.push(<option value={i}>{i}</option>);
    }

    console.log(monthArr);

    setGenerateMonth(monthArr);
    setGenerateYear(yearArr);
    console.log(generateMonth);
    console.log(generateYear);
    console.log(selectPeriod);
  };

  const checkState = () => {
    console.log(selectPeriod);
  };

  return (
    <div className="widget-large">
      <h3 className="wid-large-title">Latest Transactions</h3>
      <button onClick={checkState} />
      <h1 className="wid-large-title-select">
        Choose Month and Year of Transactions
      </h1>
      <div className="wid-large-select-container">
        <select
          onChange={(e) => {
            console.log("click month");
            console.log(e.target.value);
            setSelectPeriod({
              ...selectPeriod,
              month: e.target.value,
            });
          }}
          className="wid-select-1"
        >
          {/* <option>option 1</option> */}
          {generateMonth}
        </select>
        <select
          onChange={(e) => {
            console.log("click year");
            console.log(e.target.value);
            setSelectPeriod({
              ...selectPeriod,
              year: e.target.value,
            });
          }}
          className="wid-select-2"
        >
          {generateYear}
        </select>
        <button onClick={renderOrder} className="wid-select-btn">
          Generate User Transactions
        </button>
      </div>
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
      {/* <button
        type="button"
        onClick={() => {
          renderOrder();
        }}
        className="wid-button"
      >
        render product
      </button> */}
    </div>
  );
}

export default WidgetBigOrder;
