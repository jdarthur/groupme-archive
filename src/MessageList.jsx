import React, { Component }  from 'react';
import Message from "./Message.jsx"
import "./MessageList.css"

class MessageList extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	    messages: []
    }

    this.get_messages(0, 10000)

  }

  get_messages = (start_index, count) => {
    get_data('/api/messages?start_index=' + start_index + '&count=' + count).then(data => {
      console.log(data)
      this.setState({"messages": data.data})
    }).catch(error => {
        return false
    })
  }

  render() {
    let message_list = null
    if (this.state.messages.length > 0) {
      message_list = this.state.messages.map((message) => {
        return (<Message key={message.id}
                         name={message.name}
                         timestamp={message.created_at}
                         text={message.text} /> )
      })
    }

    return (
      <div className="message_list">
      Messages: <br/>
         {message_list}
      </div>
    );
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
