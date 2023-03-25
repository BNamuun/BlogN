import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ListField } from "./ListField";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
export function CategoriesList() {
  const [list1, setList1] = useState([]);

  function getList() {
    axios.get(`${process.env.REACT_APP_API_URL}/categories`).then((res) => {
      const { data, status } = res;
      // console.log(data);
      if (status === 200) {
        setList1(data);
      } else {
        alert(`Error: ${status}`);
      }
    });
  }
  function refresh() {
    getList();
  }

  console.log("render");
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-around mt-5">
          <h1>Ангилал</h1>
          {/* <button className='btn btn-primary'> Шинэ</button> */}
          <ModalNew refresh={refresh} />
        </div>
        <ListField list={list1} refresh={refresh} />
      </div>
    </>
  );
}

function ModalNew({ refresh }) {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  // const [name, setName] = useState("");
  const handleKeyDown = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      // setText(event.target.value);
      saveData();
    }
  };
  function getVal(e) {
    setText(e.target.value);
  }
  const editing = searchParams.get("editing");
  // console.log(text);
  // function getEditedItem() {
  useEffect(() => {
    if (editing) {
      // setShow(true);
      if (editing !== "new") {
        axios
          .get(`${process.env.REACT_APP_API_URL}/categories/${editing}`)
          .then((res) => {
            const { data, status } = res;
            // console.log(data);
            console.log(res);
            if (status === 200) {
              setText(data.name);
            } else {
              alert(`error${status}`);
            }
          });
      }
    }
  }, [editing]);

  // }

  function saveData() {
    // onChange(text);
    if (editing === "new") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/categories`, {
          name: text,
        })
        .then((res) => {
          const { status } = res;
          if (status === 201) {
            refresh();
            setText("");
            handleClose();
          }
        });
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/categories/${editing}`, {
          name: text,
        })
        .then((res) => {
          const { status } = res;
          if (status === 200) {
            refresh();
            setText("");
            handleClose();
          }
        });
    }
  }

  function modalFunction() {
    setShow(true);
    setSearchParams({ editing: "new" });
  }

  function handleClose() {
    setShow(false);
    setSearchParams({});
  }
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const inputEl = useRef();
  useEffect(() => {
    if (show) {
      inputEl.current.focus();
    }
  }, [show]);
  return (
    <>
      <Button variant="primary" onClick={modalFunction}>
        Шинэ
      </Button>

      <Modal show={editing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Ангилалын нэр:</h6>
          <input
            ref={inputEl}
            value={text}
            onKeyDown={handleKeyDown}
            onChange={getVal}
            className="w-100"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
