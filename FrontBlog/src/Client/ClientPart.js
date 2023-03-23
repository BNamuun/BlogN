import { Route, Routes } from "react-router-dom";
import { Register } from "../components/register";
import { BlogPage } from "./BlogPage";
import { Header1 } from "./Header";
import { NavBar } from "./navbar";

export function ClientPart() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Header1 />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}
