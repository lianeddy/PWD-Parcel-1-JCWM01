import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./adminTransaksi.css";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup,Label,Input, Button,Modal, ModalHeader, ModalBody, ModalFooter, Row, Badge } from 'reactstrap';
import { useHistory } from "react-router-dom";



function UserTransaksi() {
  const [transactions, setUserTransaksi] = useState([]);
  const [userData] = useState({});
  
  let history = useHistory();

  
  const user = async (status) => {
    console.log(typeof status !== 'undefined');
    let url = ""
    if (typeof status !== 'undefined')
      url = `http://localhost:3302/admin/admin?status=${status}`;
    else
      url = `http://localhost:3302/admin/admin`
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

  
  const [modal, setModal] = useState(false);
  const [current_order_detail_id, setOrderDetailId] = useState(0)
  const [selectedFile, setSelectedFile] = useState("")

  const toggle1 = (order_detail_id) => {
    
    setOrderDetailId(order_detail_id)  
    setModal(!modal);
  }
  const toggle2 = () => setModal(!modal)

     // On file select (from the pop up)
    function onFileChange (event) {
    
      // Update the state
      console.log (event.target.files[0])
      setSelectedFile(event.target.files[0] );
      
    
    };
    
    // On file upload (click the upload button)
    function onFileUpload (event) {

       // Create an object of formData
       const formData = new FormData();
    
       // Update the formData object
       formData.append(
         "file",
         selectedFile,
         selectedFile.name,
       );
      
       formData.append (
        'orderDetailId', current_order_detail_id
       )
        
       // Details of the uploaded file
       console.log(formData);
     
       // Request made to the backend api
       // Send formData object
       Axios.post("http://localhost:3302/admin/upload-payment", formData)
       .then(res => {
        console.log(res.status)
        alert ("Upload Success")
        history.push("/UserTransaksi") ;
        
        // tambahain text : jika res.status 200 alert "berhasil" selain itu alert "upload gagal"

        // update database. di payment detail img name teraimpan di database
      })
      setModal(!modal);
    };
    function modalEnter  ()  {
      console.log('ss')
      console.log(current_order_detail_id)
    }

    const confirm = async (id) => {
      let url = ""
      let data = {id:id,status:2}
      url = `http://localhost:3302/admin/confirm`;
      // ngambil data dari database by id yang login
      Axios.post(url, data)
        .then(res => {
          user()
          console.log(res.data);
          console.log(transactions)
          
    
        })
        .catch((err) => console.log(err));
    };

    const rejected = async (id) => {
      let url = ""
      let data = {id:id,status:3}
      url = `http://localhost:3302/admin/confirm`;
      // ngambil data dari database by id yang login
      Axios.post(url, data)
        .then(res => {
          user()
          console.log(res.data);
          console.log(transactions)
          
    
        })
        .catch((err) => console.log(err));
    };
    
    





  return (
    <>
    <div className="container">
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle>
        Admin Transaction Check
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
              return {
                ...data,
                // styles: {
                //   ...data.styles,
                //   overflow: 'auto',
                //   maxHeight: '100px',
                // },
              };
            },
          },
        }}
      >
        {/* status = 0 (transaksi belum dibayar)
        status = 1 (menunggu confirm pembayaran)
        status = 2 (payment approve)
        status = 3 (rejected) 
        status = 4 (selesai) */}
      <DropdownItem onClick={() => user()}>All transaction</DropdownItem>
      <DropdownItem onClick={() => user(0)}>Waiting Payment</DropdownItem>
      <DropdownItem onClick={() => user(1)}>Waiting Confirm Payment</DropdownItem>
      <DropdownItem onClick={() => user(2)}>Payment Approve</DropdownItem>
      <DropdownItem onClick={() => user(3)}>Rejected</DropdownItem>
      <DropdownItem onClick={() => user(4)}>Transaction Done</DropdownItem>
      </DropdownMenu>
      </Dropdown>,
    
    {transactions.map(transaction => (
    <Row>
    
    <div>
    
      <Card>
        <CardBody>
          <CardTitle tag="h5">{transaction.no_order}</CardTitle>
          <Badge color="primary">{transaction.status}</Badge>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{transaction.created_at}</CardSubtitle>
          <Row>
            <div className="col-6">
              {transaction.products}
            </div>
          </Row>
          {/* if condition react */}
         
          {transaction.status == 1 &&
          <>
          <Button color="success" onClick={()=>confirm((transaction.order_detail_id))}>Confirm</Button>
          <Button color="danger" onClick={()=>rejected((transaction.order_detail_id))}>Rejected</Button>
          </>
          }
      
          
        </CardBody>
      </Card>
    
    </div>
    </Row>
    ))}

    </div>
    <div>
      
      <Modal isOpen={modal} onEnter={modalEnter} >
        <ModalHeader toggle={toggle1}>Modal title</ModalHeader>
        <ModalBody>
            <FormGroup>
              <Label for="exampleFile"></Label>
              <Input type="file" name="file" id="exampleFile" onChange={onFileChange} />

            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onFileUpload}>Done</Button>
          <Button color="secondary" onClick={toggle2}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
    </>
    
  );
};

  


export default UserTransaksi;
