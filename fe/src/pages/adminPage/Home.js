import React from "react";
import Chart from "../../components/adminComponents/Chart";
import FeaturedInfo from "../../components/adminComponents/FeaturedInfo";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart />
    </div>
  );
}

export default Home;
