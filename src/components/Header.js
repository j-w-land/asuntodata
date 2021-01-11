import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Kauppahinnat.fi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Etusivu
            </Nav.Link>

            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Näkymät" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/postinumero/53850">
                53850
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/kaupunki/Lappeenranta">
                Lappeenranta
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/kaupunginosa/Skinnarila">
                Skinnarila
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Etsi" className="mr-sm-2" />
            <Button variant="outline-success">Etsi</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
