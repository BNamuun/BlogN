import { Route, Routes } from "react-router-dom";
import { NavBar } from "../Client/navbar";
import { UserLogin } from "../Client/UserLogin";
import { CategoriesList } from "./CategoriesList";

export function Admin() {
  if (!localStorage.getItem("loginToken")) {
    return <UserLogin />;
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome</h1>} />
        <Route path="/categories" element={<CategoriesList />} />
      </Routes>
    </>
  );
}
