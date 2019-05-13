import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';

class Login extends React.Component {
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    if(userData.token) {
      this.props.history.push('/')
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post(
      `${location.protocol}//${location.host}/auth/login/`,
      data,
    ).then((response) => {
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data))
      this.props.history.push('/')
    }).catch((error) => {
      console.log(error)
    });
  }
  
  render () {
    return (
      <Container>
        <br/>
        <Row className="justify-content-md-center">
          <h3>Login</h3>
        </Row>
        <br/>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form
              style={{
                border: 0,
                borderRadius: '1rem',
                boxShadow: '0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1)',
                padding: 25
              }}
              onSubmit={this.handleLogin}
            >
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="username" name="username"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" name="password"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login
