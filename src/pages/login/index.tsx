import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Toast
} from 'antd-mobile/2x'

import logo from '@/assets/logo.png'
import './index.less'

import router from 'umi/router';

import { ValidUser, LogOut } from '@/serivces/login'

import Cookies from 'js-cookie'


export default class index extends Component {
  onFinish = async (values: any) => {

    try {
      this.setState({ loading: true })
      await ValidUser({ data: values })
      this.setState({ loading: false })
      Toast.show({
        content: "登录成功",
        position: 'top',
      })
      router.push('/')
    }
    catch (err) {
      this.setState({ loading: false })
      Toast.show({
        content: err?.message || err || "登录失败",
        position: 'top',
      })
    }



  }

  state = {
    loading: false
  }
  forgetPWD = () => {
    router.push('/ForgetPWD')
  }
  StudentReg = () => {
    router.push('/StudentReg')
  }
  TeacherReg = () => {
    router.push('/TeacherReg')
  }
  async componentDidMount() {
    const data = await LogOut({ data: {}, headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    console.log(data)
  }

  render() {
    return (
      <div className='loginContainer'>

        <div className='logoDiv'>
          <div>
            <img src={logo} alt="" />
          </div>

        </div>
        <div className='systemName'>
          招生综合管理系统
        </div>




        <Form
          className='FormDiv'
          layout='horizontal'
          footer={
            <Button block type='submit' color='primary' loading={this.state.loading} loadingText='登录中...'>
              登录
            </Button>
          }
          onFinish={this.onFinish}
        >
          <Form.Item label='用户名' name='UserName' rules={[{ required: true, message: '用户名必须输入' }]}>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item>
          <Form.Item label='密码' name='UserPWD' rules={[{ required: true, message: '密码必须输入' }]}>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item>
        </Form>











        <div className='copyRightDiv'>
          版权所有 2023-2023
        </div>
      </div >
    )
  }
}
