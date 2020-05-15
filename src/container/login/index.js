import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, NoticeBar } from 'antd-mobile'
import { login } from '../../store/reducers/user'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import myForm from '../../component/myForm'

class Login extends Component {
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
                            onChange={(value) => this.props.handleChange('username', value)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={(value) => this.props.handleChange('pwd', value)}
                            type="password"
                        >密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button style={{marginTop: '40px'}} type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace/>
                    <div className="link-to">还未注册？请前往  <Link to="/register">注册</Link></div>
                </WingBlank>
            </div>
        )
    }

    handleLogin = () => {
        this.props.login(this.props.state)
    }
}

const stateToProps = state => state.user

const dispatchToProps = dispatch => {
    return {
        login: (state) => dispatch(login(state))
    }
}

export default connect(stateToProps, dispatchToProps)(myForm(Login))