import React, { Component }  from 'react';
import Message from "./Message.jsx"
import "./MessageList.css"

class MessageList extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	    messages: get_remote_messages()
    }
  }

  render() {
    let message_list = null
    if (this.state.messages.length > 0) {
      message_list = this.state.messages.map((message) => {
        return (<Message key={message.id} 
                         name={message.name}
                         timestamp={message.timestamp}
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

function get_remote_messages() {
  return [
    {
      user_id: 1,
      name: "jim",
      timestamp: 1424376335,
      text: "Here's a message",
      id: 1234567
    },
    {
      user_id: 2,
      name: "frank",
      timestamp: 1424377335,
      text: "yes. i am replying to it",
      id: 12345678
    },
    {
      user_id: 1,
      name: "jim",
      timestamp: 1424378335,
      text: "i agree",
      id: 123456789
    }
  ]
}

export default MessageList;