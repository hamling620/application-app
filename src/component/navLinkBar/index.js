import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class NavLinkBar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render () {
        const navList = this.props.data.filter(item => !item.hide)
        const pathname = this.props.location.pathname
        return (
            <TabBar tintColor="#2ab561">
                {
                    navList.map(item => (
                        <TabBar.Item
                            key={item.path}
                            title={item.text}
                            icon={{uri: require(`./images/${item.icon}.svg`)}}
                            selectedIcon={{uri: require(`./images/${item.icon}_active.svg`)}}
                            selected={pathname === item.path}
                            onPress={() => this.props.history.push(item.path) }
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavLinkBar)