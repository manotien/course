import React from 'react'
import ClickOutside from './ClickOutside.js'
import MainCourse from './MainCourse.js'
import Profile from './Profile.js'
import { Route } from 'react-router-dom'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import CreateCourse from './CreateCourse.js'

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
      firstName: '',
      lastName: '',
      roleName: '',
    }
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'))
    if(!token) {
      this.props.history.push('/login')
      return
    }
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const role = JSON.parse(localStorage.getItem('role')) || {}
    this.setState({
      firstName: user.first_name,
      lastName: user.last_name,
      roleName: role.name
    })
  }

  onToggle = (expanded) => {
    this.setState({expanded: expanded})
  }
  
  handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  handleUserDataChanged = (userData) => {
    this.setState({ 
      firstName: userData.first_name,
      lastName: userData.last_name
    })
  }

  render() {
    const {
      expanded,
      firstName,
      lastName,
      roleName
    } = this.state
    return (
      <ClickOutside
        onClickOutside={() => {
          this.setState({expanded: false})
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
            { `${firstName} ${lastName}` }
          </span>
          <span style={{ ...styles.role, display: expanded ? 'block' : 'none' }}>
            { roleName }
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
          <Route path="/" exact component={MainCourse} />
          <Route path="/profile" exact render={() => <Profile {...this.props} userDataChanged={this.handleUserDataChanged} />} />
          <Route path="/course" exact render={() => <CreateCourse {...this.props} />} />
        </main>
      </ClickOutside>
    )
  }
}

export default Home