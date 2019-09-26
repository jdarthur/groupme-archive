import React, { Component }  from 'react';
import "./User.css"
import Alias from "./Alias.jsx"

class User extends Component {

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
    const aliases = this.props.aliases.map((alias) => (
              <Alias key={alias[0]} name={alias[0]} timestamp={alias[1]} />
            ))

    return (
      <div className="user" onClick={ this.expand_contract }>
        <div className="nickname">
           {this.props.nickname}
        </div>
        {this.state.expanded ? (
              <div className="alias_list">
                  Aliases: <br/>
                  {aliases}
              </div>) : null }
      </div>
    );
  }
}

export default User;
