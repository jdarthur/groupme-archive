import React, { Component }  from 'react';
import User from "./User.jsx"
import "./UserList.css"

class UserList extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	    users: ""
    }

   get_data('/api/users').then(data => {
          console.log(data)
          this.setState({"users": data.data})
      }).catch(error => {
          return false
      })


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

export default UserList;

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
