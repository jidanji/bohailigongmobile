import React, { Component } from 'react';
import { Form, Input, Selector, Mask, SpinLoading, Button, Space, Radio, Dialog, NavBar } from 'antd-mobile/2x';
import { connect } from 'dva';

import { AddUserForTeacher, ValidUser, LogOut } from '@/serivces/login';


import './index.less';

import router from 'umi/router';


class index extends Component<any, any> {
  onFinish = async (values: any) => {
    try {
      await ValidUser({ data: { UserName: "maliang", UserPWD: "1234.com" } });
      const formValue = { ...values, ...this.state, whichGroup: (values.whichGroupSelect || []).join(',') };
      await AddUserForTeacher({ data: formValue });
      await LogOut({ data: {}, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
      Dialog.alert({
        content: '注册成功，去登录吧!',
        onConfirm: () => {
          router.push('/login');
        },
      });
    } catch (err) {
      Dialog.alert({
        content: `注册失败，因为：${err?.message || err || '原因不明'}`,
        onConfirm: () => {
        },
      });
    }
  };

  back = () => {
    router.push('/login');
  };

  constructor(props) {
    super(props);
    this.state = { User_Type: 2, UserStatus: 0 };
  }


  render() {
    const groupArr = (this.props.dict.GroupItems || []).map(item => {
      return {
        label: item.GroupName, value: item.GroupId,
      };
    });
    return (
      <div>

        <NavBar style={{
          position: '-webkit-sticky', position: 'sticky', top: 0,
          backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
        }} onBack={this.back}>老师注册</NavBar>


        <Mask visible={!!this.props.loading.effects['dict/fetchList']} opacity='0'>
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
        <Form
          className='FormDiv'
          layout='horizontal'
          footer={
            <div>
              <Button block type='submit' color='primary' size='large'>
                保存
              </Button>
            </div>

          }
          onFinish={this.onFinish}
        >

          <Form.Item label='用户名' name='UserAccount' rules={[{ required: true }]}>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item label='姓名' name='UserName' rules={[{ required: true }]}>
            <Input placeholder='请输入姓名' clearable />
          </Form.Item>
          <Form.Item label='密码' name='UserPwd' rules={[{ required: true }, { type: 'string', min: 5 }]}>
            <Input placeholder='请输入密码' clearable />
          </Form.Item>
          <Form.Item label='再次密码' name='teacherRePwd' rules={[{ required: true },

          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('UserPwd') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          })
          ]}>
            <Input placeholder='请输入密码' clearable />
          </Form.Item>
          <Form.Item label='性别' name='User_Sex' rules={[{ required: true }]}>
            <Radio.Group>
              <Space>
                <Radio value='男'>男</Radio>
                <Radio value='女'>女</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='手机号' name='UserPhone' rules={[{ required: true }]}>
            <Input placeholder='请输入手机号' clearable />
          </Form.Item>
          <Form.Item label='专业' name='UserZhuanYe' rules={[{ required: true }]}>
            <Input placeholder='请输入专业' clearable />
          </Form.Item>

          <Form.Item label='院系' name='UserYuanXi' rules={[{ required: true }]}>
            <Input placeholder='请输入院系' clearable />
          </Form.Item>

          <Form.Item label='工号' name='UserNumber' rules={[{ required: true }]}>
            <Input placeholder='请输入工号' clearable />
          </Form.Item>

          <Form.Item label='职称' name='UserPos' rules={[{ required: true }]}>
            <Input placeholder='请输入职称' clearable />
          </Form.Item>


          <Form.Item label='所在组别(支持多选)' name='whichGroupSelect' rules={[{ required: true }]}>
            <Selector
              columns={2}
              options={
                groupArr
              }
              multiple={true}
            />

          </Form.Item>
        </Form>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({ type: 'dict/fetchList', payload: null });
  }

}

export default connect(({ dict, loading }) => ({
  dict,
  loading,
}))(index);
