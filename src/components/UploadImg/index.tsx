import React, { Component } from 'react';
import Img from '@/assets/img.png';

import validImg from '@/utils/validImg';
import {Tag,Toast,Dialog} from 'antd-mobile/2x'

import { getFileURL } from '@/utils/FileHelper';

class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      imgSource: Img,
    };
  }
  fileChange = (event: any) => {
    const files = [...event.target.files];
    if (files.length === 0) return;
    let file = files[0]
    let { name } = file;
    let url = getFileURL(file);

    if (!validImg(name)) {
      Dialog.alert({
        content: '上传失败,请上传png，jpg，jpeg，bpm图片文件',
        onConfirm: () => {
          console.log('Confirmed')
        },
      })
      return
    }

    const { value, onChange } = this.props;
    this.setState({ imgSource: url });
    onChange({ fileName: name, fileStream: file })
  };

  render() {
    const { imgSource } = this.state;
    return (
      <div>
        <div>
          <img className='upload' src={imgSource} alt='' onClick={() => {
            this.textInput.current.click();
          }} />
          <input accept='image/jpeg,image/jpg,image/png,image/bpm' ref={this.textInput} name='submitFile' id='submitFile'
                 onChange={this.fileChange} type='file' style={{ display: 'none' }} />
        </div>

        <Tag fill='outline' color='primary'> 请上传png，jpg，jpeg，bpm图片文件</Tag>

      </div>
    );
  }
}

export default Index;
