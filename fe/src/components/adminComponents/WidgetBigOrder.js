import Axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./WidgetBigOrder.css";

function WidgetBigOrder() {
  // WIDGET - LARGE START ////////////////////////////
  // get data from db
  const [orderList, setOrderList] = useState();
  // generate UI(tr, td) for data
  const [returnOrder, setReturnOrder] = useState("No Data Selected");
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

  // COMPONENT DID UPDATE
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      // mounted.current = true;
      getProduct();
    } else {
      // do componentDidUpdate logic
    }
  });

  // set state product with data selected
  const getProduct = () => {
    Axios.get(
      `http://localhost:3302/adminreport/getorderlist?month=${selectPeriod.month}&year=${selectPeriod.year}`
    )
      .then((res) => {
        // console.log(res);
        // console.log("get order berhasil");
        setOrderList(res.data);
      })
      .catch((err) => {
        // console.log("get order gagal");
      });
    // console.log("axios get");
  };

  // render to appear in UI
  const renderOrder = () => {
    console.log("renderOrder masuk");
    console.log(orderList, "[orderList]");
    var test = orderList.map((i) => {
      console.log("[i]", i);
      console.log("map i");
      return (
        <tr className="wid-lg-tr">
          <td className="wid-lg-user">
            <img
              className="wid-lg-img"
              src={
                i.profile_pic
                  ? "http://localhost:3302" + i.profile_pic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
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
    sortTopBuyer();
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
  // WIDGET - LARGE END //////////////////////////////
  // WIDGET - SMALL START ////////////////////////////
  const [sortTopBuy, setSortTopBuy] = useState([["No Data Selected"]]);

  const klikAdd = () => {
    // setSortTopBuy(orderList[0]);
    console.log(sortTopBuy);
    // setSortTopBuy([...sortTopBuy, orderList[0]]);
  };

  const sortTopBuyer = () => {
    console.log("masuk top buyer");
    // console.log(orderList);
    // console.log(orderList.length);
    // console.log(orderList[0]);
    var initialSort = [[0]];
    for (let i = 0; i < orderList.length; i++) {
      console.log("[i]", i);
      // console.log(initialSort[0]);
      // console.log(!initialSort[0]);
      if (!initialSort[0].includes(orderList[i].id)) {
        initialSort[0].push(orderList[i].id);
        console.log(initialSort);
        initialSort.push(orderList[i]);
        console.log(initialSort);
      } else {
        var idDoubleIndex = initialSort[0].indexOf(orderList[i].id);
        console.log(idDoubleIndex);
        // initialSort[]
        initialSort[idDoubleIndex].total =
          initialSort[idDoubleIndex].total + orderList[i].total;
      }
    }
    initialSort.splice(0, 1);
    console.log(initialSort);
    // sort by rank top buyer
    var sortTopBuyer = initialSort.sort(function (a, b) {
      if (a.total > b.total) return -1;
      if (a.total < b.total) return 1;
      return 0;
    });
    console.log("[top buyer]", sortTopBuyer);
    // render top buyer
    var renderTopBuyer = sortTopBuyer.map((i) => {
      return (
        <li className="wid-sm-list-item">
          <div className="wid-sm-img-container">
            <img
              src={
                i.profile_pic
                  ? "http://localhost:3302" + i.profile_pic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              alt=""
              className="wid-sm-img"
            />
            <span className="wid-sm-user-name">{i.full_name}</span>
          </div>
          <div className="wid-sm-user-container">
            <div className="wid-sm-user">
              <span className="wid-sm-user-title">Rp.{i.total}</span>
            </div>
          </div>
        </li>
      );
    });
    setSortTopBuy(renderTopBuyer);
  };
  // WIDGET - SMALL END ////////////////////////////
  return (
    <div className="widget-sm-lg-container">
      <div className="widget-small">
        <span className="wid-sm-title">Top Buyers</span>
        {/* <button onClick={() => klikAdd()}>klik buyer</button>
        <button onClick={() => sortTopBuyer()}>top buyer</button> */}
        {/* Render Top Buyer */}
        <ul className="wid-sm-list">
          <li className="wid-sm-list-header">
            <div className="wid-sm-list-header-1">Customer</div>
            <div className="wid-sm-list-header-2">Total Payment</div>
          </li>
          {sortTopBuy}
        </ul>
      </div>
      <div className="widget-large">
        <h3 className="wid-large-title">Latest Transactions</h3>
        {/* <button onClick={checkState} /> */}
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
          <button
            onClick={() => {
              renderOrder();
            }}
            className="wid-select-btn"
          >
            Generate User Transactions
          </button>
        </div>
        <table className="wid-lg-table">
          <tr className="wid-lg-tr-1">
            <th className="wid-lg-th-2">Customer</th>
            <th className="wid-lg-th-2">Date</th>
            <th className="wid-lg-th-1">Amount</th>
            <th className="wid-lg-th-1">Status</th>
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
    </div>
  );
}

export default WidgetBigOrder;
