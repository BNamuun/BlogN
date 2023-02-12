import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CategList } from "./CategList";
import { v4 as uuidv4 } from "uuid";
export function CategoriesList() {
  const [list, setList] = useState([]);
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-around mt-5">
          <h1>Ангилал</h1>
          {/* <button className='btn btn-primary'> Шинэ</button> */}
          <ModalNew onChange={(val) => setList([...list, val])} />
        </div>
        <CategList list={list} />
      </div>
    </>
  );
}

function ModalNew({ onChange }) {
  const [text, setText] = useState("");
  function getVal(e) {
    setText(e.target.value);
    // console.log(text);s
  }
  function SaveData() {
    onChange(text);
    setText("");
    handleClose();
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
