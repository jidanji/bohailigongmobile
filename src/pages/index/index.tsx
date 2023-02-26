import React from 'react';
import './index.css';

import Nav from './components/nav'

import Title from '@/components/Title'
import ValidStatus from '@/components/ValidStatus';
import { Button } from 'antd-mobile/2x';
import router from 'umi/router';



export default function () {

  return (
    <div>
      <Title>导航窗口</Title>

      <ValidStatus>
        <Nav />
        <div style={{padding:40}}>
          <Button block type='submit' color='primary' onClick={()=>{  router.push('/Login')}}>
            退出登录
          </Button>
        </div>
      </ValidStatus>
    </div>
  );
}
