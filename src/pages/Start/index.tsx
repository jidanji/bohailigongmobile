import React, { Component } from 'react';
import './index.less';

import EvaluateItem from './components/EvaluateItem';


import { GetData } from '@/serivces/CePing';
import { Button, Dialog, Form, ProgressCircle, Divider, NavBar,Mask,SpinLoading} from 'antd-mobile/2x';

import _ from 'lodash';


import { CePing } from '@/serivces/CePing';
import router from 'umi/router';

import { GetUserById } from '@/serivces/UserInfo';

import ValidStatus from '@/components/ValidStatus';

export default class index extends Component<any,any> {
  onFinish = async (values:any) => {
    try {
      this.setState({exeLoading:true})
      await CePing({
        data: {
          items: this.state.dataCpy,
          userid: this.props.match.params.id,
          EvaluateExtra: this.state.EvaluateExtra,
          exeLoading:false
        },
      });

      Dialog.alert({
        content: '评测成功',
        onConfirm: () => {
          router.push('/');
        },
      });
    } catch (err) {
      Dialog.alert({
        content: '评测成功',
        onConfirm: () => {
        },
      });
      this.setState({exeLoading:false})
    }

  };

  onValuesChange = (changedValues) => {
    let dataCpy = _.cloneDeep(this.state.dataCpy);

    let keys = Object.keys(changedValues);
    let key = keys[0];
    let val = changedValues[key];

    dataCpy.forEach(item => {
      item.items.forEach(subItem => {
        if (subItem.EvaluateDictId == key) {
          subItem.ItemResault = (val * subItem.EvaluateWeight).toFixed(2);
          subItem.EvaluateBase=val;
          subItem.IsDone = true;
        }
      });
    });

    this.setState({ dataCpy });

  };

  getdata = async () => {
    try {
      this.setState({ loading: true })
      const { id } = this.props.match.params;
      const data = await GetData({ data: { forwho: 1 } });

      const { UserName: TargetUserName } = await GetUserById({ data: { userid: id } });

      this.setState({ data, dataCpy: _.cloneDeep(data), TargetUserName, loading: false });
    }
    catch (err) {
      console.log(err)
      this.setState({ loading: false })
    }

  };

  componentDidMount() {
    this.getdata();
  }

  constructor() {
    super();
    this.state = { data: [], dataCpy: [], EvaluateExtra: '',TargetUserName:"",loading:false,exeLoading:false };
  }

  render() {
    const dataCpy = this.state.dataCpy;
    let items = [];
    dataCpy.forEach(item => {
      items = [...items, ...item.items];
    });
    let done = items.filter(item => item.IsDone);
    let total = _.sum(done.map(item => parseFloat(item.ItemResault))).toFixed(1);


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
        }}>评测中</NavBar>
        <div className='topCard'>
          <div className='item' >我</div>
          <div className='item'>---------------</div>
          <div className='item'>{this.state.TargetUserName}</div>
        </div>
        <div style={{ position: 'fixed', background: '#fff', zIndex: 9999, top: '100px', right: 0 }}>
          <ProgressCircle percent={(done.length / items.length) * 100} style={{ '--track-width': '3px' }}>
            {total}
          </ProgressCircle>
        </div>

        <Form
          onValuesChange={this.onValuesChange}
          onFinish={this.onFinish}
          footer={
            <div style={{ position: 'fixed', bottom: '10px', left: '20px', right: '20px' }}>
              <Button loadingText={"提交中..."} loading={this.state.exeLoading} block type='submit' color='primary' size='large'>
                提交
              </Button>
            </div>
          }
        >

          <div style={{ marginBottom: '50px' }}>
            {
              this.state.data.map((item, index) =>
                <div style={{ position: 'relative' }} key={index}>
                  <div className='groupName'>
                    {item.dicttype}
                  </div>
                  {
                    item.items.map((subItem, subIndex) =>
                      <EvaluateItem key={subItem.EvaluateDictId} subIndex={subIndex}
                                    EvaluateDictTitle={subItem.EvaluateDictTitle}
                                    EvaluateDictId={subItem.EvaluateDictId} EvaluateWeight={subItem.EvaluateWeight} />)
                  }
                </div>,
              )
            }
            <EvaluateItem onChange={(EvaluateExtra) => {
              this.setState({ EvaluateExtra });
            }} showType='TextArea' subIndex={1} EvaluateDictTitle={}
                          EvaluateDictId={} />
          </div>


        </Form>

      </div>

      </ValidStatus>
         );
  }
}
