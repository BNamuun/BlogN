import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export function NavBar() {
  function logout() {
    localStorage.removeItem("loginToken");
    window.location.reload();
  }
  return (
    <Navbar className=" navbar navbar-dark bg-dark" expand="sm">
      <Container fluid>
        <Navbar.Brand to="/admin" as={Link}>
          Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link to="/admin/categories" as={Link}>
              Ангилал
            </Nav.Link>
            <Nav.Link to="/admin/addNews" as={Link}>
              News
            </Nav.Link>
            <Nav.Link to="/blog" as={Link}>
              Articles
            </Nav.Link>
            <Nav.Link to="/admin/listOfTemplates" as={Link}>
              Link
            </Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="/admin/listOfTemplates" as={Link}>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Button onClick={logout} variant="outline-danger mx-2">
            {" "}
            Гарах
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
