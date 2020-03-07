import React, { Component } from "react";

class Btn extends Component {
  render(){
    let Btns = null;
    if(this.props.mode === 'Home'){
      Btns = <div><span onClick = {this.mode.bind(this)}>Create</span></div>;
    }else if(this.props.mode === 'Read'){
      Btns = <div><span onClick = {this.mode.bind(this)}>Update</span> <span onClick = {this.mode.bind(this)}>Delete</span></div>;
    }
    return(
      <div>
        {Btns}
      </div>
    );
  };

  mode(e){
    this.props.onChange(e.target.textContent);
  };
};

export default Btn;