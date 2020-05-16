import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navLinkBar'
import { Route } from 'react-router-dom'
import Boss from '../../container/boss'
import Genius from '../../container/genius'
import User from '../../container/user'
import { getMsgList, recvMsg } from '../../store/reducers/chat'

function Msg () {
    return <h1>Genius</h1>
}

class DashBoard extends Component {
    render () {
        const user = this.props.user
        const pathname = this.props.location.pathname
        const navList = [
            {
                path: '/boss',
                text: '人才',
                icon: 'genius',
                title: '人才列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'boss',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/user',
                text: '我',
                icon: 'user',
                title: '用户个人中心',
                component: User
            }
        ]
        const target = navList.find(item => (item.path === pathname)) 
        return (
            <div>
                <NavBar className="fixed-header">{target && target.title }</NavBar>
                {
                    navList.map(item =>
                         (<Route key={item.path} path={item.path} component={item.component}/>))
                }
                <NavLinkBar data={navList}/>
            </div>
        )
    }

    componentDidMount () {
        if (this.props.chat.chatmsg.length) return
        this.props.getMsgList()
        this.props.recvMsg()
    }
}

const stateToProps = state => state

const dispatchToProps = dispatch => {
    return {
        getMsgList: state => dispatch(getMsgList(state)),
        recvMsg: state => dispatch(recvMsg(state))
    }
}

export default connect(stateToProps, dispatchToProps)(DashBoard)