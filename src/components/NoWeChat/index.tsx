import React, { Component } from 'react'
import { Result, Button, DotLoading, Toast } from 'antd-mobile/2x'

import copy from "copy-to-clipboard";

export default class index extends Component {
    render() {
        return (
            <div style={{}}>
                <Result
                    status='warning'
                    title='微信里不支持，请到浏览器里操作'
                    description={
                        <div>
                            <Button block fill='none' color='primary' onClick={() => {
                                copy('http://112.126.83.123/m'); Toast.show({
                                    content: '复制成功，快去浏览器上浏览吧',

                                })
                            }}>复制当前地址</Button>
                        </div>
                    }
                />
            </div>
        )
    }
}
