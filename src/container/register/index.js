import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
const { RadioItem } = Radio

class Register extends Component {
    constructor () {
        super()
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
    }
    render () {
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={(value) => this.handleChange('user', value)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={(value) => this.handleChange('pwd', value)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={(value) => this.handleChange('repeatpwd', value)}
                        >确认密码</InputItem>
                        <RadioItem 
                            checked={this.state.type === 'genius'}
                            onChange={() => this.handleChange('type', 'genius')}
                        >牛人</RadioItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={() => this.handleChange('type', 'boss')}
                        >Boss</RadioItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleRegister = () => {
        console.log(this.state)
    }
}

export default Register