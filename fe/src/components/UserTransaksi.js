import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
// import "./userTransaksi.css";
import { Table,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup,Label,Input,FormText, Button } from 'reactstrap';



function UserTransaksi() {
  const [transactions, setUserTransaksi] = useState([]);
  const [userData] = useState({});
  
  let id = 1
  const user = async (status) => {
    console.log(typeof status !== 'undefined');
    let url = ""
    if (typeof status !== 'undefined')
      url = `http://localhost:3302/order?id=${id}&status=${status}`;
    else
      url = `http://localhost:3302/order?id=${id}`
    // ngambil data dari database by id yang login
    Axios.get(url, userData)
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
  
      <DropdownItem onClick={() => user(0)}>On Going transaction</DropdownItem>
      <DropdownItem onClick={() => user(1)}>Transaction Done</DropdownItem>
      <DropdownItem onClick={() => user()}>All transaction</DropdownItem>
      </DropdownMenu>
      </Dropdown>,


  
  <Table dark>
  <thead>
    <tr>
      <th>Status</th>
      <th>Date</th>
      <th>Proof Payment</th>
      <th>Order Number</th>
      <th>Parcel</th>
      <th>Quantity</th>
      <th>Parcel Price</th>
      <th>Total</th>
      <th>Confirm Order</th>
    </tr>
  </thead>
  {transactions.map(transaction => (
  <tbody>
    <tr>
      <td>{transaction.status}</td>
      <td>{transaction.created_at}</td>
      <FormGroup>
          <Label for="exampleFile"></Label>
          <Input type="file" name="file" id="exampleFile" />
      </FormGroup>
      <td>{transaction.no_order}</td>
      <td>{transaction.nama}</td>
      <td>{transaction.quantity}</td>
      <td>{transaction.harga}</td>
      <td>{transaction.total}</td>
      <Button color="primary" size="sm">Confirm</Button>
      <Button color="secondary" size="sm">Cancel</Button>
      {/* <Button color="primary" size="sm">Small Button</Button>{' '}
      <Button color="secondary" size="sm">Small Button</Button>\ */}
    </tr>
  </tbody>
        )
      )
    };
    </Table>
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
