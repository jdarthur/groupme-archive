import React, { Component }  from 'react';
import "./Alias.css"

class Alias extends Component {
  render() {
    return (
      <div className="flex_row">
        <div className="alias"> {this.props.name} </div>
        <div className="timestamp" > ({ new Date(parseInt(this.props.timestamp) * 1000).toString()}) </div>
      </div>
    );
  }
}

export default Alias;