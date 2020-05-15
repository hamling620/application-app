import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../store/reducers/chatUser'
import UserCard from '../../component/userCard'

class Genius extends Component {
    componentDidMount () {
        this.props.getUserList('boss')    
    }

    render () {
        return (
            <UserCard userList={this.props.userList}/>
        )
    }
}

const stateToProps = state => {
    return {
        ...state.chatUser
    }
}

const dispatchToProps = dispatch => {
    return {
        getUserList: state => dispatch(getUserList(state))
    }
}

export default connect(stateToProps, dispatchToProps)(Genius)