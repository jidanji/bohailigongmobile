import React, { Component } from 'react';
import styles from './index.css';

export default class index extends Component<any, any> {
  constructor(props: any) {
    super(props);


  }
  render() {
    return (
      <div className={styles.normal}>
        {this.props.children}
      </div>
    )
  }

  componentDidMount(): void {

  }
}
