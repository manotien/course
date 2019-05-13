import React from 'react'
import CardCourse from './CardCourse.js'
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom'
import service from '../service'

class MainCourse extends React.Component {
  state = {
    role: '',
    courses: []
  }

  componentDidMount() {
    const role = JSON.parse(localStorage.getItem('role'))
    this.setState({
      role: role.code
    })

    service.get(
      `/courses/`
    ).then((response) => {
      const data = response.data
      this.setState({ courses: data })
    }).catch((error) => {
      console.log(error)
    })
  }
  
  render () {
    const {
      role,
      courses
    } = this.state
    const isInstructor = role == 'instructor';
    return (
      <Container>
        <Row>
          <Col md={2}>
            { isInstructor ? 
              <Link to="/course">
                <Button
                  variant="success"
                >
                  Create <i className="fas fa-plus-circle"/>
                </Button>
              </Link>
              : null 
            }
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
          {courses.map(item => (
            <Col style={{marginBottom: 15}} md={6} key={item.id}>
              <CardCourse {...item}/>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }
}
  
export default MainCourse