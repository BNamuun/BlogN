import { useState } from "react";
import axios from "axios";
export function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function login() {
    axios
      .get(
        `http://localhost:8000/login?username=${username}&password=${password}`
      )
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem("loginToken", token);

          // window.location = "/admin";
          window.location.reload();
          alert("Амжилттай нэвтэрлээ");
        }
      });
    // return console.log({ username, password });
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
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login} className="btn btn-primary">
        Нэвтрэх
      </button>
    </div>
  );
}
