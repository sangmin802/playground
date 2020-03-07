import React, { Component } from "react";

class Header extends Component{
  render(){
    return(
      <header>
        <h1 onClick = {this.goIndex.bind(this)}>WEB - {this.props.mode}</h1>
        <p>
          Hello, WEB
        </p>
      </header>
    );
  };

  goIndex(){
    this.props.onChange('Home');
  };
};

export default Header;