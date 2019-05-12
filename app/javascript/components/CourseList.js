import React from 'react'
import axios from 'axios';
import CardCourse from './CardCourse.js'
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

class CourseList extends React.Component {
  componentDidMount() {
  }
  
  render () {
    const {
      role
    } = this.props
    const isInstructor = role == 'instructor';
    return (
      <Container>
        <Row>
          <Col md={2}>
            { isInstructor ? <Button variant="success">Create <i className="fas fa-plus-circle"/></Button> : null }
          </Col>
          <Col md={5}></Col>
          <Col md={5}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Course Name" name="name"/>
              </Form.Group>
              <Form.Group as={Col}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text><i className="far fa-clock"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="time" placeholder="Time" name="time"/>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Button variant="primary" type="submit">
                  Search <i className="fas fa-search"></i>
                </Button>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: 15 }} md={6}>
            <CardCourse
            />
          </Col>
          <Col md={6}>
            <CardCourse
            />
          </Col>
          <Col md={6}>
            <CardCourse
            />
          </Col>
          <Col md={6}>
            <CardCourse
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
  
export default CourseList