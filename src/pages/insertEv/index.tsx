import React, { Component } from 'react'

import { Form, Input, Button, Checkbox, message } from 'antd';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Select } from 'antd';

import { getdata, AddShiTi } from '@/serivces/CePing'

import { FormInstance } from 'antd/es/form';

import ValidStatus from '@/components/ValidStatus';

const { Option } = Select;

export default class index extends Component<any, any> {
    formRef = React.createRef<FormInstance>();
    state = { data: [] }

    async componentDidMount() {

        this.setState({ data: await getdata({}) })

    }
    onFinish = async (values) => {
        let data = await AddShiTi({ data: { ...values } })
        message.success("提交成功")
        this.formRef.current!.resetFields();
    }

    onFinishFailed = () => { }

    onReset = () => {
        this.formRef.current!.resetFields();
    }
    render() {
        return (
            <ValidStatus>
                <div>
                    <Form ref={this.formRef}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="顺序"
                            name="EvaluateOrderNumber"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="标题"
                            name="EvaluateDictTitle"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="题目分组"
                            name="DictTypeId"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Select style={{ width: 500 }}
                                showSearch

                                optionFilterProp="children"

                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    this.state.data.map(item => <Option value={item.DictTypeId}>{item.DictTypeValue}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="权值"
                            name="EvaluateWeight"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="适用对象"
                            name="EvaluateType"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Select style={{ width: 300 }}>
                                {/* <Option value="3">学生互评</Option> */}
                                {/* <Option value="2">学生评价老师</Option> */}
                                <Option value="5">老师评价学生</Option>
                            </Select>
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </ValidStatus>

        )
    }


}
