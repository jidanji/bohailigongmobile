import React, { Component } from 'react'
import { Grid } from 'antd-mobile/2x'
import Dengpao from '@/assets/dengpao.png'

import pc from '@/assets/pc.png'
import rili from '@/assets/rili.png'

import tuandui from '@/assets/tuandui.png'

import mima from '@/assets/mima.png'

import shezhi from '@/assets/shezhi.png'

import router from 'umi/router';

import './index.less'

import { Badge, Space } from 'antd-mobile/2x'

import { PullToRefresh, List, Avatar } from 'antd-mobile/2x'

import { sleep } from 'antd-mobile/es/utils/sleep'

import { GetTotal } from '@/serivces/Students'




export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: 0, total: 0 }
  }

  getdata = async () => {
    let total = await GetTotal({ data: {} })

    debugger
    this.setState({ total });
  }
  componentDidMount() {
    this.getdata();
  }
  render() {
    const { total=0 } = this.state;
    return (
      <div>
        <PullToRefresh
          onRefresh={async () => {
            await this.getdata();
          }}
        >
          <div id='a1' className='navContainer'>
            <div className='QuickTop'>
              <div className='welcome'>
                <div className='first'>
                  欢迎，{localStorage.getItem("UserName")}
                </div>
                <div className='second'>
                  招生人数为: {total}
                </div>
              </div>
            </div>
            <div>
              <Space style={{ '--gap': '24px' }}>
                <div className='navDiv' onClick={() => { router.push('/InsertStudent'); }}>

                  <div>
                    <img src={pc} alt="" className='navImg' />
                  </div>

                  <div>
                    招生录入
                  </div>
                </div>



                <div className='navDiv' onClick={() => {
                  router.push('/MyZhaosheng');
                }}>
                  <div>
                    <img src={tuandui} alt="" className='navImg' />
                  </div>
                  <div>
                    我的招生
                  </div>
                </div>


                <div className='navDiv' onClick={() => {
                  router.push('/changePWD');
                }}>
                  <div>
                    <img src={mima} alt="" className='navImg' />
                  </div>
                  <div>
                    修改密码
                  </div>
                </div>


              </Space>
            </div>
          </div>
        </PullToRefresh>


      </div>

    )
  }
}
