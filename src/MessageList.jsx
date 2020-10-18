import React, { Component } from 'react';
import Message from "./Message"
import Paginator from "./Paginator"
import "./MessageList.css"
import { List } from "antd"

const PAGE_DEFAULT = 50

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message_count: 0,
      page_size: PAGE_DEFAULT,
      start_index: 0
    }
  }

  componentDidMount = () => {
    this.get_message_count()
    const start_index = parseInt(new URL(window.location.href).searchParams.get('start_index') || 0)
    const page_size = parseInt(new URL(window.location.href).searchParams.get('page_size') || PAGE_DEFAULT)

    this.setState({ start_index: start_index, page_size: page_size }, () => {
      this.get_messages(this.state.start_index, this.state.page_size)
    })
  }

  get_messages = (start_index, count) => {
    get_data('/api/messages?start_index=' + start_index + '&count=' + count).then(data => {
      console.log(data)
      this.setState({ "messages": data.data })
    }).catch(error => {
      return false
    })
  }

  get_message_count = () => {
    get_data('/api/messages/count').then(data => {
      console.log(data)
      this.setState({ message_count: data?.count })
    }).catch(error => {
      return 0
    })
  }

  set_page_size = (page_size) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page_size', page_size)
    window.location.href = url
  }

  set_start_index = (start_index) => {
    const url = new URL(window.location.href)
    url.searchParams.set('start_index', start_index)
    window.location.href = url
  }

  render() {
    const page = Math.floor(this.state.start_index / this.state.page_size)
    const page_count = Math.floor(this.state.message_count / this.state.page_size)

    let message_list = null
    if (this.state.messages.length > 0) {
      message_list = this.state.messages.map((message) => {
        return (<Message key={message.id} name={message.name}
          timestamp={message.created_at} text={message.text}
          avatar={message.avatar_url} attachments={message.attachments}
          likes={message.favorited_by} />)
      })
    }

    return <div className="messages_container" >
      <Paginator page={page} page_count={page_count}
        set_start_index={this.set_start_index} page_size={this.state.page_size}
        set_page_size={this.set_page_size} />
      <div className="message_list">
      <List 
        className="comment-list"
        itemLayout="horizontal"
        dataSource={message_list || []}
        renderItem={message => (
          <li>
            {message}
          </li>
        )}
      />
      </div>

    </div>


  }
}

export default MessageList;

function get_data(url) {
  console.log("getting data from '" + url + "'")
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status)
      }
      return response.json()
    });
}
