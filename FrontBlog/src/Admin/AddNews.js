import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesSelector } from "./CategoriesSelector";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
export function AddNews() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  async function handleFileUpload(event) {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile); //formData.append(name, value) – add a form field with the given name and value,
    await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.file);
      });
  }

  function submit() {
    console.log({ title, categoryId, text, image });
    axios
      .post("http://localhost:8000/articles", {
        title,
        categoryId,
        text,
        image,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert("Success");
          setTitle("");
          setText("");
          setCategoryId("");
        }
      });
  }
  // console.log(categoryId);
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

      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          const data = editor.getData();
          setText(data);
          // console.log({ event, editor, data });
        }}
      />
      {/* <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="form-control"
        placeholder="Мэдээ оруулах"
      ></input> */}
      {/* <form
        action="http://localhost:8000/upload-image"
        method="post"
        enctype="multipart/form-data"
        style={{ margin: "2em" }}
      >
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form> */}
      <div>
        <input type="file" name="image" onChange={{ handleFileUpload }} />
      </div>
      <button className="btn btn-primary m-3" onClick={submit}>
        Submit
      </button>
    </div>
  );
}
