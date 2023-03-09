import React, { Component } from 'react';
import { Form, Input, Selector, Mask, SpinLoading, Button, Space, Radio, Picker, DatePicker, Dialog, NavBar, TextArea } from 'antd-mobile/2x';
import { connect } from 'dva';

import { ValidUser, LogOut } from '@/serivces/login';

import { AddStudent } from '@/serivces/Students'


import './index.less';

import router from 'umi/router';

import SelectorItem from '@/components/SelectorItem'

import { GetData } from '@/serivces/MathDict'

import { SysSettingGetData } from '@/serivces/SysSetting'
import ValidStatus from '@/components/ValidStatus';


class index extends Component<any, any> {
  onFinish = async (values: any) => {
    try {
      const { Area, StudentType, StudentZhuanYeId } = values;

      const formValue = {
        ...values,
        Area: !!(Area || []).length ? Area[0] : "",
        StudentType: !!(StudentType || []).length ? StudentType[0] : "",
        StudentZhuanYeId: !!(StudentZhuanYeId || []).length ? StudentZhuanYeId[0] : "",
      };
      await AddStudent({ data: formValue });

      Dialog.alert({
        content: '录入学生信息成功!',
        onConfirm: () => {
          router.push('/');
        },
      });
    } catch (err) {
      Dialog.alert({
        content: `招生信息录入失败，因为：${err?.message || err || '原因不明'}`,
        onConfirm: () => {
        },
      });
    }
  };

  back = () => {
    router.push('/');
  };

  constructor(props: any) {
    super(props);
    this.state = {
      zhuanyeDict: [],
      loading: false,
      SysBaoMingStatus: 0,
      danzhaoStatus: false,
      shengwaiStatus: false,
      tongzhaoStatus: false,
      zhongzhuanStatus: false,
      gaokaofudaobanStatus: false

    }
  }





  render() {
    const { SysBaoMingStatus = 0,
      danzhaoStatus = false,
      shengwaiStatus = false,
      tongzhaoStatus = false,
      zhongzhuanStatus = false,
      gaokaofudaobanStatus = false
    } = this.state;


    const groupArr = ([{ GroupName: "单招", GroupId: "单招", disabled: !(!!SysBaoMingStatus && !!danzhaoStatus) },
    { GroupName: "统招", GroupId: "统招", disabled: !(!!SysBaoMingStatus && !!tongzhaoStatus) },
    { GroupName: "五年一贯制", GroupId: "五年一贯制", disabled: !(!!SysBaoMingStatus && !!zhongzhuanStatus) },
    { GroupName: "省外招生录入", GroupId: "省外招生录入", disabled: !(!!SysBaoMingStatus && !!shengwaiStatus) },
    { GroupName: "高考辅导班", GroupId: "高考辅导班", disabled: !(!!SysBaoMingStatus && !!gaokaofudaobanStatus) }


    ]).map(item => {
      return {
        label: item.GroupName, value: item.GroupId, disabled: item.disabled
      };
    });

    const { zhuanyeDict } = this.state;

    return (
      <div className='InsertStudent'>

        <NavBar style={{
          position: '-webkit-sticky', position: 'sticky', top: 0,
          backgroundColor: 'rgb(245, 247, 250)', zIndex: '9999',
        }} onBack={this.back}>招生录入</NavBar>

        <ValidStatus>
          <Mask visible={this.state.loading} opacity='0.75'>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
            }}>
              <SpinLoading color='primary' style={{ '--size': '48px' }} />
              <div style={{ color: "#1677ff" }}>
                加载中.....
              </div>
            </div>
          </Mask>
          <Form
            className='FormDiv'
            layout='horizontal'
            footer={
              <div className='footer'>
                <Button block type='submit' color='primary' size='middle'>
                  保存
                </Button>
              </div>

            }
            onFinish={this.onFinish}
          >

