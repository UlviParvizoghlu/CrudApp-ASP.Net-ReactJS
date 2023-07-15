import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CRUD = () => {
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
    getData()
  }, []);

  const getData = () =>{
    axios.get('http://localhost:5024/api/Employee').then((result) => {

    setData(result.data)
      
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleEdit = (id) =>{
    handleShow()
    axios.get(`http://localhost:5024/api/Employee/${id}`).then((result) => {

    setEditName(result.data.name)
    setEditAge(result.data.age)
    setEditIsActive(result.data.isActive)
    setEditId(id)
      
    }).catch((error) => {
      console.log(error);
    });
  }
  const handleDelete = (id) =>{
    if(window.confirm('Are you sure delete this?') === true)
    {
      axios.delete(`http://localhost:5024/api/Employee/${id}`).then((result)=>{
        if(result.status === 200)
        {
          toast.success('Employee has been deleted')
          getData()
        }
      }).catch((error)=>{
        toast.error(error)
      })
    }
  }

  const handleUpdate = (id) =>{
    const url = `http://localhost:5024/api/Employee/${editId}`
    const data = {
      "id" : editId,
      "name" : editName,
      "age" : editAge,
      "isActive" : editIsActive
      
    }
    axios.put(url,data)
    .then((result) =>{
      getData();
      clear()
      toast.success('Employee has been updated')
    }).catch((error)=>{
      toast.error(error)
    })
    handleClose()
   
  }

  const handleSave = () =>{
    const url = 'http://localhost:5024/api/Employee'
    const data = {
      "name" : name,
      "age" : age,
      "isActive" : isActive
    }

    axios.post(url,data)
    .then((result) =>{
      getData();
      clear()
      toast.success('Employee has been added')
    }).catch((error)=>{
      toast.error(error)
    })
  }



  const clear = () =>{
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
    setEditId('');
  }

  const handleActiveChange = (e) =>{
    if(e.target.checked)
    {
      setIsActive(1)
    }
    else{
      setIsActive(0)
    }
  }
  const handleEditActiveChange = (e) =>{
    if(e.target.checked)
    {
      setEditIsActive(1)
    }
    else{
      setEditIsActive(0)
    }
  }

  return (
    <Fragment>
      <ToastContainer/>
      <Container className="py-3">
      <Row>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)} />
        </Col>
        <Col>
        <input type="text" className="form-control" placeholder="Enter Age" value={age} onChange={(e)=> setAge(e.target.value)} />
        </Col>
        <Col>
        <input type="checkbox" checked={isActive ===1 ? true : false} onChange={(e)=> handleActiveChange(e)} value={isActive}/>
        <label>isActive</label>
        </Col>
        <Col>
        <button className="btn btn-primary" onClick={()=> handleSave()}>Submit</button>
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
        <input type="checkbox" checked={editIsActive ===1 ? true : false} onChange={(e)=> handleEditActiveChange(e)} value={editIsActive}/>
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
