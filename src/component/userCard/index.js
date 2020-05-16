import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render () {
        const { Header, Body } = Card
        return (   
            <WingBlank>
                <WhiteSpace/>
                {
                    this.props.userList.map(item => 
                        item.avatar ? (<Card key={item._id} onClick={ () => this.props.history.push(`/chat/${item._id}`)}>
                            <Header
                                title={item.username}
                                thumb={<img src={require(`../../images/${item.avatar}.svg`)} alt={item.avatar} style={{height:'30px'}}/>}
                                extra={item.title}
                            />
                            <Body>
                                { item.type === 'boss'? <div>公司：{item.company}</div> : null}
                                { item.desc.split('\n').map(v => 
                                    <div key={v}>{v}</div>)}
                                { item.type === 'boss'? <div>薪资：{item.money}</div> : null}
                            </Body>
                        </Card>) : null
                    )
                }
            </WingBlank>
        )
    }

}

export default withRouter(UserCard)