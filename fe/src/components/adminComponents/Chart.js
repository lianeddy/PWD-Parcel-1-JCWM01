import React, { useState } from "react";
import "./Chart.css";
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
// import { ResponsiveContainer, LineChart } from "recharts";
// { title, data, dataKey, grid }

function Chart() {
  const [selectYear, setSelectYear] = useState({ year: 2021 });
  const [yearData, setYearData] = useState();
  const [sortedYearData, setSortedYearData] = useState();

  const getYearlyData = () => {
    Axios.get(
      `http://localhost:3302/adminreport/getyearsales?year=${selectYear.year}`
    )
      .then((res) => {
        setYearData(res.data);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const logYearData = () => {
    console.log(yearData);
    console.log(selectYear);
    console.log(selectYear.year);
  };

  const sortYearData = () => {
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

    var sortData = selectYear.map((i) => {
      var dateConvert = i.created_at.splice(5, 2);
      console.log(dateConvert);
    });
  };

  const userData = [
    {
      month: "Jan",
      sales: 23000,
      cost: 15000,
      revenue: 8000,
    },
    {
      month: "Feb",
      sales: 33000,
      cost: 12000,
      revenue: 21000,
    },
    {
      month: "Mar",
      sales: 13000,
      cost: 9000,
      revenue: 4000,
    },
  ];
  const title = "User Analytic";
  const dataKey = "sales";
  const dataKeyTwo = "cost";
  const dataKeyThree = "revenue";
  // const grid = grid;

  return (
    <div className="chart">
      <h3 className="chart-title">{title}</h3>
      <button onClick={() => getYearlyData()}>YEarly Data</button>
      <button onClick={() => logYearData()}>YEarly Data Log</button>
      <button onClick={() => sortYearData()}>sort Data </button>
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
  );
}

export default Chart;
