import React, { Suspense, lazy} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
const Login = lazy(() => import('./container/login')) 
const Register = lazy(() => import('./container/register')) 
// const AuthRoute = lazy(() => import('./component/authRoute'))

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* <AuthRoute></AuthRoute> */}
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Redirect to="/login"/>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
