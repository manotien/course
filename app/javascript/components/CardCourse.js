import React from 'react'
import CardCourse from './CardCourse.js'
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
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
  owner: {
    textAlign: 'right',
    margin: 0,
    fontWeight: 'bold'
  },
  description: {
    marginLeft: 20,
    fontSize: '0.9em'
  }
}

class CourseList extends React.Component {
  static propTypes = {
  }
  
  render () {
    return (
      <Col style={styles.card}>
        <h5>Course Name <Badge variant="info">Subject</Badge> <Badge variant="primary">Catagory</Badge> </h5>
        <p style={styles.time}><i className="far fa-clock"/> 15.30 - 17.30</p>        
        <span style={styles.description}>เริ่มต้นตั้งแต่ ปูพื้นฐาน อ่านงบการเงิน การอ่านงบการเงิน อาจมองว่าเป็นเรื่องที่ยาก เพราะต้องเรียนรู้บัญชีลึกๆ และคำศัพท์ต่างๆ มากมาย แต่จริงๆแล้ว ไม่ได้จำเป็นขนาดนั้นนะครับ เราเป็นนักลงทุนไม่จำเป็นต้องรู้ว่าบัญชีเค้าทำกันอย่างไร แค่อ่านงบการเงินให้เป็นก็เพียงพอแล้วครับ และง่ายกว่ากันเยอะ</span>
        <p style={styles.owner}>By อรรถพล กิตติธรรมสาร</p>
      </Col>
    )
  }
}
  
export default CourseList
  