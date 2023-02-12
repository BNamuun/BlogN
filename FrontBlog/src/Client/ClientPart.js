import { Route, Routes } from "react-router-dom";
import { Header1 } from "./Header";

export function ClientPart() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header1 />} />
      </Routes>
    </>
  );
}