            <Form.Item label='学生姓名' name='StudentName' rules={[{ required: true }]}>
              <Input placeholder='请输入学生姓名' clearable />
            </Form.Item>
            <Form.Item label='性别' name='Sex' rules={[{ required: true }]}>
              <Radio.Group>
                <Space>
                  <Radio value='男'>男</Radio>
                  <Radio value='女'>女</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name='Area'
              label='考生地区'
            >
              <SelectorItem dataSource={[

                { label: "石家庄南/桥西区", value: "石家庄南/桥西区" },
                { label: "石家庄南/裕华区", value: "石家庄南/裕华区" },
                { label: "石家庄南/藁城区", value: "石家庄南/藁城区" },
                { label: "石家庄南/赵县", value: "石家庄南/赵县" },
                { label: "石家庄南/高邑县", value: " 石家庄南/高邑县" },
                { label: "石家庄南/元氏县", value: "石家庄南/元氏县" },
                { label: "石家庄南/栾城区", value: "石家庄南/栾城区" },
                { label: "石家庄南/赞皇县", value: "石家庄南/赞皇县" },
                { label: "石家庄南/晋州市", value: "石家庄南/晋州市" },
                { label: "石家庄南/无极县", value: "石家庄南/无极县" },
                { label: "石家庄北/长安区", value: "石家庄北/长安区" },
                { label: "石家庄北/新华区", value: "石家庄北/新华区" },
                { label: "石家庄北/深泽县", value: "石家庄北/深泽县" },
                { label: "石家庄北/辛集市", value: "石家庄北/辛集市" },
                { label: "石家庄北/鹿泉区", value: "石家庄北/鹿泉区" },
                { label: "石家庄北/井陉县", value: "石家庄北/井陉县" },
                { label: "石家庄北/新乐市", value: "石家庄北/新乐市" },
                { label: "石家庄北/行唐县", value: " 石家庄北/行唐县" },
                { label: "石家庄北/平山县", value: "石家庄北/平山县" },
                { label: "石家庄北/灵寿县", value: "石家庄北/灵寿县" },
                { label: "石家庄北/正定县", value: "石家庄北/正定县" },
                { label: "石家庄北/井陉矿区", value: "石家庄北/井陉矿区" },
                { label: "保定南/定州市", value: "保定南/定州市" },
                { label: "保定南/曲阳县", value: "保定南/曲阳县" },
                { label: "保定南/阜平县", value: "保定南/阜平县" },
                { label: "保定南/安国市", value: "保定南/安国市" },
                { label: "保定南/博野县", value: "保定南/博野县" },
                { label: "保定南/蠡县", value: "保定南/蠡县" },
                { label: "保定南/望都县", value: "保定南/望都县" },
                { label: "保定南/唐县", value: "保定南/唐县" },
                { label: "保定南/高阳县", value: "保定南/高阳县" },
                { label: "保定南/顺平县", value: "保定南/顺平县" },
                { label: "保定南/清苑县", value: "保定南/清苑县" },
                { label: "保定南/南市区", value: "保定南/南市区" },
                { label: "保定北/新市区", value: "保定北/新市区" },
                { label: "保定北/北市区", value: "保定北/北市区" },
                { label: "保定北/满城县", value: "保定北/满城县" },
                { label: "保定北/涞源县", value: "保定北/涞源县" },
                { label: "保定北/安新县", value: "保定北/安新县" },
                { label: "保定北/徐水县", value: "保定北/徐水县" },
                { label: "保定北/容城", value: "保定北/容城" },
                { label: "保定北/雄县", value: "保定北/雄县" },
                { label: "保定北/定兴县", value: "保定北/定兴县" },
                { label: "保定北/易县", value: "保定北/易县" },
                { label: "保定北/涞水县", value: "保定北/涞水县" },
                { label: "保定北/涿州市", value: "保定北/涿州市" },
                { label: "保定北/高碑店市", value: "保定北/高碑店市" },
                { label: "邯郸/丛台区", value: "邯郸/丛台区" },
                { label: "邯郸/邯山区", value: "邯郸/邯山区" },
                { label: "邯郸/复兴区", value: "邯郸/复兴区" },
                { label: "邯郸/峰峰矿区", value: "邯郸/峰峰矿区" },
                { label: "邯郸/肥乡区", value: "邯郸/肥乡区" },
                { label: "邯郸/永年区", value: "邯郸/永年区" },
                { label: "邯郸/涉县", value: "邯郸/涉县" },
                { label: "邯郸/武安市", value: "邯郸/武安市" },
                { label: "邯郸/磁县", value: "邯郸/磁县" },
                { label: "邯郸/永年县", value: "邯郸/永年县" },
                { label: "邯郸/邯郸县", value: "邯郸/邯郸县" },
                { label: "邯郸/峰峰矿区", value: "邯郸/峰峰矿区" },
                { label: "邯郸/鸡泽县", value: "邯郸/鸡泽县" },
                { label: "邯郸/曲周县", value: "邯郸/曲周县" },
                { label: "邯郸/邱县", value: "邯郸/邱县" },
                { label: "邯郸/馆陶县", value: "邯郸/馆陶县" },
                { label: "邯郸/大名县", value: "邯郸/大名县" },
                { label: "邯郸/魏县", value: "邯郸/魏县" },
                { label: "邯郸/广平县", value: "邯郸/广平县" },
                { label: "邯郸/肥乡县", value: "邯郸/肥乡县" },
                { label: "邯郸/成安县", value: "邯郸/成安县" },
                { label: "邯郸/临漳县", value: "邯郸/临漳县" },
                { label: "邢台西/襄都区", value: "邢台西/襄都区" },
                { label: "邢台西/信都区", value: "邢台西/信都区" },
                { label: "邢台西/任泽区", value: "邢台西/任泽区" },
                { label: "邢台西/南和区", value: "邢台西/南和区" },
                { label: "邢台西/柏乡", value: "邢台西/柏乡" },
                { label: "邢台西/临城", value: "邢台西/临城" },
                { label: "邢台西/内丘", value: "邢台西/内丘" },
                { label: "邢台西/沙河", value: "邢台西/沙河" },
                { label: "邢台东/宁晋县", value: "邢台东/宁晋县" },
                { label: "邢台东/巨鹿县", value: "邢台东/巨鹿县" },
                { label: "邢台东/平乡县", value: "邢台东/平乡县" },
                { label: "邢台东/新河县", value: "邢台东/新河县" },
                { label: "邢台东/南宫县", value: "邢台东/南宫县" },
                { label: "邢台东/威县", value: "邢台东/威县" },
                { label: "邢台东/清河县", value: "邢台东/清河县" },
                { label: "邢台东/临西县", value: "邢台东/临西县" },
                { label: "邢台东/广宗县", value: "邢台东/广宗县" },
                { label: "邢台东/隆尧县", value: "邢台东/隆尧县" },
                { label: "唐山/路南区", value: "唐山/路南区" },
                { label: "唐山/路北区", value: "唐山/路北区" },
                { label: "唐山/开平区", value: "唐山/开平区" },
                { label: "唐山/古冶区", value: "唐山/古冶区" },
                { label: "唐山/丰南区", value: "唐山/丰南区" },
                { label: "唐山/丰润区", value: "唐山/丰润区" },
                { label: "唐山/遵化市", value: "唐山/遵化市" },
                { label: "唐山/迁安市", value: "唐山/迁安市" },
                { label: "唐山/滦南县", value: "唐山/滦南县" },
                { label: "唐山/滦州市", value: "唐山/滦州市" },
                { label: "唐山/乐亭县", value: "唐山/乐亭县" },
                { label: "唐山/玉田县", value: "唐山/玉田县" },
                { label: "唐山/迁西县", value: "唐山/迁西县" },
                { label: "唐山/唐海县", value: "唐山/唐海县" },
                { label: "唐山/汉沽管理区", value: "唐山/汉沽管理区" },
                { label: "唐山/海港开发区", value: "唐山/海港开发区" },
                { label: "唐山/芦台开发区", value: "唐山/芦台开发区" },
                { label: "唐山/南堡开发区", value: "唐山/南堡开发区" },
                { label: "唐山/高新技术产业开发区", value: "唐山/高新技术产业开发区" },
                { label: "唐山/曹妃甸工业区", value: "唐山/曹妃甸工业区" },
                { label: "沧州/运河区", value: "沧州/运河区" },
                { label: "沧州/新华区", value: "沧州/新华区" },
                { label: "沧州/黄骅市", value: "沧州/黄骅市" },
                { label: "沧州/任丘市", value: "沧州/任丘市" },
                { label: "沧州/泊头市", value: "沧州/泊头市" },
                { label: "沧州/河间市", value: "沧州/河间市" },
                { label: "沧州/沧县", value: "沧州/沧县" },
                { label: "沧州/青县", value: "沧州/青县" },
                { label: "沧州/东光县", value: "沧州/东光县" },
                { label: "沧州/海兴县", value: "沧州/海兴县" },
                { label: "沧州/盐山县", value: "沧州/盐山县" },
                { label: "沧州/肃宁县", value: "沧州/肃宁县" },
                { label: "沧州/南皮县", value: "沧州/南皮县" },
                { label: "沧州/吴桥县", value: "沧州/吴桥县" },
                { label: "沧州/献县", value: "沧州/献县" },
                { label: "沧州/孟村回族自治县", value: "沧州/孟村回族自治县" },
                { label: "张家口/桥东区", value: "张家口/桥东区 " },
                { label: "张家口/桥西区", value: "张家口/桥西区 " },
                { label: "张家口/宣化区", value: "张家口/宣化区  " },
                { label: "张家口/下花园区", value: "张家口/下花园区 " },
                { label: "张家口/万全区", value: "张家口/万全区  " },
                { label: "张家口/崇礼区", value: "张家口/崇礼区 " },
                { label: "张家口/张北县", value: "张家口/张北县" },
                { label: "张家口/康保县", value: "张家口/康保县" },
                { label: "张家口/沽源县", value: "张家口/沽源县" },
                { label: "张家口/尚义县", value: "张家口/尚义县" },
                { label: "张家口/蔚县", value: "张家口/蔚县" },
                { label: "张家口/阳泉县", value: "张家口/阳泉县" },
                { label: "张家口/怀安县", value: "张家口/怀安县" },
                { label: "张家口/怀来县", value: "张家口/怀来县" },
                { label: "张家口/涿鹿县", value: "张家口/涿鹿县" },
                { label: "张家口/赤城县", value: "张家口/赤城县" },
                { label: "承德市/双滦区", value: "承德市/双滦区" },
                { label: "承德市/双桥区", value: "承德市/双桥区" },
                { label: "承德市/鹰手营子矿区", value: "承德市/鹰手营子矿区" },
                { label: "承德市/围场县", value: "承德市/围场县" },
                { label: "承德市/滦平县", value: "承德市/滦平县" },
                { label: "承德市/隆化县", value: "承德市/隆化县" },
                { label: "承德市/丰宁县", value: "承德市/丰宁县" },
                { label: "承德市/宽城县", value: "承德市/宽城县" },
                { label: "承德市/平泉县", value: "承德市/平泉县" },
                { label: "承德市/兴隆县", value: "承德市/兴隆县" },
                { label: "廊坊市/广阳区", value: "廊坊市/广阳区  " },
                { label: "廊坊市/安次区", value: "廊坊市/安次区 " },
                { label: "廊坊市/三河市", value: "廊坊市/三河市" },
                { label: "廊坊市/霸州市", value: "廊坊市/霸州市" },
                { label: "廊坊市/永清县", value: "廊坊市/永清县" },
                { label: "廊坊市/大厂回族自治县", value: "廊坊市/大厂回族自治县" },
                { label: "廊坊市/固安县", value: "廊坊市/固安县" },
                { label: "廊坊市/文安县", value: "廊坊市/文安县" },
                { label: "廊坊市/香河县", value: "廊坊市/香河县" },
                { label: "廊坊市/大城县", value: "廊坊市/大城县" },
                { label: "衡水市/桃城区", value: "衡水市/桃城区" },
                { label: "衡水市/冀州区", value: "衡水市/冀州区" },
                { label: "衡水市/深州市", value: "衡水市/深州市" },
                { label: "衡水市/枣强县", value: "衡水市/枣强县" },
                { label: "衡水市/武邑县", value: "衡水市/武邑县" },
                { label: "衡水市/武强县", value: "衡水市/武强县" },
                { label: "衡水市/饶阳县", value: "衡水市/饶阳县" },
                { label: "衡水市/安平县", value: "衡水市/安平县" },
                { label: "衡水市/故城县", value: "衡水市/故城县" },
                { label: "衡水市/景县", value: "衡水市/景县" },
                { label: "衡水市/阜城县", value: "衡水市/阜城县" },
                { label: "秦皇岛/海港区", value: "秦皇岛/海港区" },
                { label: "秦皇岛/山海关区", value: "秦皇岛/山海关区" },
                { label: "秦皇岛/北戴河区", value: "秦皇岛/北戴河区" },
                { label: "秦皇岛/抚宁区", value: "秦皇岛/抚宁区" },
                { label: "秦皇岛/昌黎县", value: "秦皇岛/昌黎县" },
                { label: "秦皇岛/卢龙县", value: "秦皇岛/卢龙县" },
                { label: "秦皇岛/青龙满族自治县", value: "秦皇岛/青龙满族自治县" },
                { label: "其他省市", value: "其他省市" },
              ]} />
            </Form.Item>

