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

import { GetOthersByUserAccount } from '@/serivces/CePing'



export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: 0 }
  }

  getdata = async () => {
    let data = await GetOthersByUserAccount({ data: {} })
    this.setState({ data: (data.filter(item => !item.IsEvaluated) || []).length })
  }
  componentDidMount() {
    this.getdata();
  }
  render() {
    return (
      <div>
        <PullToRefresh
          onRefresh={async () => {
            await this.getdata();

          }}
        >
          <div id='a1' className='navContainer'>
            <div className='QuickTop'>
              <div className='welcome'>欢迎，马良</div>
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



                <div className='navDiv'>
                  <div>
                    <img src={tuandui} alt="" className='navImg' onClick={() => {
                      router.push('/MyZhaosheng');
                    }} />
                  </div>
                  <div>
                    我的招生报表
                  </div>
                </div>


                <div className='navDiv'>
                  <div>
                    <img src={mima} alt="" className='navImg' onClick={() => {
                      router.push('/MyZhaosheng');
                    }} />
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
