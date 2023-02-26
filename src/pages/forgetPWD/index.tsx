import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Card, Toast,
  NavBar
} from 'antd-mobile/2x';
import   './index.less'
import Title from '@/components/Title'
import { AddOutline } from 'antd-mobile-icons'

import router from 'umi/router';

import {GetBackPWD} from '@/serivces/login'
export default class index extends Component {
    onFinish=async(values: any)=> {
      try {
        this.setState({loading:true})
        const {UserAccount,UserPwd}=  await GetBackPWD({ data: values });
        this.setState({loading:false,UserAccount,UserPwd})
      } catch (err) {
        this.setState({ loading: false, UserAccount: "", UserPwd: "" })
        Toast.show({
          content: err?.message || err || "出错了",
          position: 'top',
        })
      }

    }
    state={
      loading:false,
      UserAccount:"",
      UserPwd:""
    }

    render() {
        return (
            <div>
              <NavBar style={{
                position: '-webkit-sticky', position: 'sticky', top: 0,
                backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
              }}  onBack={()=>{ router.push('/login')}}>忘记密码</NavBar>
                <Form
                    className='FormDiv'
                    layout='horizontal'
                    footer={
                        <Button loadingText={"获取账号密码中..."} loading={this.state.loading} block type='submit' color='primary' >
                          <AddOutline />获取账号密码
                        </Button>
                    }
                    onFinish={this.onFinish}
                >
                    <Form.Item label='用户手机' name='usertel' rules={[{ required: true, message: '用户手机必须输入' }]}>
                        <Input placeholder='请输入用户手机' clearable />
                    </Form.Item>
                    <Form.Item label='学号/工号' name='usernumber' rules={[{ required: true, message: '学号/工号必须输入' }]}>
                        <Input placeholder='请输入学号/工号' clearable />
                    </Form.Item>
                </Form>
                <Card title='找回密码结果' onClick={() => { }}>
                    <div   className='disItem'>
                        <div className='a1'>账号</div>
                        <div className='a2'>{this.state.UserAccount||'****************'}</div>
                    </div>

                    <div  className='disItem'>
                        <div  className='a1'>密码</div>
                        <div  className='a2'>{this.state.UserPwd||'****************'}</div>
                    </div>
                </Card>

            </div >
        )
    }
}
