import React, { Component } from 'react';

import TestItem from './components/testItem/index';
import Title from '@/components/Title';
import { GetOthersByUserAccount } from '@/serivces/CePing';

import { SpinLoading, Mask, NavBar, Empty } from 'antd-mobile/2x';
import router from 'umi/router';

import ValidStatus from '@/components/ValidStatus';


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  getdata = async () => {
    try {
      this.setState({ loading: true })
      this.setState({ loading: false, data: await GetOthersByUserAccount() });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false })
    }
  };

  componentDidMount() {
    this.getdata();
  }

  render() {
    return (
      <ValidStatus>
        <div>
          <Mask visible={this.state.loading} opacity='0'>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}>
              <SpinLoading color='primary' style={{ '--size': '48px' }} />
              <div>
                加载中.....
              </div>
            </div>
          </Mask>
          <NavBar style={{
            position: '-webkit-sticky', position: 'sticky', top: 0,
            backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
          }} onBack={() => {
            router.push('/');
          }}>评测列表</NavBar>

          {
            this.state.data.filter(item => !item.IsEvaluated).map((item, index) =>
              <TestItem UserId={item.UserId} UserNumber={item.UserNumber} key={item.UserId}
                No={index + 1}
                UserName={item.UserName}
                User_Type={item.User_Type} />)
          }
          {
            (this.state.data.filter(item => !item.IsEvaluated) || []).length == 0 && <Empty description='暂无数据' />
          }
        </div>
      </ValidStatus>

    );
  }
}
