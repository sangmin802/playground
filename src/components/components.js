import { connect } from 'react-redux';
import Header from './subject/Header.js';
import Lists from './nav/Lists.js';
import Btns from './controls/Btns.js';
import Section from './content/Section.js';

export default {
  Subject : connect((state) => {
    return {
      mode : state.mode
    };
  },(dispatch) => {
    return {
      onChange : (mode) => {
        dispatch({ type : mode })
      }
    };
  })(Header),
  
  Nav : connect((state) => {
    return {
      contents : state.contents,
    };
  },(dispatch) => {
    return {
      onChange : (id) => {
        dispatch({ type : 'Read', id : id })
      }
    };
  })(Lists),
  
  Controls : connect((state) => {
    return {
      mode : state.mode,
    };
  },(dispatch) => {
    return {
      onChange : (mode) => {
        dispatch({ type : mode })
      }
    };
  })(Btns),
  
  Content : connect((state) => {
    return {
      mode : state.mode,
      contents : state.contents,
      selected : state.selected
    };
  },(dispatch) => {
    return {
      create : (title, desc) => {
        dispatch({ type : 'createProcess', data : { title : title, desc : desc } });
      },
      update : (id, title, desc) => {
        dispatch({ type : 'updateProcess', id : id, data : { title : title, desc : desc }} )
      }
    };
  })(Section),
}