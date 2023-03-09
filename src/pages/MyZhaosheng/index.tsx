import React, { Component } from 'react';
import './index.less';

import StudentItem from './components/StudentItem';
import { Empty, Mask, NavBar, SpinLoading, Button, Form, Input, TextArea, Space, Toast, InfiniteScroll } from 'antd-mobile/2x';
import router from 'umi/router';

import { StudentGetData, GengZhengStudent } from '@/serivces/Students';

import ValidStatus from '@/components/ValidStatus';

import { produce, enableES5 } from 'immer';

import moment from 'moment'

class Index extends Component {
  formRef = React.createRef<FormInstance>()
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      showDetail: false,
      currentStuent: {},
      showBeginUpdate: false,
      gengzhengStatus: false,
      hasMore: true,
      current: 1,
      length: 100
    };
  }


  viewDetail = (currentStuent) => {
    this.setState({ showDetail: true, currentStuent })
  }

  BeginUpdate = (currentStuent) => {
    const { DingZhengName,
      DingZhengNumber } = currentStuent;
    this.setState({ showBeginUpdate: true, currentStuent }, () => {
      this.formRef.current?.setFieldsValue({ DingZhengName, DingZhengNumber })
    })
  }

  onFinish = async (values) => {
    let [{ DingZhengName, DingZhengNumber }, { StudentId }] = [values, this.state.currentStuent];

    try {
      this.setState({ gengzhengStatus: true })
      await GengZhengStudent({ data: { DingZhengName, DingZhengNumber, StudentId } })

      this.setState(
        produce((draft) => {
          var ret = (draft.data || []).filter(item => item.StudentId == StudentId);

          if (ret.length) {
            ret[0].DingZhengName = DingZhengName;
            ret[0].DingZhengNumber = DingZhengNumber;
            let a = `/Date(${moment().valueOf()})/`;

            ret[0].DingZhengUpdateTime = a
          }
        })
      );
      this.setState({ showBeginUpdate: false })
      Toast.show({
        icon: 'success',
        content: '数据更正成功',
      })
    }

    catch { }
    finally {
      this.setState({ gengzhengStatus: false })
    }


  }

  loadMore = () => {
    let { current = 1, length = 20 } = this.state;
    current += 1;
    this.setState({ current }, () => { this.getdata() })
  }


  render() {
    const { showDetail, currentStuent, showBeginUpdate, gengzhengStatus, hasMore } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <ValidStatus>
          {showDetail && <div className='viewDetail'>

            <div className="content">
              <div className='item'>
                <div className='itemTitle'>学生姓名</div>
                <div className='itemContent'>{currentStuent.StudentName}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>性别</div>
                <div className='itemContent'>{currentStuent.Sex}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>考生地区</div>
                <div className='itemContent'>{currentStuent.Area || '-'}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>身份证号</div>
                <div className='itemContent'>{currentStuent.StudentIDCard}</div>
              </div>



              <div className='item'>
                <div className='itemTitle'>联系方式</div>
                <div className='itemContent'>{currentStuent.UserPhone}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>学生性质</div>
                <div className='itemContent'>{currentStuent.StudentType || "-"}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>报考专业</div>
                <div className='itemContent'>{currentStuent.StudentZhuanYeValue || "-"}</div>
              </div>


              <div className='item'>
                <div className='itemTitle'>原中学</div>
                <div className='itemContent'>{currentStuent.StudentSchool || "-"}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>家庭住址</div>
                <div className='itemContent'>{currentStuent.StudentAddress || "-"}</div>
              </div>

              <div className='item'>
                <div className='itemTitle'>备注</div>
                <div className='itemContent'>{currentStuent.Remark || "-"}</div>
              </div>


              <div className='item'>
                <div className='itemTitle'>推荐人</div>
                <div className='itemContent'>
                  <div>{currentStuent.UserName || "-"}</div>
                  <div>{currentStuent.UserPhone || "-"}</div>
                </div>
              </div>


              <div className='item'>
                <div className='itemTitle'>推荐人部门</div>
                <div>{currentStuent.UserDeptName || "-"}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button color='primary' fill='none' onClick={() => {

                  this.setState({ showDetail: false })
                }}>
                  关闭
                </Button>
              </div>
            </div>
          </div>}

          {showBeginUpdate && <div className='viewDetail'>
            <div className='title'>
              更正数据
            </div>
            <div>
              <Form
                ref={this.formRef}
                layout='horizontal'
                footer={
                  <> <Button loading={gengzhengStatus} block type='submit' color='primary' size='middle' style={{ marginBottom: "15px" }}>
                    提交
                  </Button>
                    <Button loading={gengzhengStatus} block color='primary' fill='outline' size='middle' onClick={() => {
                      this.setState({ showBeginUpdate: false })
                    }}>
                      取消
                    </Button></>
                }
                onFinish={this.onFinish}
              >
                <Form.Item
                  name='DingZhengName'
                  label='姓名'
                  rules={[{ required: true, message: '姓名不能为空' }]}
                >
                  <Input onChange={console.log} placeholder='请输入姓名' value='' />
                </Form.Item>

                <Form.Item
                  name='DingZhengNumber'
                  label='身份证号'

                >
                  <Input onChange={console.log} placeholder='请输身份证号' />
                </Form.Item>


              </Form>


            </div>
          </div>}
          <div>
            <Mask visible={this.state.loading} opacity='0'>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
              }}>
                <SpinLoading color='primary' style={{ '--size': '48px' }} />
                <div>
                  加载中.....
                </div>
              </div>
            </Mask>
            <NavBar style={{
              position: '-webkit-sticky', position: 'sticky', top: 0,
              backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
            }} onBack={() => {
              router.push('/');
            }}>我的招生</NavBar>
            {this.state.data.length == 0 && <Empty description='暂无数据' />}
            {
              this.state.data.map((item, index) => <StudentItem BeginUpdate={this.BeginUpdate} dataSource={item} viewDetail={this.viewDetail} No={index + 1} {...item}></StudentItem>)
            }

            <InfiniteScroll loadMore={this.loadMore} hasMore={hasMore} />
          </div>
        </ValidStatus>
      </div>


    );
  }



  getdata = async () => {
    const { current = 1, length = 20 } = this.state;
    try {
      this.setState({ loading: true })
      const data = await StudentGetData({ data: { draw: 1, start: (current - 1) * length, length } });
      let hasMore = !!data.length ? (data.length < length ? false : true) : false;
      this.setState({ data: [...(this.state.data || []), ...data], loading: false, hasMore });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, hasMore: false })
    }
  };

  componentDidMount() {
    this.getdata();
  }
}

export default Index;
