import React, { Component } from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

class Msg  extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }
    render() { 
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(item => {
            msgGroup[item.chatid] = msgGroup[item.chatid] || []
            msgGroup[item.chatid].push(item)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            return b[b.length - 1].createtime - a[a.length - 1].createtime
        })
        // console.log(chatList)

        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        return ( 
            <div>
                {
                    chatList.map(item => {
                        const last = item[item.length - 1]
                        const targetId = item[0].from === userid ? item[0].to : item[0].from
                        const unreadNum = item.filter(v => !v.read && v.to === userid).length
                        if (!userinfo[targetId]) {
                            return null
                        }
                        return (
                            <List key={last._id}>
                                <List.Item 
                                    thumb={require(`../../images/${userinfo[targetId].avatar}.svg`)}
                                    extra={<Badge text={unreadNum} />}
                                    arrow="horizontal"
                                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                            >
                                    { last.content}
                                    <List.Item.Brief>
                                        {userinfo[targetId].username}
                                    </List.Item.Brief>
                                </List.Item>
                            </List>
                        )
                    })
                }
            </div>
         )
    }
}

const stateToProps = state => state
 
export default connect(stateToProps, null)(Msg)