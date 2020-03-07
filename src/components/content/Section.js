import React, { Component } from "react";

class Section extends Component {
  constructor(props){
    super(props);
    this.state = {
      count : 0
    };
  };

  render(){
    const { count } = this.state;
    let content = null;
    const selected = Array.from(this.props.contents).find(res => 
      this.props.selected === res.id
    );
    if(this.props.mode === 'Home'){
      content = 
        <div>
          <h2>WEB width React/React-Redux</h2>
          <p>First React App with React-Redux...</p>
          <p>{ count }</p>
        </div>;
    }else if(this.props.mode === 'Read'){
      content = 
        <div>
          <h2>{selected.title}</h2>
          <p onClick={() => {
            this.setState(current => ({ count : current.count + 1 }));
          }}>{selected.desc}</p>
          <p>{ count }</p>
        </div>;
    }else if(this.props.mode === 'Create'){
      content = 
        <form onSubmit = {this.submit.bind(this)}>
          <h2>Create</h2>
          <p>
            <input type="text" name="title" placeholder ="title"/>
          </p>
          <p>
            <textarea name="desc" placeholder="desc"></textarea>
          </p>
          <p>
            <input type="submit" value="Create"/>
          </p>
        </form>;
    }else if(this.props.mode === 'Update'){
      content = 
        <form onSubmit = {this.submit.bind(this)}>
          <h2>Update</h2>
          <input type="hidden" name='id' defaultValue = {selected.id}/>
          <p>
            <input type="text" name="title" defaultValue = {selected.title} placeholder ="title"/>
          </p>
          <p>
            <textarea name="desc" placeholder="desc" defaultValue = {selected.desc}></textarea>
          </p>
          <p>
            <input type="submit" value="Update"/>
          </p>
        </form>;
    }

    return(
      <section>
        {content}
      </section>
    );
  };

  submit(e){
    e.preventDefault();
    if(this.props.mode === 'Create'){
      this.props.create(e.target.title.value, e.target.desc.value);
    }else if(this.props.mode === 'Update'){
      this.props.update(e.target.id.value, e.target.title.value, e.target.desc.value);
    }
  };
};

export default Section;