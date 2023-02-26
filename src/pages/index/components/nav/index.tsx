import React, { Component } from 'react'
import { Grid } from 'antd-mobile/2x'
import Dengpao from '@/assets/dengpao.png'

import pc from '@/assets/pc.png'
import rili from '@/assets/rili.png'

import tuandui from '@/assets/tuandui.png'

import shezhi from '@/assets/shezhi.png'

import router from 'umi/router';

import './index.less'

import { Badge, Space } from 'antd-mobile/2x'

import { PullToRefresh, List } from 'antd-mobile/2x'

import { sleep } from 'antd-mobile/es/utils/sleep'

import {GetOthersByUserAccount} from '@/serivces/CePing'



export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: 0 }
  }

  getdata=async()=> {
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
            await   this.getdata();

          }}
        >
          <div id='a1' className='navContainer'>
            <div>
              <Space style={{ '--gap': '24px' }}>
                <div className='navDiv' onClick={() => { router.push('/EvaluateStudentList'); }}>
                  <Badge content={this.state.data}>
                    <div>
                      <img src={pc} alt="" className='navImg' />
                    </div>
                  </Badge>
                  <div>
                    开始评测
                  </div>
                </div>



                <div className='navDiv'>
                  <div>
                    <img src={tuandui} alt="" className='navImg' onClick={()=>{
                      router.push('/EvaluateToMe');
                    }} />
                  </div>
                  <div>
                    别人评价我
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