            <Form.Item label='身份证号' name='StudentIDCard' rules={[{ required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((value || "").length != 18) {
                  return Promise.reject(new Error('身份证必须是18位的'));
                }
                return Promise.resolve();

              },
            })
            ]}
            >
              <Input placeholder='请输入身份证号' clearable />
            </Form.Item>
            <Form.Item label='再次身份证号' name='ReStudentIDCard' rules={[{ required: true },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if ((value || "").length != 18) {
                  return Promise.reject(new Error('身份证必须是18位的'));
                }
                if (!value || getFieldValue('StudentIDCard') === value) {
                  return Promise.resolve();
                }
                else {
                  return Promise.reject(new Error('两次输入的身份证号不一致'));
                }

              },
            })
            ]}>
              <Input placeholder='请输入再次身份证号' clearable />
            </Form.Item>

            <Form.Item label='联系方式' name='StudentPhone' >
              <Input placeholder='请输入联系方式' clearable />
            </Form.Item>

            <Form.Item label='学生性质（单选）' name='StudentType' rules={[{ required: true }]}>
              <Selector
                columns={1}
                options={
                  groupArr
                }
              />

            </Form.Item>

            <Form.Item label='报考专业' name='StudentZhuanYeId'  >
              <SelectorItem dataSource={

                zhuanyeDict
              } />
            </Form.Item>

            <Form.Item label='毕业学校' name='StudentSchool'  >
              <Input placeholder='请输入毕业学校' clearable />
            </Form.Item>

            <Form.Item label='家庭住址' name='StudentAddress'  >


              <TextArea
                placeholder='请输入家庭住址'

              />
            </Form.Item>

            <Form.Item label='备注' name='Remark'>


              <TextArea
                placeholder='请输入备注'

              />
            </Form.Item>
          </Form>
        </ValidStatus>
      </div >
    );
  }

  getDict = async () => {
    try {
      this.setState({ loading: true })
      let data = await GetData({
        data: {
          DictTypeId: '881e8823-d103-44c3-8c69-ae98cb899cab', start: -1, length: -1, draw: 3
        }
      });

      let zhuanyeDict = (data || []).map(item => { return { label: item.DictValue, value: item.DictId } })
      this.setState({ zhuanyeDict })
    }
    catch { }
    finally {
      this.setState({ loading: false })
    }
  }

  initSysSettingGetData = async () => {
    try {
      let data = await SysSettingGetData({ data: {} });
      const { SysBaoMingStatus = false, danzhaoStatus = false, shengwaiStatus = false, tongzhaoStatus = false, zhongzhuanStatus = false, gaokaofudaobanStatus = false } = data;
      this.setState({
        SysBaoMingStatus, danzhaoStatus, shengwaiStatus, tongzhaoStatus, zhongzhuanStatus, gaokaofudaobanStatus
      });
    }
    catch {
      this.setState({
        SysBaoMingStatus: false, danzhaoStatus: false, shengwaiStatus: false, tongzhaoStatus: false, zhongzhuanStatus: false
      });
    }
  }


  async componentDidMount() {
    this.getDict();
    this.initSysSettingGetData();
  }

}

export default connect(({ dict, loading }) => ({
  dict,
  loading,
}))(index);
