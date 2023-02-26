import React, { Component } from 'react'
import './index.less'

export default class index extends Component<any, any> {
    static defaultProps = {
        children: '欢迎使用'
    }
    render() {
        return (
            <div className='TitleContainer'>{this.props.children}</div>
        )
    }
}
