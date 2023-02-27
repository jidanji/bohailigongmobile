import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card, Toast,
  NavBar
} from 'antd-mobile/2x';
import './index.less'
import Title from '@/components/Title'
import { AddOutline } from 'antd-mobile-icons'

import router from 'umi/router';

import { GetBackPWD } from '@/serivces/login'
export default class index extends Component {
  onFinish = async (values: any) => {
    try {
      this.setState({ loading: true })
      const { UserAccount, UserPwd } = await GetBackPWD({ data: values });
      this.setState({ loading: false, UserAccount, UserPwd })
    } catch (err) {
      this.setState({ loading: false, UserAccount: "", UserPwd: "" })
      Toast.show({
        content: err?.message || err || "出错了",
        position: 'top',
      })
    }

  }
  state = {
    loading: false,
    UserAccount: "",
    UserPwd: ""
  }

  render() {
    return (
      <div>
        <NavBar style={{
          position: '-webkit-sticky', position: 'sticky', top: 0,
          backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
        }} onBack={() => { router.push('/login') }}>修改密码</NavBar>
        <Form
          className='FormDiv'
          layout='horizontal'
          footer={
            <Button loadingText={"获取账号密码中..."} loading={this.state.loading} block type='submit' color='primary' >
              保存
            </Button>
          }
          onFinish={this.onFinish}
        >
          <Form.Item label='当前登录人' name='usertel'  >
            12423123
          </Form.Item>
          <Form.Item label='旧密码' name='usernumber' rules={[{ required: true, message: '旧密码必须输入' },
          {
            min: 6,
            type: 'string',
          },
          ]}>
            <Input placeholder='请输入旧密码' clearable />
          </Form.Item>

          <Form.Item label='新密码' name='usernumber' rules={[{ required: true, message: '旧密码必须输入' },
          {
            min: 6,
            type: 'string',
          },]}>
            <Input placeholder='请输入新密码' clearable />
          </Form.Item>
        </Form>


      </div >
    )
  }
}
