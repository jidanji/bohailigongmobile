import React, { Component } from 'react';
import { Form, Input, Selector, Mask, SpinLoading, Button, Space, Radio, Picker, DatePicker, Dialog, NavBar, TextArea } from 'antd-mobile/2x';
import { connect } from 'dva';

import { ValidUser, LogOut } from '@/serivces/login';

import { AddStudent } from '@/serivces/Students'


import './index.less';

import router from 'umi/router';

import SelectorItem from '@/components/SelectorItem'

import { GetData } from '@/serivces/MathDict'

import { SysSettingGetData } from '@/serivces/SysSetting'
import ValidStatus from '@/components/ValidStatus';


class index extends Component<any, any> {
  onFinish = async (values: any) => {
    try {
      const { Area, StudentType, StudentZhuanYeId } = values;

      const formValue = {
        ...values,
        Area: !!(Area || []).length ? Area[0] : "",
        StudentType: !!(StudentType || []).length ? StudentType[0] : "",
        StudentZhuanYeId: !!(StudentZhuanYeId || []).length ? StudentZhuanYeId[0] : "",
      };
      await AddStudent({ data: formValue });

      Dialog.alert({
        content: '录入学生信息成功!',
        onConfirm: () => {
          router.push('/');
        },
      });
    } catch (err) {
      Dialog.alert({
        content: `招生信息录入失败，因为：${err?.message || err || '原因不明'}`,
        onConfirm: () => {
        },
      });
    }
  };

  back = () => {
    router.push('/');
  };

  constructor(props: any) {
    super(props);
    this.state = {
      zhuanyeDict: [],
      loading: false,
      SysBaoMingStatus: 0,
      danzhaoStatus: false,
      shengwaiStatus: false,
      tongzhaoStatus: false,
      zhongzhuanStatus: false,
      gaokaofudaobanStatus: false,
      DictNew: []
    }
  }





