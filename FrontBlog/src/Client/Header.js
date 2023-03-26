import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { renderMatches } from "react-router-dom";
import img from "../images/kira-auf-der-heide-8s1wfA6aB-4-unsplash.jpg";
import "./header.css";
import { Main } from "./Main";
import { NavBar } from "./navbar";
import { Link } from "react-router-dom";

export function Header1() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
function Header() {
  return (
    <>
      <div className="wrap">
        <div className="navbar">
          <div className="navbarR">BLOG</div>
          <div>
            <ul className="navbarR">
              <li> Works</li>
              <li> Blog</li>
              <Link to="/Login "> Login</Link>
              <Link to="/Registration "> Registration</Link>
              <li> Details</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="header-text">
            {" "}
            <h1>My blog</h1>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in
              massa egestas mollis varius; dignissim elementum. Ac purus in
              massa egestas mollis varius; dignissim elementum.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
