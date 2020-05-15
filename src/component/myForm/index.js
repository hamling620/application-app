import React from 'react'

const myForm = (Component) => {
    class FormWrap extends React.Component {
        constructor () {
            super()
            this.state = {}
        }

        render () {
            return (
                <Component 
                    handleChange={this.handleChange}
                    state={this.state}
                    {...this.props}
                />
            )
        }

        handleChange = (key, value) => {
            this.setState({
                [key]: value
            })
        }
    
    }
    return FormWrap
}

export default myForm 