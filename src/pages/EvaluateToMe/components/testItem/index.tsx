import React, { Component } from 'react'

import './index.less'

import { Button, Space } from 'antd-mobile/2x'

import router from 'umi/router';

export default class index extends Component {
  constructor() {
    super();
  }
    render() {
     let  datetimeFormate=  (input)=> {
        if (input) {
          var d = eval('new ' + input.replace('/', '', 'g').replace('/', '', 'g'));
          return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate()) + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
        }
        else {
          return "";
        }
      }

        return (
            <div className='testItemContainer'>
                <div className='firstDiv'>
                    <div className='d1' style={{ display: "flex", alignItems: "center" }}>
                        <div className='steps'>
                            #{this.props.No&&this.props.No}
                        </div>
                        <div className='studentName' >
                          {this.props.EvaluateTotal&&this.props.EvaluateTotal.toFixed(1)}
                        </div>


                    </div>
                  <div className='d2' style={{ display: "flex" }}>
                    <div className='studentType'>
                     测评时间： {this.props.EvaluateTime&&datetimeFormate(this.props.EvaluateTime)}
                    </div>

                  </div>
                </div>
              {!!!this.props.noDetailButton&&<div className='secondDiv'>
                <Button size='small' color='primary' fill='none' onClick={() => {
                  router.push('/ViewDetail/' + this.props.EvaluateId);
                }}>
                  查看详情
                </Button>
              </div>}
            </div>
        )
    }
}
