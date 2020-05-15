import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../store/reducers/chatUser'
import UserCard from '../../component/userCard'

class Boss extends Component {
    componentDidMount () {
        this.props.getUserList('genius')    
    }

    render () {
        
        return (
            <UserCard userList={this.props.userList}/>    
        )
    }
}

const stateToProps = state => state.chatUser

const dispatchToProps = dispatch => {
    return {
        getUserList: state => dispatch(getUserList(state))
    }
}

export default connect(stateToProps, dispatchToProps)(Boss)