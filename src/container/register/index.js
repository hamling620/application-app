import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
const { RadioItem } = Radio

class Register extends Component {
    render () {
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <InputItem>确认密码</InputItem>
                        <RadioItem checked={true}>牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem>Boss</RadioItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register