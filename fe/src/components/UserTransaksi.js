import React, { useState,useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
// import "./userTransaksi.css";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup,Label,Input, Button,Modal, ModalHeader, ModalBody, ModalFooter, Row, Badge } from 'reactstrap';
import { useHistory } from "react-router-dom";



function UserTransaksi() {
  const [transactions, setUserTransaksi] = useState([]);
  const [userData] = useState({});
  
  let history = useHistory();
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
         "myFile",
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
       Axios.post("http://localhost:3302/upload-payment", formData)
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
  return (
    <>
    <div className="container">
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
          {transaction.status == 0 &&
          <Button color="danger" onClick={()=>toggle1((transaction.order_detail_id))} >Payment Proof</Button>
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
