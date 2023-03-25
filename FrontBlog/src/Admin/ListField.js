import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function ListField({ list, refresh }) {
  // const [text, setText] = useState("");
  console.log(list);
  const [searchParams, setSearchParams] = useSearchParams({});
  // const editing = searchParams.get("editing");
  function deleteBtn(id) {
    if (window.confirm("Delete")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/categories/${id}`)
        .then((res) => {
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

  if (!list) return null;
  return (
    <>
      <ul>
        {list.map((item, index) => (
          <li key={item._id}>
            {item.name}{" "}
            <button onClick={() => editBtn(item._id, item.name)}>Засах</button>
            <button onClick={() => deleteBtn(item._id)}> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
