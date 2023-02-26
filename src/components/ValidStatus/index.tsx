import React, { Component } from 'react';
import { Result, Button } from 'antd-mobile/2x'

import { LoginStatus } from '@/serivces/login'

import { GetSingleData } from '@/serivces/UserInfo'

import router from 'umi/router';

class Index extends Component {
  state = {
    loginStatus: false,
    approval: false
  }

  async componentDidMount() {
    try {
      await LoginStatus();
      const UserStatus = 1;
      this.setState({ loginStatus: true })
    } catch (err) {
      console.log(err)
      this.setState({
        loginStatus: false
      })
    }
  }

  gotoLogin = () => {
    router.push('/login')
  }


  render() {
    // @ts-ignore
    const { loginStatus } = this.state;
    var dictVal = "nologin";
    if (loginStatus) {
      dictVal = 'loginAndApproval'
    }



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
      'loginAndApproval': this.props.children
    }
    return (
      <div>
        {dict[dictVal]}
      </div>
    );
  }
}

export default Index;
