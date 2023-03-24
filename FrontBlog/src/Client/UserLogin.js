import { useState } from "react";
import axios from "axios";
export function UserLogin() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      login();
    }
  }
  function login() {
    axios
      .post(`http://localhost:8000/users/login`, {
        userName,
        password,
      })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem("loginToken", token);
          // // window.location = "/admin";
          window.location.reload();
          alert("Амжилттай нэвтэрлээ");
        }
      })
      .catch(({ response, code }) => {
        // if (response.status === 401) {
        //   alert("wrong pass or username");
        // } else {
        //   alert(code);
        // }
        if (response.status === 401) {
          alert("Нууц үг эсвэл нэр буруу байна");
        } else {
          alert(code);
        }
      });
    return console.log({ userName, password });
  }
  return (
    <div className="container w-50 mt-5 d-flex flex-column gap-2">
      <input
        onChange={(e) => setUsername(e.target.value)}
        className="form-control"
        placeholder="хэрэглэгчийн нэр"
      ></input>
      <input
        type={"password"}
        className="form-control"
        placeholder="нууц үг"
        onKeyDown={handleKeyDown}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login} className="btn btn-primary">
        Нэвтрэх
      </button>
    </div>
  );
}
