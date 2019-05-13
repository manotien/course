import React from 'react'
import axios from 'axios';
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

class Profile extends React.PureComponent {
  state = {
    birthday: '',
    first_name: '',
    last_name: '',
    nick_name: '',
    gender: '',
    user_id: '',
    token: ''
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user')) || {}
    const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const headers = {
      headers: {'Authorization': "bearer " + userData.token}
    };
    axios.get(
      `${location.protocol}//${location.host}/users/${userData.user_id}`,
      headers
    ).then((response) => {
      const data = response.data;
      this.setState({...this.cleanNull(data), user_id: data.id, token: userData.token})
    }).catch((error) => {
      console.log(error)
    })
  }

  cleanNull = (data) => {
    Object.keys(data).forEach((key) => {
      if(data[key] == null) data[key] = ''
    });
    return data
  }

  handleSave = (event) => {
    event.preventDefault();
    const data = this.state;
    delete data['password_digest']
    const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    const headers = {
      headers: {'Authorization': "bearer " + this.state.token}
    };
    axios.put(
      `${location.protocol}//${location.host}/users/${this.state.user_id}`,
      data,
      headers
    ).then((response) => {
    }).catch((error) => {
      console.log(error)
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }
  
  render () {
    const {
      birthday,
      first_name,
      last_name,
      nick_name,
      gender
    } = this.state
    return (
      <Container>
        <br/>
        <Row className="justify-content-md-center">
          <h3>User Profile</h3>
        </Row>
        <br/>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form
              onSubmit={this.handleSave}
            >
              <Form.Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    value={first_name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    name="last_name"
                    value={last_name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Nick Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nick Name"
                    name="nick_name"
                    value={nick_name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="birthday"
                    value={birthday}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    placeholder="Gender"
                    name="gender"
                    value={gender}
                    onChange={this.handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
  
export default Profile