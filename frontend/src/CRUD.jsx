import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CRUD = () => {
  const empdata = [
    {
      id: 1,
      name: "Ulvi",
      age: 20,
      isActive: 1,
    },
    {
      id: 2,
      name: "Tahir",
      age: 19,
      isActive: 1,
    },
    {
      id: 3,
      name: "Semistan",
      age: 29,
      isActive: 0,
    },
  ];

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [name,setName] = useState('')
  const [age, setAge] = useState('')
  const [isActive, setIsActive] = useState(0)

  const [editId, setEditId] = useState('')
  const [editName,setEditName] = useState('')
  const [editAge, setEditAge] = useState('')
  const [editIsActive, setEditIsActive] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setData(empdata);
  }, []);

  const handleEdit = (id) =>{
    handleShow()
  }
  const handleDelete = (id) =>{
    if(window.confirm('Are you sure delete this?') == true)
    {
      alert(id)
    }
  }

  const handleUpdate = (id) =>{
   
  }

  return (
    <Fragment>
      <Container className="py-3">
      <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Age" value={age} onChange={(e)=> setAge(e.target.value)} />
        </Col>
        <Col>
        <input type="checkbox" checked={isActive ===1 ? true : false} onChange={(e)=> setIsActive(e)} value={isActive}/>
        <label>isActive</label>
        </Col>
        <Col>
        <button className="btn btn-primary">Submit</button>
        </Col>
      </Row>
    </Container>
      <Table className="mt-2" striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>isActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr className="text-center"  key={index}>
                    <td >{index+1}</td>
                    <td >{item.name}</td>
                    <td >{item.age}</td>
                    <td >{item.isActive}</td>
                    <td  colSpan={2}>
                      <button onClick={()=> handleEdit(item.id)} className="btn btn-primary mx-2">Edit</button>
                      <button onClick={()=> handleDelete(item.id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container className="py-3">
      <Row>
      <Col>
        <input type="text" className="form-control" placeholder="Enter Name" value={editName} onChange={(e)=> setEditName(e.target.value)} />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Age" value={editAge} onChange={(e)=> setEditAge(e.target.value)} />
        </Col>
        <Col>
        <input type="checkbox" checked={editIsActive ===1 ? true : false} onChange={(e)=> setEditIsActive(e)} value={editIsActive}/>
        <label>isActive</label>
        </Col>
      </Row>
    </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button  className="bg-black text-white" onClick={handleClose}>
            Close
          </Button>
          <Button className="bg-blue-600 text-white" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
