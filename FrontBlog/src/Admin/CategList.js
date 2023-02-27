import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function CategList({ list, GetList }) {
  // const [editing, setEditing] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const editing = searchParams.get("editing");
  function DeleteBtn(id) {
    if (window.confirm("Delete")) {
      axios.delete(`http://localhost:8000/categories/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          GetList();
        }
      });
    }
  }
  function EditBtn() {
    alert("works");
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} <button onClick={() => EditBtn(item.id)}>Засах</button>
            <button onClick={() => DeleteBtn(item.id)}> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
