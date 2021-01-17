import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";

import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useState } from "react";

export default function Header() {
  let history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [searchFormActive, setSearchFormActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearchForm = (e) => {
    try {
      setSearchValue(e.target.value);
      setSearching(true);
    } catch (error) {
      setSearchValue("");
      setSearching(false);
    }
  };

  const handleSearchFormBlur = (e) => {
    let idString = ["init"];

    try {
      let id = e.relatedTarget.id;
      idString = id.split(":");
    } catch (error) {}

    setSearchFormActive(false);
    setSearchValue("");

    if (idString[0] == "headerLink") {
      history.push(idString[1]);
    } /* else {
        
      } */
  };

  const handleSearchFormClick = (e) => {
    setSearchFormActive(true);
  };

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
              {/* <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>

          <div>
            <Form inline>
              <FormControl
                onChange={handleSearchForm}
                type="text"
                placeholder="Etsi kaupunki tai postinumero..."
                className="mr-sm-2"
                value={searchValue}
                onBlur={handleSearchFormBlur}
                onClick={handleSearchFormClick}
              />

              <Search
                searchValue={searchValue}
                setSearchResults={setSearchResults}
                setSearching={setSearching}
              />
            </Form>

            {searchFormActive && searching && (
              <ListGroup id="searchResultList">
                {searching == true ? (
                  <ListGroup.Item key={"searchResult-searching"}>
                    Hakee
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
            )}

            {searchFormActive && !searching && (
              <ListGroup id="searchResultList">
                {searchResults == null ? (
                  <ListGroup.Item key={"searchResult-none"}>
                    Ei tuloksia
                  </ListGroup.Item>
                ) : (
                  Object.keys(searchResults).map((key) =>
                    searchResults[key].map((e, i) => (
                      <ListGroup.Item
                        as={Link}
                        id={`headerLink:/${key.toLowerCase()}/${e}`}
                        to={`/${key.toLowerCase()}/${e}`}
                        key={"searchResult-" + i}
                      >
                        {key + " : " + e}
                      </ListGroup.Item>
                    ))
                  )
                )}
              </ListGroup>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
