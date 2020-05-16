import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.less'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authRoute'
import BossInfo from './container/bossInfo'
import GeniusInfo from './container/geniusInfo'
import DashBoard from './container/dashboard'
import Chat from './container/chat'

function App() {
  return (
    <Router>
        <AuthRoute/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={DashBoard}/>
        </Switch>
    </Router>
  )
}

export default App
