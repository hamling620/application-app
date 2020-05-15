import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelect extends Component {
    constructor () {
        super()
        this.state = {}
    }

    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    render () {
        const avatarList = ['vue', 'react', 'node', 'html', 'css', 'js', 'qq', 'baidu'].map(item => ({icon: require(`../../images/${item}.svg`), text: item}))

        const gridHeader = this.state.icon ? <div style={{height: '30px', lineHeight: '30px'}}>已选择头像：<img style={{height:'100%', verticalAlign: 'middle'}} src={this.state.icon} alt={this.state.text}/></div> : <div style={{height: '30px', lineHeight: '30px'}}>请选择头像</div>
        return (
            <List renderHeader={() => gridHeader }>
                <Grid 
                    data={avatarList} 
                    itemStyle={{width: '100px'}}
                    onClick={el => this.handleSelect(el)}
                />
            </List>
        )
    }

    handleSelect = (el) => {
        this.setState(el)
        this.props.selectAvatar(el.text)
    }
}

export default AvatarSelect