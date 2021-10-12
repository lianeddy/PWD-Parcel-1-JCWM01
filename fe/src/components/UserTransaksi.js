import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
// import "./userTransaksi.css";
import { Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



function UserTransaksi() {
  const [transactions, setUserTransaksi] = useState([]);
  const [userData] = useState({});
  
  let id = 1
  const user = async () => {
    console.log(userData);

    // ngambil data dari database by id yang login
    Axios.get(`http://localhost:3302/order?id=${id}`, userData)
      .then(res => {
        setUserTransaksi(res.data)
        console.log(res.data);
        console.log(transactions)
        
  
      })
      .catch((err) => console.log(err));
  };
  // const [userEdit, setUser] = useState({});
  console.log(user)
  useEffect(() => {
    console.log("test")
    user()
  }, []);

  const [isOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <>
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle>
        Transaction Check
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: 'auto',
                  maxHeight: '100px',
                },
              };
            },
          },
        }}
      >
      <link to={`/edit/${id}`>
      <DropdownItem>On Going transaction</DropdownItem></link>
      

      <DropdownItem>Transaction Done</DropdownItem>
      </DropdownMenu>
      </Dropdown>,

{transactions.map(transaction => (
  
  <Table dark>
  <thead>
    <tr>
      <th>Status</th>
      <th>Date</th>
      <th>Order Number</th>
      <th>Parcel</th>
      <th>Quantity</th>
      <th>Parcel Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{transaction.status}</td>
      <td>{transaction.created_at}</td>
      <td>{transaction.no_order}</td>
      <td>{transaction.nama}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.harga}</td>
      <td>{transaction.total}</td>
      
    </tr>
  </tbody>
</Table>
        )
      )
    };
    </>
  );
};

  // FOR ADMIN CHECKING USER
  // const get = () => {
  //   Axios.get("http://localhost:3302/user/getuser")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  
    // <>
    // <div className="container">
    //   <div className="row">
    // {transactions.map(transaction => (
    //   <div className="card">
    //     <div className="card-body">
    //       <div className="row">
    //         <div className="col">
    //           <label>
    //             <h2 className="status">Status</h2>
    //             <p>{transaction.status}</p>
    //           </label>
    //         </div>
    //         <div className="col">
    //           <label>
    //             <h2 className="date">Date</h2>
    //             <p>{transaction.created_at}</p>
    //           </label>
    //         </div>
    //         <div className="col">
    //           <label>
    //             <h2 className="parcel">Order Number</h2>
    //             <p>{transaction.no_order}</p>
    //           </label>
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col">
    //           <label>
    //             <h2 className="data">Parcel</h2>
    //             <p>{transaction.nama}</p>
    //           </label>
    //         </div>
    //         <div className="col">
    //           <label>
    //             <h2 className="data">Quantity</h2>
    //             <p>{transaction.quantity}</p>
    //           </label>
    //         </div>
    //         <div className="col">
    //           <label>
    //             <h2 className="data">Parcel Price</h2>
    //             <p>{transaction.harga}</p>
    //           </label>
    //         </div>
    //         <div className="col">
    //           <label>
    //             <h2 className="data">Total</h2>
    //             <p>{transaction.total}</p>
    //           </label>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="content-side"></div>
    //   </div>
      
    // ))}
    // </div>
    // </div>
      
    // </>


export default UserTransaksi;
