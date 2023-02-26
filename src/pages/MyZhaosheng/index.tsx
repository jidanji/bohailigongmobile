import React, { Component } from 'react';
import './index.less';

import TestItem from './components/testItem';
import { Empty, Mask, NavBar, SpinLoading } from 'antd-mobile/2x';
import router from 'umi/router';

import { StudentGetData } from '@/serivces/Students';

import ValidStatus from '@/components/ValidStatus';

class Index extends Component {
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
          }}>我的招生</NavBar>
          {this.state.data.length == 0 && <Empty description='暂无数据' />}

          {
            this.state.data.map((item, index) => <TestItem No={index + 1} {...item}></TestItem>)
          }


        </div>
      </ValidStatus>

    );
  }

  constructor() {
    super();
    this.state = { data: [], loading: false };
  }

  getdata = async () => {
    try {
      this.setState({ loading: true })
      const data = await StudentGetData({ data: { draw: 1, start: 0, length: 1000 } });
      this.setState({ data, loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false })
    }

  };

  componentDidMount() {
    this.getdata();
  }
}

export default Index;
