import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card, Toast,
  NavBar,
  Dialog
} from 'antd-mobile/2x';
import './index.less'
import Title from '@/components/Title'
import { AddOutline } from 'antd-mobile-icons'

import router from 'umi/router';

import { ChangePWD } from '@/serivces/UserInfo'

import ValidStatus from '@/components/ValidStatus'

export default class index extends Component {
  onFinish = async (values: any) => {
    try {
      this.setState({ loading: true })
      await ChangePWD({ data: values });

      Dialog.alert({
        content: '密码修改完成',
        onConfirm: () => {
          this.setState({ loading: false }, () => {
            router.push('/')
          })
        },
      });


    } catch (err) {
      this.setState({ loading: false, UserAccount: "", UserPwd: "" })
      Dialog.alert({
        content: err?.message || err || "出错了",
        onConfirm: () => {
        },
      });
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
        }} onBack={() => { router.push('/') }}>修改密码</NavBar>
        <ValidStatus>
          <Form
            className='FormDiv'
            layout='horizontal'
            footer={
              <Button loadingText={"正在为你修改密码..."} loading={this.state.loading} block type='submit' color='primary' >
                保存
              </Button>
            }
            onFinish={this.onFinish}
          >
            <Form.Item label='当前登录人' name='usertel'  >
              {localStorage.getItem("UserName")}
            </Form.Item>
            <Form.Item label='当前登录账号' name='usertel'  >
              {localStorage.getItem("UserAccount")}
            </Form.Item>
            <Form.Item label='旧密码' name='oldPWD' rules={[{ required: true, message: '旧密码必须输入' },
            {
              min: 6,
              type: 'string',
            },
            ]}>
              <Input placeholder='请输入旧密码' clearable />
            </Form.Item>

            <Form.Item label='新密码' name='newPWD' rules={[{ required: true, message: '新密码必须输入' },
            {
              min: 6,
              type: 'string',
            },]}>
              <Input placeholder='请输入新密码' clearable />
            </Form.Item>
          </Form>

        </ValidStatus>
      </div >
    )
  }
}
