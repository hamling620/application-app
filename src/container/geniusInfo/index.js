import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '../../component/avatarSelect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../store/reducers/user'
import myForm from '../../component/myForm'


class GeniusInfo extends Component {
    render () {
        const redirect = this.props.redirectTo
        const pathname = this.props.location.pathname
        return (
            <div>
                {redirect && redirect !== pathname ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark">人才信息完善</NavBar>
                <AvatarSelect selectAvatar={icon => this.props.handleChange('avatar', icon)}/>
                <InputItem
                    onChange={val => this.props.handleChange('title', val)}
                >求职岗位</InputItem>
                 <TextareaItem
                    title="个人简介"
                    autoHeight
                    rows={3}
                    onChange={val => this.props.handleChange('desc', val)}
                />
                <Button type="primary" onClick={() => this.props.update(this.props.state)}>保存</Button>
            </div>
        )
    }

}

const stateToProps = state => state.user

const dispatchToProps = dispatch => {
    return {
        update: state => dispatch(update(state))
    }
}

export default connect(stateToProps, dispatchToProps)(myForm(GeniusInfo))