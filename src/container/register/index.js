import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, NoticeBar } from 'antd-mobile'
import { register } from '../../store/reducers/user'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
const { RadioItem } = Radio

class Register extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
    }
    render () {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        { this.props.msg ? <NoticeBar icon={null}>{this.props.msg}</NoticeBar> : null }
                        <WhiteSpace/>
                        <InputItem
                            onChange={(value) => this.handleChange('username', value)}
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
                        >人才</RadioItem>
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
        this.props.register(this.state)
    }
}

const stateToProps = state => {
    return {
        ...state.user
    }
}
const dispatchToProps = dispatch => {
    return {
        register: (state) => dispatch(register(state))
    }
}
export default connect(stateToProps, dispatchToProps)(Register)