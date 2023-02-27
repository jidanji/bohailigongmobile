import React, { Component } from 'react';
import { Result, Button, DotLoading } from 'antd-mobile/2x'

import { LoginStatus } from '@/serivces/login'

import { GetSingleData } from '@/serivces/UserInfo'

import router from 'umi/router';

class Index extends Component {
  state = {
    loginStatus: 'logining',
    approval: false
  }

  async componentDidMount() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    } else {
      window.location.href = 'http://112.126.83.123/admin/login'
    }
    try {
      let { UserName, UserAccount } = await LoginStatus();
      localStorage.setItem('UserName', UserName)
      localStorage.setItem('UserAccount', UserAccount)
      this.setState({ loginStatus: 'loginAndApproval' })
    } catch (err) {
      console.log(err)
      this.setState({
        loginStatus: "nologin"
      })
    }
  }

  gotoLogin = () => {
    router.push('/login')
  }


  render() {
    // @ts-ignore
    const { loginStatus } = this.state;




    const dict = {
      "nologin": <div style={{}}>
        <Result
          status='error'
          title='您没有登录'
          description={
            <div>
              <Button block color='primary' onClick={this.gotoLogin}>去登录</Button>
            </div>
          }
        />
      </div>,
      'loginAndApproval': this.props.children,
      'logining': <DotLoading color='primary' />
    }
    return (
      <div>
        {dict[loginStatus]}
      </div>
    );
  }
}

export default Index;
