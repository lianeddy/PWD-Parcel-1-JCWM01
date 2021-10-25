import React, { useEffect, useState, useRef } from "react";
import "./EdChart.css";
import {
  LineChart,
  Line,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Axios from "axios";
import { URL_API } from "../../helper";
// import { ResponsiveContainer, LineChart } from "recharts";
// { title, data, dataKey, grid }

function EdChart() {
  // selected year option (year : 2017)
  const [selectYear, setSelectYear] = useState({ year: 2017 });
  // data from db
  const [yearData, setYearData] = useState();
  // data converted to graph
  const [sortedYearData, setSortedYearData] = useState();
  // year option
  const [generateYear, setGenerateYear] = useState();

  // generate summary revenue, cost, sales
  const [summarySales, setSummarySales] = useState([0, 0, 0]);

  useEffect(() => {
    getYearlyData();
    generateOption();
  }, []);

  // COMPONENT DID UPDATE
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      // mounted.current = true;
      getYearlyData();
      // sortYearData();
    } else {
      // do componentDidUpdate logic
    }
  });

  // generate year option
  const generateOption = () => {
    let dateToday = new Date();
    let todayYear = dateToday.getFullYear();
    console.log(todayYear);

    // console.log("[Slice Year]", generateYear);
    // console.log("[Slice Year]", generateYear[0]);

    var yearArr = [];

    var initialYear = 2017;

    var selisihTahun = todayYear - initialYear;
    console.log(selisihTahun);

    for (let i = initialYear; i <= todayYear; i++) {
      yearArr.push(<option value={i}>{i}</option>);
    }

    setGenerateYear(yearArr);
  };

  const getYearlyData = () => {
    Axios.get(`${URL_API}/adminreport/edgetyearly?year=${selectYear.year}`)
      .then((res) => {
        setYearData(res.data);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const sortYearData = () => {
    // selling_price
    var arrMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sortData = yearData.map((i) => {
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

      arrMonth[i.created_at.slice(5, 7) - 1] =
        arrMonth[i.created_at.slice(5, 7) - 1] + i.selling_price;

      console.log(arrMonth);

      // setSortedYearData(arrMonth);
    });

    // cost
    var arrMonthCost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sortData = yearData.map((i) => {
      arrMonthCost[i.created_at.slice(5, 7) - 1] =
        arrMonthCost[i.created_at.slice(5, 7) - 1] + i.admin_price;

      console.log(arrMonthCost);

      // setSortedYearData(arrMonth);
    });
    // revenue
    var arrMonthRevenue = [];
    for (let j = 0; j < 12; j++) {
      arrMonthRevenue.push(arrMonth[j] - arrMonthCost[j]);
    }
    console.log(arrMonthRevenue);

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
    // RENDER GRAPH
    var renderGraph = [];
    for (let j = 0; j < 12; j++) {
      renderGraph.push({
        month: monthList[j],
        sales: arrMonth[j],
        cost: arrMonthCost[j],
        revenue: arrMonthRevenue[j],
      });
    }
    console.log(renderGraph);
    setSortedYearData(renderGraph);

    // SUMMARY YEAR
    var salesSum = 0;
    var costSum = 0;
    var revSum = 0;
    for (let j = 0; j < 12; j++) {
      salesSum = salesSum + arrMonth[j];
      costSum = costSum + arrMonthCost[j];
      revSum = revSum + arrMonthRevenue[j];
    }
    setSummarySales([salesSum, costSum, revSum]);
  };

  const userData = sortedYearData;
  const title = "User Analytic";
  const dataKey = "sales";
  const dataKeyTwo = "cost";
  const dataKeyThree = "revenue";
  // const grid = grid;

  return (
    <div>
      <div className="featured">
        <div className="fe-item">
          <span className="fe-title">Revenue</span>
          <div className="fe-money-container">
            <span className="fe-money">Rp.{summarySales[2]}</span>
            {/* <span className="fe-money-rate ">-11.4</span> */}
            {/* <i className="fas fa-chevron-up" /> */}
          </div>
          {/* <span className="fe-sub">Compared to last month</span> */}
        </div>
        <div className="fe-item">
          <span className="fe-title">Sales</span>
          <div className="fe-money-container">
            <span className="fe-money">Rp.{summarySales[0]}</span>
            {/* <span className="fe-money-rate ">-11.4</span>
            <i className="fas fa-chevron-down" /> */}
          </div>
          {/* <span className="fe-sub">Compared to last month</span> */}
        </div>
        <div className="fe-item">
          <span className="fe-title">Cost</span>
          <div className="fe-money-container">
            <span className="fe-money">Rp.{summarySales[1]}</span>
            {/* <span className="fe-money-rate ">-11.4</span>
            <i className="fas fa-chevron-up" /> */}
          </div>
          {/* <span className="fe-sub">Compared to last month</span> */}
        </div>
      </div>
      <div className="chart">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-selection-container">
          <select
            onChange={(e) => {
              console.log("click year");
              console.log(e.target.value);
              setSelectYear({
                year: e.target.value,
              });
            }}
            className="wid-select-2"
          >
            {generateYear}
          </select>
          <button
            onClick={() => sortYearData()}
            className="chart-button-getchart"
          >
            Get Chart Data
          </button>
        </div>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={userData}>
            <XAxis dataKey="month" stroke="#5550bd" />
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Line
              type="monotone"
              dataKey={dataKeyTwo}
              stroke="rgb(226, 97, 74)"
            />
            <Line type="monotone" dataKey={dataKeyThree} stroke="#4fe2cc" />
            <Tooltip />
            <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EdChart;
