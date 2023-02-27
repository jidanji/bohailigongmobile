import React, { Component } from 'react';

import { GetCepingDetails } from '@/serivces/CePing';

import TestItem from './../MyZhaosheng/components/StudentItem';

import './index.less';
import router from 'umi/router';
import { Mask, NavBar, SpinLoading } from 'antd-mobile/2x';

import ValidStatus from '@/components/ValidStatus'

class Index extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = { data: {}, loading: false };
  }

  getdata = async () => {
    try {
      this.setState({ loading: true })
      const { id } = this.props.match.params;
      const data = await GetCepingDetails({ data: { EvaluateId: id } });
      this.setState({ data, loading: false });
    } catch (err) {
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
            router.goBack();
          }}>招生详情</NavBar>
          <TestItem No={1} EvaluateTime={this.state.data.evaluatedate} EvaluateTotal={this.state.data.resault}
            noDetailButton {...this.state.data}></TestItem>
          <div className='viewItem'>
            <div className='steps'>
              #2
            </div>
            <div className='newtitle'>
              评语
            </div>
            <div className='content'>
              {this.state.data.extra}
            </div>

          </div>
          {(this.state.data.items || []).map((item, index) => <div className='viewItem'>

            <div style={{ border: "1px solid #ccc" }}>
              <div className='cc' style={{ display: "block" }}>
                <div className='a1'></div>
                <div className='a2'></div>
              </div>
              <div className='cc' style={{ display: "flex" }}>
                <div className='steps'>
                  #{index + 3}
                </div>
                <div className='content'>
                  {item.DictTypeValue}
                </div>
              </div>
              <div className='cc'>
                <div className='newtitle'>标题</div>
                <div className='content'>{item.EvaluateDictTitle}</div>
              </div>
              <div className='cc'>
                <div className='newtitle'>权重</div>
                <div className='content'>{item.EvaluateWeight}</div>
              </div>
              <div className='cc'>
                <div className='newtitle'>得分</div>
                <div className='content'>{item.EvaluateBase}</div>
              </div>
              <div className='cc'>
                <div className='newtitle'>最终得分</div>
                <div className='content'>{item.EvaluateResault.toFixed(1)}</div>
              </div>
            </div>
          </div>)}
        </div>
      </ValidStatus>

    );
  }
}

export default Index;
