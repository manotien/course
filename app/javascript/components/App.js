import React from 'react'
import Home from './Home.js'
import Login from './Login.js'
import PageNotFound from './PageNotFound.js'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
  requireAuth = (nextState, replace, next) => {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    if(!userData.token) {
      return
    }
    next()
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
        <Route path='*' component={PageNotFound} />
      </Switch>
    )
  }
}

export default App