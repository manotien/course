import React from "react"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import service from '../service'

class Login extends React.Component {
  state = {
    showError: false
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'))
    if(token) {
      this.props.history.push('/')
    }
  }

  handleLogin = (event) => {
    this.setState({showError: false})
    event.preventDefault()
    const data = new FormData(event.target)
    service.post(
      '/auth/login/',
      data,
    ).then((response) => {
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', JSON.stringify(data.token))
      localStorage.setItem('role', JSON.stringify(data.role))
      this.props.history.push('/')
    }).catch((error) => {
      if(error.response.status == 400) {
        this.setState({showError: true})
      }
    })
  }
  
  render () {
    const {
      showError
    } = this.state
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
                <Form.Control required placeholder="username" name="username"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="password" name="password"/>
              </Form.Group>
              { showError ?
                <Alert variant="danger">
                  Incorrect username or password
                </Alert> : null
              }
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
