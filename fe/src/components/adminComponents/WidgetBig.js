import React from "react";
import "./WidgetBig.css";

function WidgetBig() {
  const Button = ({ type }) => {
    return <button className={"wid-lg-button" + type}>{type}</button>;
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
        <tr className="wid-lg-tr">
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
            <Button type="Approved" />
          </td>
        </tr>

        <tr className="wid-lg-tr">
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
            <Button type="Declined" />
          </td>
        </tr>

        <tr className="wid-lg-tr">
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
        </tr>

        <tr className="wid-lg-tr">
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
        </tr>
      </table>
    </div>
  );
}

export default WidgetBig;
