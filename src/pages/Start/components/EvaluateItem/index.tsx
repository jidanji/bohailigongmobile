import React, { Component } from 'react'
import './index.less'

import { Radio, Space } from 'antd-mobile/2x'

import {
    Form,
    Input,
    Button,
    Dialog,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
} from 'antd-mobile/2x'

export default class index extends Component<any, any> {
    static defaultProps = {
        showType: 'RadioGroup',
    }

    state={
      currentVal:0
    }
  onChange=(currentVal)=> {
    this.setState({ currentVal })
  }

  onChange1=(currentVal)=> {
    let { onChange } = this.props;
    onChange && onChange(currentVal)
  }
    render() {
        return (
            <div className='EvaluateItemContainer'>
                <div className='secondeDiv'>
                    <div style={{ textAlign: "left" }} className='timuitem'>
                        {this.props.showType == 'RadioGroup' && <Form.Item
                            name={this.props.EvaluateDictId}
                            label={<div style={{ display: "flex", alignItems: "baseline" }} className='topDiv'>
                                <div className='steps'>{this.props.subIndex+1}.</div>
                                <div className='cateGroyName'>{this.props.EvaluateDictTitle}</div>
                              <div style={{flex:"1",textAlign:"right"}}>
                                {(this.state.currentVal*this.props.EvaluateWeight).toFixed(1)}
                              </div>
                            </div>}
                            rules={[{ required: true, message: '请选择' }]}
                        >
                            <Radio.Group onChange={this.onChange}
                            >
                                <Space direction='vertical' block>
                                    <Radio value='60' block>60</Radio>
                                    <Radio value='70' block>70</Radio>
                                    <Radio value='80' block>80</Radio>
                                    <Radio value='90' block>90</Radio>
                                    <Radio value='100' block>100</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>}

                        {this.props.showType == 'TextArea' && <Form.Item

                            name='其他评价'
                            label={<div style={{ display: "flex", alignItems: "baseline" }} className='topDiv'>
                                <div className='steps'></div>
                                <div className='cateGroyName'> 其他评价</div>
                            </div>}
                            rules={[{ required: true, message: '请输入' }]}
                        >

                            <TextArea  onChange={this.onChange1}
                                placeholder='其他评价'
                                autoSize={{ minRows: 3, maxRows: 3 }}
                            />
                        </Form.Item>}
                    </div>
                </div>


            </div>
        )
    }
}
