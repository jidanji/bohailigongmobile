import React, { Component } from 'react';
import styles from './index.css';
import NoWeChat from '@/components/NoWeChat'
export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isWX: false
    }
  }
  render() {
    const { isWX } = this.state;
    return (
      <>
        {!isWX && <div className={styles.normal}>
          {this.props.children}
        </div>}
        {
          isWX && < NoWeChat />
        }
      </>

    )
  }

  componentDidMount(): void {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      this.setState({ isWX: true });
    }
  }
}
