import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ListField({ list, refresh }) {
  // const [text, setText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  // const editing = searchParams.get("editing");
  function deleteBtn(id) {
    if (window.confirm("Delete")) {
      axios.delete(`http://localhost:8000/categories/${id}`).then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          refresh();
        }
      });
    }
  }
  function editBtn(id) {
    setSearchParams({ editing: id });
    // setText(name);
  }
  return (
    <>
      <ul>
        {list.map((item, index) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => editBtn(item.id, item.name)}>Засах</button>
            <button onClick={() => deleteBtn(item.id)}> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
