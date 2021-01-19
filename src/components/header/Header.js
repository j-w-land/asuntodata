import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

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
  const [showAllResults, setShowAllResults] = useState(false);

  const handleSearchForm = (e) => {
    try {
      setSearchValue(e.target.value);
      setSearching(true);
    } catch (error) {
      setSearchValue("");
      setSearching(false);
    }
  };

  // On blurring search field close the result list
  const handleSearchFormBlur = (e) => {
    try {
      // If user clicked "Näytä lisää" /"Näytä vähemmän" ->update search result list
      if (e.relatedTarget.id === "showAllSearchResultsToggle") {
        setShowAllResults((state) => !state);
        document.getElementById("searchFormControl").focus();
        return;
      }
    } catch (error) {}

    let idString = ["init"];

    try {
      let id = e.relatedTarget.id;
      idString = id.split(":");
    } catch (error) {}

    setSearchFormActive(false);
    setSearchValue("");
    setShowAllResults(false);

    if (idString[0] === "headerLink") {
      history.push(idString[1]);
    }
  };

  const handleSearchFormClick = (e) => {
    setSearchFormActive(true);
  };

  const getSearchResultListing = (showAll) => {
    let keys = Object.keys(searchResults);
    let resArr = [];

    let limit = 9;

    let index = 0;
    for (const key in keys) {
      for (const result in searchResults[keys[key]]) {
        if (result > limit && showAll === false) {
          resArr.push(
            <ListGroup.Item
              key={"searchResult-show-more"}
              id={"showAllSearchResultsToggle"}
              as={Link}
              to={""}
            >
              Näytä lisää..
            </ListGroup.Item>
          );
          return resArr;
        }

        resArr.push(
          <ListGroup.Item
            as={Link}
            id={`headerLink:/${keys[key].toLowerCase()}/${
              searchResults[keys[key]][result]
            }`}
            to={`/${keys[key].toLowerCase()}/${
              searchResults[keys[key]][result]
            }`}
            key={"searchResult-" + result}
          >
            {keys[key] + " : " + searchResults[keys[key]][result]}
          </ListGroup.Item>
        );
      }

      index = index + 1;
    }
    if (resArr.length > 10) {
      resArr.push(
        <ListGroup.Item
          key={"searchResult-show-more"}
          id={"showAllSearchResultsToggle"}
          as={Link}
          to={""}
        >
          Näytä vähemmän..
        </ListGroup.Item>
      );
    }

    return resArr;
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
                id="searchFormControl"
              />

              <Search
                searchValue={searchValue}
                setSearchResults={setSearchResults}
                setSearching={setSearching}
              />
            </Form>

            {searchFormActive && searching && (
              <ListGroup id="searchResultList">
                {searching === true ? (
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
                  getSearchResultListing(showAllResults).map((e) => e)
                )}
              </ListGroup>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
