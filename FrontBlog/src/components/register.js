import { useState } from "react";
import axios from "axios";
export function Register() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleRegister() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/Registration`, {
        userName,
        password,
      })
      .then((res) => {
        const { data, status } = res;
      })
      .catch(({ response, code }) => {
        const { data } = response;
        alert(data.message);
      });
  }
  return (
    <>
      <div className="container w-50 mt-5 d-flex flex-column gap-2">
        <h1>Бүртгүүлэх </h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          placeholder="хэрэглэгчийн нэр"
          value={userName}
        ></input>
        <input
          type={"password"}
          className="form-control"
          placeholder="нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={handleRegister} className="btn btn-primary">
          Бүртгүүлэх
        </button>
      </div>
    </>
  );
}
