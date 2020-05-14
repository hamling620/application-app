import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class AuthRoute extends Component {
    componentDidMount () {
        this.props.history.push('/login')
    }

    render () {
        return (
           <div>hello boss</div>
        )
    }
}

export default withRouter(AuthRoute)