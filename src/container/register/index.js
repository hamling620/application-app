import React, { Component } from 'react'
import Logo from '../../component/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, NoticeBar } from 'antd-mobile'
import { register } from '../../store/reducers/user'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import myForm from '../../component/myForm'
const { RadioItem } = Radio

class Register extends Component {
    componentDidMount () {
        this.props.handleChange('type', 'genius')
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
                            onChange={(value) => this.props.handleChange('username', value)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type="password"
                            onChange={(value) => this.props.handleChange('pwd', value)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={(value) => this.props.handleChange('repeatpwd', value)}
                        >确认密码</InputItem>
                        <RadioItem 
                            checked={this.props.state.type === 'genius'}
                            onChange={() => this.props.handleChange('type', 'genius')}
                        >人才</RadioItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={() => this.props.handleChange('type', 'boss')}
                        >Boss</RadioItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace/>
                    <div className="link-to">已有账号？请前往  <Link to="/login">登录</Link></div>
                </WingBlank>
            </div>
        )
    }

    handleRegister = () => {
        this.props.register(this.props.state)
    }
}

const stateToProps = state => state.user

const dispatchToProps = dispatch => {
    return {
        register: state => dispatch(register(state))
    }
}
export default connect(stateToProps, dispatchToProps)(myForm(Register))