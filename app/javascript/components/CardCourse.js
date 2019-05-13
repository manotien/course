import React from 'react'
import { Col, Badge } from "react-bootstrap";
import PropTypes from 'prop-types'

const styles = {
  card: {
    padding: 15,
    border: 0,
    borderRadius: '0.4rem',
    boxShadow: '#0000003b 0px 0.1rem 1rem 0px',
  },
  time: {
    fontSize: '0.9em',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#9e9898'
  },
  studentNumber: {
    float: 'left',
    marginBottom: 0,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: '0.87em'
  },
  owner: {
    float: 'right',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0
  },
  description: {
    marginLeft: 20,
    fontSize: '0.9em'
  }
}

class CardCourse extends React.Component {
  static propTypes = {
    category: PropTypes.string,
    create_by: PropTypes.string,
    description: PropTypes.string,
    end_time: PropTypes.string,
    name: PropTypes.string,
    start_time: PropTypes.string,
    student_number: PropTypes.number,
    subject: PropTypes.string
  }
  
  render () {
    const {
      category,
      create_by,
      description,
      end_time,
      name,
      start_time,
      student_number,
      subject
    } = this.props
    return (
      <Col style={styles.card}>
        <h5>{name} <Badge variant="info">{subject}</Badge> <Badge variant="primary">{category}</Badge> </h5>
        <p style={styles.time}><i className="far fa-clock"/> {start_time} - {end_time}</p>        
        <span style={styles.description}>{description}</span>
        <div style={{"clear": "both"}}></div>
        <p style={styles.studentNumber}>Student Number: {student_number}</p>
        <p style={styles.owner}>By {create_by}</p>
        <div style={{"clear": "both"}}></div>
      </Col>
    )
  }
}
  
export default CardCourse
  