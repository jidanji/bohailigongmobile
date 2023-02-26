import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Toast
} from 'antd-mobile/2x'

import logo from '@/assets/logo.jpg'
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
          <img src={logo} alt="" />
        </div>
        <div className='systemName'>
          湖南师范大学PBL管理系统
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
        <div className='center'>
          <Button color='primary' fill='none' onClick={this.forgetPWD}>
            忘记密码
          </Button>
        </div>

        <div className='center'>
          <Button color='primary' fill='none' onClick={this.StudentReg}>
            学生注册
          </Button>
        </div>
        <div className='center'>
          <Button color='primary' fill='none' onClick={this.TeacherReg}>
            老师注册
          </Button>
        </div>







        <div className='copyRightDiv'>
          版权所有 2016-2022
        </div>
      </div >
    )
  }
}
