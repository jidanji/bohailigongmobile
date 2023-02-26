import React, { Component } from 'react';
import { Form, Input, Selector, Button, SpinLoading, Mask, Dialog, NavBar } from 'antd-mobile/2x';

import './index.less';


import UploadImg from '@/components/UploadImg';

import validImg from '@/utils/validImg';

import { connect } from 'dva';

import { AddUserForStudent, ValidUser, LogOut } from '@/serivces/login'

import qs from 'query-string';

import router from 'umi/router';

class index extends Component<any, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'dict/fetchList', payload: null });
  }

  back = () => {
    router.push('/login')
  }

  onFinish = async (values: any) => {
    try {

      await ValidUser({ data: { UserName: "maliang", UserPWD: "1234.com" } });


      let allData = {
        ...values, ...this.state, User_Sex: values.User_Sex.join(','), whichGroup: values.whichGroup.join(',')
      };

      let { studentPhoto: { fileName, fileStream }, ...others } = allData;
      let formData = new FormData();

      formData.append("studentPhoto", fileStream);

      console.log('-------------formData开始')
      console.log(formData.get('studentPhoto'))
      console.log('-------------formData结束')
      await AddUserForStudent({ data: formData }, qs.stringify(others));
      await LogOut({ data: {}, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
      Dialog.alert({
        content: '注册成功，去登录吧!',
        onConfirm: () => {
          router.push('/login');
        },
      });
    }
    catch (err) {
      Dialog.alert({
        content: `注册失败，因为：${err?.message || err || "原因不明"}`,
        onConfirm: () => {
        },
      });
    }


  };

  state = { User_Type: 1, UserStatus: 0 };
  checkIMG = (_: any, value = {}) => {
    const { fileName } = value;
    if (fileName) {
      if (!validImg(fileName)) {
        return Promise.reject(new Error('文件格式不正确!'));
      }
    } else {
      return Promise.reject(new Error('图片必须选择'));
    }
    return Promise.resolve();
  };

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
        }} onBack={this.back}>学生注册</NavBar>

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
            <Button block type='submit' color='primary' size='large'>
              保存
            </Button>
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
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
          <Form.Item label='再次密码' dependencies={['UserPwd']} name='studentRePwd' rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('UserPwd') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),

          ]}>
            <Input placeholder='请输入密码' type='password' clearable />
          </Form.Item>
          <Form.Item label='性别' name='User_Sex' rules={[{ required: true }]}>
            <Selector
              columns={2}
              options={[
                {
                  label: '男',
                  value: '男',
                },
                {
                  label: '女',
                  value: '女',
                },
              ]}
              multiple={false}
            />

          </Form.Item>
          <Form.Item label='专业' name='UserZhuanYe' rules={[{ required: true }]}>
            <Input placeholder='请输入专业' clearable />
          </Form.Item>
          <Form.Item label='学号' name='UserNumber' rules={[{ required: true }]}>
            <Input placeholder='请输入学号' clearable />
          </Form.Item>
          <Form.Item label='手机号' name='UserPhone' rules={[{ required: true }]}>
            <Input placeholder='请输入手机号' clearable />
          </Form.Item>
          <Form.Item label='班级' name='UserBanJi' rules={[{ required: true }]}>
            <Input placeholder='请输入班级' clearable />
          </Form.Item>
          <Form.Item label='年级' name='UserNianJi' rules={[{ required: true }]}>
            <Input placeholder='请输入姓名' clearable />
          </Form.Item>
          <Form.Item label='照片' name='studentPhoto' rules={[{ required: true, validator: this.checkIMG }]}>
            <UploadImg />

          </Form.Item>
          <Form.Item label='所在组别' name='whichGroup' rules={[{ required: true }]}>
            <Selector
              columns={2}
              options={groupArr}
              multiple={false}
            />
          </Form.Item>
        </Form>

      </div>
    );
  }
}

export default connect(({ dict, loading }) => ({
  dict,
  loading,
}))(index);
