import React from 'react'
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import service from '../service'
import toastr from 'toastr'

class CreateCourse extends React.Component {
  state = {
    name: '',
    category: '',
    subject: '',
    description: '',
    studentNumber: '',
    startTime: '',
    endTime: ''
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleGoBack = () => {
    this.props.history.push('/')
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
    service.post(
      `/courses/`,
      data
    ).then((response) => {
      toastr.options.onHidden = () => { this.props.history.push('/') }
      toastr.options.timeOut = 500
      toastr.success('Save Success!')
    }).catch((error) => {
      toastr.error('Something went wrong!')
      console.log(error)
    })
  }
  
  render() {
    const {
      name,
      category,
      subject,
      description,
      studentNumber,
      startTime,
      endTime
    } = this.state
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h3>User Profile</h3>
        </Row>
        <br/>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Subject
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Category
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Category"
                    name="category"
                    value={category}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Description
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Description"
                    name="description"
                    as="textarea"
                    rows="3"
                    value={description}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Student Number
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    placeholder="Student Number"
                    name="studentNumber"
                    type="number"
                    value={studentNumber}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Start - End Time
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={startTime}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
                <Form.Label column sm="1">
                  <i className="fas fa-minus"></i>
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={endTime}
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </Form.Group>
              <br/>
              <Form.Group as={Row}>
                <Col sm="3">
                  <Button block variant="primary" type="submit">
                    Submit
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

export default CreateCourse