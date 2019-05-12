import React from 'react'
import ClickOutside from './ClickOutside.js'
import CourseList from './CourseList.js'
import Profile from './Profile.js'
import { Route } from 'react-router-dom'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

const navWidthCollapsed = 64
const navWidthExpanded = 280

const styles = {
  user: {
    color: '#fff8bc',
    fontSize: '1.2em',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  mainStyle: {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    overflow: 'auto',
    transition: 'all .15s',
    padding: '0 20px',
    background: '#fdfdf1',
    transition: 'background-color .35s cubic-bezier(.4, 0, .2, 1)',
    paddingTop: 15
  },
  role: {
    color: 'white',
    fontSize: '0.9em',
    fontWeight: 'bold'
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      full_name: '',
      role_name: '',
    }
  }

  componentWillMount() {
    const userData = JSON.parse(localStorage.getItem('user')) || {}
    if(!userData.token) {
      this.props.history.push('/login')
    }
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('user')) || {}
    this.setState({ ...userData })
  }

  onToggle = (expanded) => {
    this.setState({ expanded: expanded })
  }
  
  handleLogout = () => {
    localStorage.removeItem('user')
  }

  render() {
    const {
      expanded,
      full_name,
      role_name
    } = this.state
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({ expanded: false })
        }}
      >
        <SideNav
          onSelect={(selected) => {
            const to = '/' + selected
            if (location.pathname !== to) {
              this.props.history.push(to)
            }
          }}
          onToggle={this.onToggle}
          style={{
            background: 'black',
            minWidth: expanded ? navWidthExpanded : navWidthCollapsed
          }}
        >
          <SideNav.Toggle/>
          <span style={{ ...styles.user, display: expanded ? 'block' : 'none' }}>
            { full_name }
          </span>
          <span style={{ ...styles.role, display: expanded ? 'block' : 'none' }}>
            { role_name }
          </span>
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="">
                <NavIcon>
                  <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
              <NavText>
                Home
              </NavText>
            </NavItem>
            <NavItem eventKey="profile">
              <NavIcon>
                <i className="fas fa-user-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Profile
              </NavText>
            </NavItem>
            <NavItem eventKey="login" onSelect={this.handleLogout} >
              <NavIcon>
                <i className="fas fa-power-off" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Log Out
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
        <main style={{
          ...styles.mainStyle,
          left: expanded ? navWidthExpanded : navWidthCollapsed,
        }}>
          <Route path="/" exact component={() => (
            <CourseList {...this.state} />
          )} />
          <Route path="/profile" exact component={Profile} />
        </main>
      </ClickOutside>
    )
  }
}

export default Home