  render() {
    const { SysBaoMingStatus = 0,
      danzhaoStatus = false,
      shengwaiStatus = false,
      tongzhaoStatus = false,
      zhongzhuanStatus = false,
      gaokaofudaobanStatus = false,
      DictNew = []
    } = this.state;


    const groupArr = ([{ GroupName: "单招", GroupId: "单招", disabled: !(!!SysBaoMingStatus && !!danzhaoStatus) },
    { GroupName: "统招", GroupId: "统招", disabled: !(!!SysBaoMingStatus && !!tongzhaoStatus) },
    { GroupName: "五年一贯制", GroupId: "五年一贯制", disabled: !(!!SysBaoMingStatus && !!zhongzhuanStatus) },
    { GroupName: "省外招生录入", GroupId: "省外招生录入", disabled: !(!!SysBaoMingStatus && !!shengwaiStatus) },
    { GroupName: "高考辅导班", GroupId: "高考辅导班", disabled: !(!!SysBaoMingStatus && !!gaokaofudaobanStatus) }


    ]).map(item => {
      return {
        label: item.GroupName, value: item.GroupId, disabled: item.disabled
      };
    });

    const { zhuanyeDict } = this.state;

    return (
      <div className='InsertStudent'>

        <NavBar style={{
          position: '-webkit-sticky', position: 'sticky', top: 0,
          backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
        }} onBack={this.back}>招生录入</NavBar>

        <ValidStatus>
          <Mask visible={this.state.loading} opacity='0.75'>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}>
              <SpinLoading color='primary' style={{ '--size': '48px' }} />
              <div style={{ color: "#1677ff" }}>
                加载中.....
              </div>
            </div>
          </Mask>
          <Form
            className='FormDiv'
            layout='horizontal'
            footer={
              <div className='footer'>
                <Button block type='submit' color='primary' size='middle'>
                  保存
                </Button>
              </div>

            }
            onFinish={this.onFinish}
          >

            <Form.Item label='学生姓名' name='StudentName' rules={[{ required: true }]}>
              <Input placeholder='请输入学生姓名' clearable />
            </Form.Item>
            <Form.Item label='性别' name='Sex' rules={[{ required: true }]}>
              <Radio.Group>
                <Space>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name='Area'
              label='考生地区'
            >
              <SelectorItem dataSource={DictNew} />
            </Form.Item>

            <Form.Item label='身份证号' name='StudentIDCard' rules={[{ required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((value || "").length != 18) {
                  return Promise.reject(new Error('身份证必须是18位的'));
                }
                return Promise.resolve();

              },
            })
            ]}
            >
              <Input placeholder='请输入身份证号' clearable />
            </Form.Item>
            <Form.Item label='再次身份证号' name='ReStudentIDCard' rules={[{ required: true },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((value || "").length != 18) {
                  return Promise.reject(new Error('身份证必须是18位的'));
                }
                if (!value || getFieldValue('StudentIDCard') === value) {
                  return Promise.resolve();
                }
                else {
                  return Promise.reject(new Error('两次输入的身份证号不一致'));
                }

              },
            })
            ]}>
              <Input placeholder='请输入再次身份证号' clearable />
            </Form.Item>

            <Form.Item label='联系方式' name='StudentPhone' >
              <Input placeholder='请输入联系方式' clearable />
            </Form.Item>

            <Form.Item label='学生性质（单选）' name='StudentType' rules={[{ required: true }]}>
              <Selector
                columns={1}
                options={
                  groupArr
                }
              />

            </Form.Item>

            <Form.Item label='报考专业' name='StudentZhuanYeId'  >
              <SelectorItem dataSource={

                zhuanyeDict
              } />
            </Form.Item>

            <Form.Item label='毕业学校' name='StudentSchool'  >
              <Input placeholder='请输入毕业学校' clearable />
            </Form.Item>

            <Form.Item label='家庭住址' name='StudentAddress'  >


              <TextArea
                placeholder='请输入家庭住址'

              />
            </Form.Item>

            <Form.Item label='备注' name='Remark'>


              <TextArea
                placeholder='请输入备注'

              />
            </Form.Item>
          </Form>
        </ValidStatus>
      </div >
    );
  }

  getDict = async () => {
    try {
      this.setState({ loading: true })
      let data = await GetData({
        data: {
          DictTypeId: '881e8823-d103-44c3-8c69-ae98cb899cab', start: -1, length: -1, draw: 3
        }
      });

      let zhuanyeDict = (data || []).map(item => { return { label: item.DictValue, value: item.DictId } })
      this.setState({ zhuanyeDict })
    }
    catch { }
    finally {
      this.setState({ loading: false })
    }
  }

  getDictNew = async () => {
    try {
      this.setState({ loading: true })
      let data = await GetData({
        data: {
          DictTypeId: '33c1b916-c110-473d-a71d-fa31630d5383', start: -1, length: -1, draw: 3
        }
      });

      let DictNew = (data || []).map(item => { return { label: item.DictValue, value: item.DictValue } })
      this.setState({ DictNew })
    }
    catch { }
    finally {
      this.setState({ loading: false })
    }
  }

  initSysSettingGetData = async () => {
    try {
      let data = await SysSettingGetData({ data: {} });
      const { SysBaoMingStatus = false, danzhaoStatus = false, shengwaiStatus = false, tongzhaoStatus = false, zhongzhuanStatus = false, gaokaofudaobanStatus = false } = data;
      this.setState({
        SysBaoMingStatus, danzhaoStatus, shengwaiStatus, tongzhaoStatus, zhongzhuanStatus, gaokaofudaobanStatus
      });
    }
    catch {
      this.setState({
        SysBaoMingStatus: false, danzhaoStatus: false, shengwaiStatus: false, tongzhaoStatus: false, zhongzhuanStatus: false
      });
    }
  }


  async componentDidMount() {
    this.getDictNew();
    this.getDict();
    this.initSysSettingGetData();
  }

}

export default connect(({ dict, loading }) => ({
  dict,
  loading,
}))(index);
