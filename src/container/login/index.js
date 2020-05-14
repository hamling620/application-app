import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, NoticeBar } from 'antd-mobile'
import { login } from '../../store/reducers/user'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            pwd: ''
        }
    }
    render () {
        return (
            <div className="login">
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
                            onChange={(value) => this.handleChange('pwd', value)}
                            type="password"
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.goToRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    goToRegister = () => {
        this.props.history.push('/register')
    }

    handleLogin = () => {
        this.props.login(this.state)
    }
}

const stateToProps = state => {
    return {
        ...state.user
    }
}

const dispatchToProps = dispatch => {
    return {
        login: (state) => dispatch(login(state))
    }
}

export default connect(stateToProps, dispatchToProps)(Login)