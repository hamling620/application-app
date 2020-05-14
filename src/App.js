import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authRoute'

function App() {
  return (
    <Router>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
    </Router>
  )
}

export default App
