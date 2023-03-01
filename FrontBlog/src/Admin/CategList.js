import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function CategList({ list, getList }) {
  // const [editing, setEditing] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const editing = searchParams.get("editing");
  function deleteBtn(id) {
    if (window.confirm("Delete")) {
      axios.delete(`http://localhost:8000/categories/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          getList();
        }
      });
    }
  }
  function editBtn(id) {
    setSearchParams({ editing: id });
    console.log(searchParams);
    axios.put(`http://localhost:8000/categories/${editing}`).then((res)=>{
      const {data, status} = res;
      if (status ===200){
        console.log(data);
        getList();
      }else{
        alert('aldaa')
      }
    })
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => editBtn(item.id)}>Засах</button>
            <button onClick={() => deleteBtn(item.id)}> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
