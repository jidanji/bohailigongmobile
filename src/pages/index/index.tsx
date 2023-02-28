import React from 'react';
import './index.css';

import Nav from './components/nav'

import Title from '@/components/Title'
import ValidStatus from '@/components/ValidStatus';
import { Button, NavBar } from 'antd-mobile/2x';
import router from 'umi/router';



export default function () {

  return (
    <div>
      <NavBar style={{
        position: '-webkit-sticky', position: 'sticky', top: 0,
        backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
      }} back={null}>渤海理工职业学院招生综合管理系统</NavBar>


      <ValidStatus>
        <div style={{background:'#fff'}}>
          <Nav />
          <div style={{ padding: 40 }}>
            <Button block type='submit' size='middle' color='primary' onClick={() => { router.push('/Login') }}>
              退出登录
            </Button>
          </div>
        </div>

      </ValidStatus>
    </div>
  );
}
