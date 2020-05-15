import React, { Component } from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import cookies from 'browser-cookies'
import { logout } from '../../store/reducers/user'
import { Redirect } from 'react-router-dom'
const { Item } = List

class User extends Component {
    render () {
        const { username, type, avatar, title, company, money, desc, redirectTo } = this.props
        return ( username ? 
            <div>
                 <Result
                    img={<img src={require(`../../images/${avatar}.svg`)} alt={avatar} style={{ height: '50px' }} />}
                    title={username}
                    message={type === 'boss' ? company: null}
                />
                <WhiteSpace/>
                <List renderHeader={() => '简介'}>
                    <Item multipleLine	>
                        {title}
                        {desc.split('\n').map(item => <Item.Brief key={item}>{item}</Item.Brief>)}
                        {money ? <Item.Brief>薪资：{money}</Item.Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={() => this.props.history.push(`/${type}info`)}>修改信息</Item>
                    <WhiteSpace/>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div> : <Redirect to={redirectTo}/>
            
        )
    }

    logout = () => {
        Modal.alert('注销', '确定退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
            { text: '确定', onPress: () => {
                cookies.erase('userid')
                this.props.logout()
            }},
        ])

    }
}

const stateToProps = state => state.user

const dispatchToProps = dispatch => {
    return {
        logout: state => dispatch(logout(state))
    }
}

export default connect(stateToProps, dispatchToProps)(User)