import React from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import service from '../service'
import toastr from 'toastr'

class Profile extends React.Component {
  state = {
    birthday: '',
    firstName: '',
    lastName: '',
    nickName: '',
    gender: '',
    userId: ''
  }

  componentDidMount() {
    service.get(
      `/users/get`
    ).then((response) => {
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data))
      this.setState({
        birthday: data.birthday,
        firstName: data.first_name,
        lastName: data.last_name,
        nickName: data.nick_name,
        gender: data.gender,
        userId: data.id
      })
    }).catch((error) => {
      toastr.error('Something went wrong!')
      console.log(error)
    })
  }
  
  toSnakeCase = (s) => {
    return s.replace(/(?:^|\.?)([A-Z])/g, (x,y) => {
      return "_" + y.toLowerCase()
    }).replace(/^_/, "")
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let data = {}
    for (let key in this.state) {
      data[this.toSnakeCase(key)] = this.state[key]
    }
    service.put(
      `/users/update`,
      data
    ).then((response) => {
      const data = response.data
      localStorage.setItem('user', JSON.stringify(data))
      this.props.userDataChanged(data)
      toastr.success('Save Success!')
    }).catch((error) => {
      toastr.error('Something went wrong!')
      console.log(error)
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }
  
  handleGoBack = () => {
    this.props.history.push('/')
  }

  render () {
    const {
      birthday,
      firstName,
      lastName,
      nickName,
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
              onSubmit={this.handleSubmit}
            >
              <Form.Row>
                <Form.Group as={Col} md="6">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
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
                    name="nickName"
                    value={nickName}
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
              <Form.Group as={Row}>
                <Col sm="3">
                  <Button block variant="primary" type="submit">
                    Save
                  </Button>
                </Col>
                <Col sm="3">
                  <Button
                    block
                    variant="danger"
                    onClick={this.handleGoBack}
                  >
                    Cancel
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
  
export default Profile