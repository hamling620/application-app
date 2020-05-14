import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from '../../lib/axios'
import { connect } from 'react-redux'
import { loadData } from '../../store/reducers/user'

class AuthRoute extends React.Component {
    componentDidMount () {
        const publicList = ['login', 'register']
        const pathname = this.props.history.pathname
        if (publicList.includes(pathname)) {
            return null
        }  
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }

    render () {
        return null
    }
}

const dispatchToProps = dispatch => {
    return {
        loadData: (state) => dispatch(loadData(state))
    }
}

export default connect(null, dispatchToProps)(withRouter(AuthRoute))