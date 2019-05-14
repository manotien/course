import React from 'react'
import CardCourse from './CardCourse.js'
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom'
import service from '../service'

class MainCourse extends React.Component {
  state = {
    role: '',
    courses: [],
    searchName: '',
    searchTime: ''
  }

  componentDidMount() {
    const role = JSON.parse(localStorage.getItem('role')) || {}
    this.setState({
      role: role.code
    })
    this.getCourseList()
  }

  getCourseList = () => {
    const {
      searchName,
      searchTime
    } = this.state
    let params = {}
    if(searchName) params['name'] = searchName
    if(searchTime) params['time'] = searchTime
    service.get(
      `/courses/`,
      { params }
    ).then((response) => {
      const data = response.data
      this.setState({ courses: data })
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
                <Form.Control
                  placeholder="Course Name"
                  name="searchName"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text><i className="far fa-clock"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="time"
                    placeholder="Time"
                    name="searchTime"
                    onChange={this.handleChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col}>
                <Button
                  variant="primary"
                  onClick={this.getCourseList}
                >
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
        { courses.length == 0 ? <h3 style={{textAlign: 'center'}}>No Course</h3> : null }
      </Container>
    )
  }
}
  
export default MainCourse