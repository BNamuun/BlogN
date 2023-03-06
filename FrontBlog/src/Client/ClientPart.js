import { Route, Routes } from "react-router-dom";
import { BlogPage } from "./BlogPage";
import { Header1 } from "./Header";

export function ClientPart() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header1 />} />
        <Route path ="/blog" element ={<BlogPage/>}/>
      </Routes>
    </>
  );
}
