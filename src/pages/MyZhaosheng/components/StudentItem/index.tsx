import React, { Component } from 'react'

import './index.less'

import { Button, Space } from 'antd-mobile/2x'

import router from 'umi/router';

export default class index extends Component {
  constructor() {
    super();
  }
  render() {
    let datetimeFormate = (input) => {
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
          <div className='d1' style={{}}>

            <div className='studentName' >
              {this.props.StudentName}
            </div>

            <div className='studentName' >
              {this.props.StudentIDCard}
            </div>


          </div>
          <div className='d2' style={{ display: "flex" }}>
            <div className='studentType'>
              录入时间 ： {this.props.InsertTime && datetimeFormate(this.props.InsertTime)}
            </div>

          </div>

          <div className='updateTitle'>
            更正后的数据
          </div>
          <div className='studentName' >
            {this.props.DingZhengName || "-"}
          </div>

          <div className='studentName' >
            {this.props.DingZhengNumber || "-"}
          </div>
          <div className='studentName' >
            {this.props.DingZhengUpdateTime && datetimeFormate(this.props.DingZhengUpdateTime) || "-"}
          </div>
        </div>
        {<div className='secondDiv'>
          <div className='steps'>
            {this.props.No && this.props.No}
          </div>
          <div className='toolBar'>
            <Button size='small' color='primary' fill='none' onClick={() => {

              this.props?.viewDetail(this.props.dataSource);

            }}>
              详情
            </Button>


            <Button size='small' color='primary' fill='none' onClick={() => {
               this.props?.BeginUpdate(this.props.dataSource);
            }}>
              更正数据
            </Button>
          </div>

        </div>}
      </div>
    )
  }
}
