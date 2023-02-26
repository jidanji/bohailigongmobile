import React, { Component } from 'react'

import './index.less'

import { Button, Space } from 'antd-mobile/2x'

import router from 'umi/router';

export default class index extends Component<any,any> {
  constructor(props:any) {
    super(props);
  }
    render() {
    let dict={1:"学生",2:"老师",3:"管理员"}

        return (
            <div className='testItemContainer'>
                <div className='firstDiv'>
                    <div className='d1' style={{ display: "flex", alignItems: "center" }}>
                        <div className='steps'>
                            #{this.props.No}
                        </div>
                        <div className='studentType' >
                          {dict[this.props.User_Type]}
                        </div>

                      <div className='studentNumber'>
                        {this.props.UserNumber}
                      </div>
                    </div>

                    <div className='d2' style={{ display: "flex" }}>
                        <div className='studentName'>
                          {this.props.UserName}
                        </div>

                    </div>
                </div>
                <div className='secondDiv'>
                    <Button size='small' color='primary' fill='none' onClick={() => {
                        router.push('/Start/'+this.props.UserId)
                    }}>
                        招生录入
                    </Button>
                </div>
            </div>
        )
    }
}
