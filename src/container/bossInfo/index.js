import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, Icon } from 'antd-mobile'
import AvatarSelect from '../../component/avatarSelect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../store/reducers/user'
import myForm from '../../component/myForm'

class BossInfo extends Component {
    render () {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar mode="dark" icon={<Icon type="left" onClick={this.props.history.goBack}/>}>Boss信息完善</NavBar>
                <AvatarSelect selectAvatar={icon => this.props.handleChange('avatar', icon)}/>
                <InputItem
                    onChange={val => this.props.handleChange('title', val)}
                >招聘职位</InputItem>
                <InputItem
                    onChange={val => this.props.handleChange('company', val)}
                >公司名称</InputItem>
                <InputItem
                    onChange={val => this.props.handleChange('money', val)}
                >职位薪资</InputItem>
                 <TextareaItem
                    title="职位要求"
                    autoHeight
                    rows={3}
                    onChange={val => this.props.handleChange('desc', val)}
                />
                <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
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

export default connect(stateToProps, dispatchToProps)(myForm(BossInfo))