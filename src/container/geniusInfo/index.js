import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '../../component/avatarSelect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../store/reducers/user'


class GeniusInfo extends Component {
    constructor () {
        super()
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        }
    }

    render () {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">人才详情</NavBar>
                <AvatarSelect selectAvatar={this.selectAvatar}/>
                <InputItem
                    onChange={val => this.handleChange('title', val)}
                >求职岗位</InputItem>
                 <TextareaItem
                    title="个人简介"
                    autoHeight
                    rows={3}
                    onChange={val => this.handleChange('desc', val)}
                />
                <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
            </div>
        )
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    selectAvatar = (icon) => {
        this.setState({
            avatar: icon
        })    
    }
}

const stateToProps = state => {
    return {
        ...state.user
    }
}

const dispatchToProps = dispatch => {
    return {
        update: state => dispatch(update(state))
    }
}

export default connect(stateToProps, dispatchToProps)(GeniusInfo)