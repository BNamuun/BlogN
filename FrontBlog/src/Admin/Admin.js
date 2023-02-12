import { Route, Routes } from "react-router-dom";
import { NavBar } from "../Client/navbar";
import { CategoriesList } from "./CategoriesList";

export function Admin() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/categories" element={<CategoriesList />} />
      </Routes>
    </>
  );
}
