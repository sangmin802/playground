import React, { Component } from "react";

class Lists extends Component{
  render(){
    return(
      <ul>
        {Array.from(this.props.contents).map(res => {
          const li = <li key = {res.id} data-id = {res.id} onClick = {this.selected.bind(this)}>{res.title}</li>
          return li
        })}
      </ul>
    );
  };

  selected(e){
    this.props.onChange(e.target.dataset.id);
  };
};

export default Lists;