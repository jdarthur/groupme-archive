import React, { Component }  from 'react';
import './App.css';

import Navbar from "./Navbar.jsx"
import UserList from "./UserList.jsx"
import MessageList from "./MessageList.jsx"
import LikeList from "./LikeList.jsx"
import Spotlight from "./Spotlight.jsx"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "messages"
    }
  } 

  show_messages = () => {
    this.setState({selected: "messages"})
  }

  show_users = () => {
    this.setState({selected: "users"})
  }

  show_likes = () => {
    this.setState({selected: "likes"})
  }

  show_spotlight = () => {
    this.setState({selected: "spotlight"})
  }
  render() {
    return (
      <div className="App">
         <Navbar show_messages={this.show_messages} show_users={this.show_users} 
                 show_likes={this.show_likes}       show_spotlight={this.show_spotlight} />

         {this.state.selected === "messages"  ? <MessageList /> : null }
         {this.state.selected === "users"     ? <UserList />    : null }
         {this.state.selected === "likes"     ? <LikeList />    : null }
         {this.state.selected === "spotlight" ? <Spotlight />   : null }
      </div>
    );
  }
}

export default App;
