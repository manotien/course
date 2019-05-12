import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" bg="light" variant="light">
        <Navbar.Brand>Course</Navbar.Brand>
      </Navbar>
    )
  }
}

export default NavBar