import React, { Component } from 'react'
import { Picker, Button, Space, Toast } from 'antd-mobile/2x'

import { DownOutline, CloseCircleFill } from 'antd-mobile-icons'
import './index.less'
export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      value: this.props.value || []
    }
  }

  clear = (e) => {
    e.stopPropagation();
    this.setState({ value: [] });
    this.props.onChange([]);
  }
  render() {
    return (
      <>
        <div className={(this.state.value || []).length ? 'SelectorItemSelected' : 'SelectorItem'}
          onClick={() => {
            this.setState({ visible: true })
          }}
        >
          <div className='content'>
            {(this.state.value || []).join(',') || '请选择'}
          </div>
          <Space wrap>
            <div className='toolbar' onClick={this.clear}>
              {!!(this.state.value || []).length && <CloseCircleFill />}
            </div>
            <div className='toolbar'>
              <DownOutline />
            </div>
          </Space>


        </div>
        <Picker
          columns={[
            this.props.dataSource || []
          ]}
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false })
          }}
          value={this.state.value}
          onConfirm={value => {
            this.setState({ value })
            this.props.onChange(value);
          }}
        />
      </>
    )
  }
}
