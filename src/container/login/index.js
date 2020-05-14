import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
const { RadioItem } = Radio

class Login extends Component {
    render () {
        return (
            <div className="login">
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <RadioItem>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem>Boss</RadioItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }

    register = () => {
        this.props.history.push('/register')
    }
}

export default Login