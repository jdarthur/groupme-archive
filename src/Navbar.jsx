import React, { Component }  from 'react';
import "./Navbar.css"

class Navbar extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		selected: "messages"
  	}
  }	

  show_messages = () => {
  	this.setState({selected: "messages"})
  	this.props.show_messages()
  }

  show_users = () => {
  	this.setState({selected: "users"})
  	this.props.show_users()
  }

  show_likes = () => {
  	this.setState({selected: "likes"})
  	this.props.show_likes()
  }

  show_spotlight = () => {
  	this.setState({selected: "spotlight"})
  	this.props.show_spotlight()
  }


  render() {
    return (
      <div className="navbar">
        <div className={ "navbar_item " + (this.state.selected === "messages" ? "selected" : "unselected")} 
             onClick={this.show_messages}> Messages </div>
        <div className={ "navbar_item " + (this.state.selected === "users" ? "selected" : "unselected")}  
             onClick={this.show_users}> Users </div>
        <div className={ "navbar_item " + (this.state.selected === "likes" ? "selected" : "unselected")}  
             onClick={this.show_likes}> Likes </div>
        <div className={ "navbar_item " + (this.state.selected === "spotlight" ? "selected" : "unselected")}  
             onClick={this.show_spotlight}> Spotlight </div>
      </div>
    );
  }
}

export default Navbar;