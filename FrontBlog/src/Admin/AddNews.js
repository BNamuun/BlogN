import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesSelector } from "./CategoriesSelector";

export function AddNews() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [text, setText] = useState("");
  function submit() {
    console.log(title, categoryId, text);
    axios
      .post("http://localhost:8000/articles", {
        title,
        categoryId,
        text,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert("Success");
        }
      });
  }
  console.log(categoryId);
  return (
    <div className="d-flex flex-column gap-3 m-5">
      <CategoriesSelector
        value={categoryId}
        onChange={(val) => setCategoryId(val)}
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control"
        placeholder="Гарчиг"
      ></input>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="form-control"
        placeholder="Мэдээ оруулах"
      ></input>
      <button className="btn btn-primary m-3" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
