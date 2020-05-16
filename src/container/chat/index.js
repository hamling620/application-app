import React, { Component } from 'react'
import { InputItem, Button, List, NavBar, Icon, Grid, PullToRefresh } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../store/reducers/chat'
import { getChatId, emoji } from '../../util'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = { text: '', showEmoji: false }
    }

    render() { 
        const emojiArrList = emoji.split(' ').filter(v => v).map(item => ({text: item}))

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(item => chatid === item.chatid)
        return ( 
            <div className="chat-page">
                <NavBar 
                    mode="dark" 
                    icon={<Icon type="left" onClick={this.props.history.goBack}/>}>
                    { users[userid].username }
                </NavBar>
                <div className="chat-list">
                    <PullToRefresh direction="up" onRefresh={() => null}>
                        {
                            chatmsg.map(item => {
                                const avatar = require(`../../images/${users[item.from].avatar}.svg`)
                                if (item.from === userid) {
                                    return (
                                        <List key={item._id}>
                                            <Item multipleLine thumb={avatar}>{item.content}</Item>
                                        </List>
                                    )
                                } else {
                                    return (
                                        <List className="me" key={item._id}>
                                            <Item extra={<img src={avatar} alt={avatar}/>} multipleLine>{item.content}</Item>
                                        </List>
                                    )
                                }
                            })
                        } 
                    </PullToRefresh> 
                </div>
                <div id="sticky-footer">
                    <List>
                        <InputItem 
                            value={this.state.text}
                            onChange={v => this.handleChange('text', v)}
                        />
                        <span style={{fontSize: '24px',marginRight: '10px'}} onClick={this.handleShowEmoji}>😀</span>
                        <Button type="primary" size="small" onClick={this.handleSubmit}>发送</Button>
                    </List>
                    {
                        this.state.showEmoji && 
                        <Grid
                            data={emojiArrList}
                            columnNum={9}
                            isCarousel={true}
                            carouselMaxRow={4}
                            onClick={this.handleEmojiSelect}
                        /> 
                    }
                </div>
            </div>
         )
    }

    componentDidMount () {
        if (this.props.chat.chatmsg.length) return
        this.props.getMsgList()
        this.props.recvMsg()
        this.fixCarousel()
    }

    fixCarousel () {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    handleChange = (k, v) => {
        this.setState({
            [k]: v
        })
    }

    handleSubmit = () => {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: '',
            showEmoji: false
        })
        
    }

    handleShowEmoji = () => {
        this.setState({
            showEmoji: !this.state.showEmoji
        })
        this.fixCarousel()
    }

    handleEmojiSelect = el => {
        this.setState({
            text: this.state.text + el.text
        })
    }
}

const stateToProps = state => state

const dispatchToProps = dispatch => {
    return {
        getMsgList: state => dispatch(getMsgList(state)),
        sendMsg: state => dispatch(sendMsg(state)),
        recvMsg: state => dispatch(recvMsg(state))
    }
}
 
export default connect(stateToProps, dispatchToProps)(Chat)