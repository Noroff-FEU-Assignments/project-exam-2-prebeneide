import React, { useEffect, useState } from "react";
import logo from "../assets/logo/holidaze_logo_green.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { BASE_URL, PLACES_API, POPULATE } from "../constants/api";
import { useNavigate } from "react-router-dom";
import DropDownProductItem from "./DropDownProductItem";

function UserNav() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const response = await axios.get(BASE_URL + PLACES_API + POPULATE);
      console.log(response.data.data);
      setPlaces(response.data.data);
    };
    loadPlaces();
  }, []);

  const navigate = useNavigate();
  const redirect = function (id) {
    setSuggestions([]);
    navigate(`/detail/${id}`);
    setSearch("");
  };

  const onChangeHandler = (search) => {
    let matches = [];
    if (search.length > 0) {
      matches = places.filter((place) => {
        const regex = new RegExp(`${search}`, "gi");
        return place.attributes.name.match(regex);
      });
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setSearch(search);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="nav-container d-flex">
        <Navbar.Brand href="/">
          <img className="nav-logo" alt="logo" src={logo} />
        </Navbar.Brand>

        <Navbar.Toggle />

        <div className="navbar__search--container">
          <input
            placeholder="Search for hotels, B&B's or guesthouses..."
            type="text"
            className="col-md-4"
            style={{ marginTop: 0 }}
            onChange={(e) => onChangeHandler(e.target.value)}
            value={search}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          <div className="navbar__search--dropdown-menu">
            {suggestions &&
              suggestions.map((suggestion) => (
                <div
                  className="navbar__search--dropdown-item"
                  key={suggestion.id}
                  onClick={() => redirect(suggestion.id)}
                >
                  <DropDownProductItem data={suggestion} />
                </div>
              ))}
          </div>
        </div>

        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;
