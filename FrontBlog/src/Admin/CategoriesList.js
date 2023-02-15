import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CategList } from "./CategList";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export function CategoriesList() {
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);

  function GetList() {
    axios.get("http://localhost:8000/categories").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setList1(data);
      } else {
        alert(`Error: ${status}`);
      }
    });
  }
  function Refresh() {
    GetList();
  }
  useEffect(() => {
    GetList();
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-around mt-5">
          <h1>Ангилал</h1>
          {/* <button className='btn btn-primary'> Шинэ</button> */}
          <ModalNew Refresh={Refresh} />
        </div>
        <CategList list={list1} />
      </div>
    </>
  );
}

function ModalNew({ onChange, Refresh }) {
  const [text, setText] = useState("");
  function getVal(e) {
    setText(e.target.value);
  }
  // console.log(text);
  function SaveData() {
    // onChange(text);
    axios
      .post("http://localhost:8000/categories", {
        name: text,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          Refresh();
          setText("");
          handleClose();
        }
      });
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Ангилалын нэр:</h6>
          <input value={text} onChange={getVal} className="w-100" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={SaveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
