import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClientPart } from "./Client/ClientPart";
import "bootstrap/dist/css/bootstrap.min.css";
import { Admin } from "./Admin/Admin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<ClientPart />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
