import React, { Component } from 'react';
import { Result,Button } from 'antd-mobile/2x'

import {LoginStatus} from '@/serivces/login'

import {GetSingleData} from '@/serivces/UserInfo'

import router from 'umi/router';

class Index extends Component {
 state= {
   loginStatus: false,
   approval:false
 }

 async  componentDidMount() {
   try {
     await LoginStatus();
     const { UserStatus } = await GetSingleData();
     this.setState({ loginStatus: true,approval:UserStatus==1 })
   } catch (err) {
     console.log(err)
     this.setState({
       loginStatus: false
     })
   }
 }

  gotoLogin=()=> {
    router.push('/login')
  }


  render() {
    // @ts-ignore
    const {loginStatus,approval}=this.state;
    var   dictVal="nologin";
     if(loginStatus&&approval) {
       dictVal = 'loginAndApproval'
     }

   if (loginStatus&&!approval) {
     dictVal = 'loginNoApproval'
   }

    const dict= {
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
      'loginNoApproval': <div style={{textAlign:"center"}}>审批中，请稍后......</div>,
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
