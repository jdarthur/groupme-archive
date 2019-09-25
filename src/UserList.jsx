import React, { Component }  from 'react';
import User from "./User.jsx"
import "./UserList.css"

class UserList extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	    users: get_remote_users()
    }
  }

  render() {
    let user_list = null
    if (this.state.users.length > 0) {
      user_list = this.state.users.map((user) => {
        console.log(user)
        return (<User key={user.user_id} 
                      nickname={user.current_nickname} 
                      aliases={user.aliases} /> )
      })
    }

    return (
      <div className="user_list">
      Users: <br/>
         {user_list}
      </div>
    );
  }
}

function get_remote_users() {
  return [
    {
      user_id: 1,
      current_nickname: "jim",
      aliases: [ "Jimbo", "Jameson", "Jolly Jimothy"]
    },
    {
      user_id: 2,
      current_nickname: "frank",
      aliases: ["Phrank", "Franklin", "Frankfurter"]
    },
    {
      user_id: 3,
      current_nickname: "norbert",
      aliases: ["N", "Borbert"]
    }
  ]
}

export default UserList;