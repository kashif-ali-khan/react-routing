import React, { Component } from "react";
const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        }
        componentDidMount() {
            importComponent().then(cmp => {
                this.setState({ component: cmp.default })
            })
        }
        render() {
            const Com = this.state.component;
            return Com ? <Com {...this.props} /> : null
        }
    }

}

export default asyncComponent;