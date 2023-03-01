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

import { PullToRefresh, List, Avatar, NoticeBar } from 'antd-mobile/2x'



import { GetTotal } from '@/serivces/Students'

import PClogo from '@/assets/PClogo.png'

import { SysSettingGetData } from '@/serivces/SysSetting'

export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: 0, total: 0,
      SysBaoMingStatus: 0,
      danzhaoStatus: false,
      shengwaiStatus: false,
      tongzhaoStatus: false,
      zhongzhuanStatus: false
    }


  }

  initSysSettingGetData = async () => {
    try {
      let data = await SysSettingGetData({ data: {} });
      const { SysBaoMingStatus = false, danzhaoStatus = false, shengwaiStatus = false, tongzhaoStatus = false, zhongzhuanStatus = false } = data;
      this.setState({
        SysBaoMingStatus, danzhaoStatus, shengwaiStatus, tongzhaoStatus, zhongzhuanStatus
      });
    }
    catch {
      this.setState({
        SysBaoMingStatus: false, danzhaoStatus: false, shengwaiStatus: false, tongzhaoStatus: false, zhongzhuanStatus: false
      });
    }
  }

  getdata = async () => {
    let total = await GetTotal({ data: {} })


    this.setState({ total });
  }
  componentDidMount() {
    this.getdata();
    this.initSysSettingGetData();
  }
  render() {
    const { total = 0 } = this.state;
    const { SysBaoMingStatus = 0, danzhaoStatus = false, shengwaiStatus = false, tongzhaoStatus = false, zhongzhuanStatus = false } = this.state;
    return (
      <div>
        <>
          {(!!SysBaoMingStatus) && ((!!danzhaoStatus) || (!!shengwaiStatus) || (!!tongzhaoStatus) || (!!zhongzhuanStatus)) && < NoticeBar content='招生活动进行中......' color='info' closeable />}
          {!((!!SysBaoMingStatus) && ((!!danzhaoStatus) || (!!shengwaiStatus) || (!!tongzhaoStatus) || (!!zhongzhuanStatus)) )&&<NoticeBar content='当前时间不在任何招生时段' color='alert' closeable />}
          <PullToRefresh
            onRefresh={async () => {
              await this.getdata();
              await this.initSysSettingGetData();
            }}
          >
            <div id='a1' className='navContainer'>
              <div className='QuickTop'>

                <div className='first'>
                  <Avatar style={{ '--size': '40px' }} />
                  <div className='userName'>
                    {localStorage.getItem("UserName")}
                  </div>
                </div>
                <div className='second'>
                  <div className='mylabel'>
                    我的招生人数
                  </div>
                  <div className='valye'>
                    {total}
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

                <div className='pcmore'>
                  <img src={PClogo} alt="" />
                  <div>
                    更多功能，请登录电脑端
                  </div>
                </div>
              </div>
            </div>
          </PullToRefresh>
        </>



      </div>

    )
  }
}
