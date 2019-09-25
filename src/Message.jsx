import React, { Component }  from 'react';
import "./Message.css"

class Message extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  expand_contract = () => {
    if (this.state.expanded) {
      this.setState({expanded : false})
    }
    else {
      this.setState({expanded: true})
    }
  }

  render() {
    return (
      <div className="message" onClick={ this.expand_contract }>
        <div className="name">
           {this.props.name}
        </div>
        <div className="message_text">
           {this.props.text}
        </div>
        {this.state.expanded ? (
              <div className="timestamp"> 
                  { new Date(parseInt(this.props.timestamp) * 1000).toString()}
              </div>) : null }
      </div>
    );
  }
}

export default Message;