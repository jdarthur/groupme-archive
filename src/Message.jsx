import React, { Component } from 'react';

import 'antd/dist/antd.css';
import { Comment, Tooltip } from "antd"
import { HeartOutlined, HeartFilled } from "@ant-design/icons"

import moment from 'moment'

class Message extends Component {

  render() {
    // console.log(this.props.timestamp)

    const likes = (this.props.likes?.length === 0) ?
      <HeartOutlined /> :
      <div style={{ position: 'relative' }}>
        <HeartFilled />
        <span style={{ position: 'absolute', top: '.6em', right: "-.6em", fontSize: '.75em' }}>
          {this.props.likes?.length}
        </span>
      </div>


    const content = <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span> {this.props.text} </span>
      <span style={{ color: "#8d8d8d", marginLeft: 25, marginRight: 10 }}> {likes} </span>
    </div>
    const timestamp = <Tooltip
      title={moment(this.props.timestamp * 1000)
        .subtract(1, 'days')
        .format('MMM Do, YYYY h:mm:ss A')}
    >
      <span>
        {moment(this.props.timestamp * 1000)
          .subtract(1, 'days')
          .fromNow()}
      </span>

    </Tooltip>

    return <Comment author={this.props.name}
      content={content} avatar={this.props.avatar}
      datetime={timestamp} style={{ textAlign: "left" }} />

  }
}

export default Message;