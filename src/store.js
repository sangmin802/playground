import { createStore } from 'redux';

export default createStore((state, action) => {  
  if(state === undefined){
    return {
      mode : 'Home',
      id : 3,
      selected : null,
      contents : [
        { id : 1, title : 'HTML', desc : 'HTML is...' },
        { id : 2, title : 'CSS', desc : 'CSS is...' },
        { id : 3, title : 'JavaScript', desc : 'JavaScript is...' },
      ],
    };
  }else{
    action.id = Number(action.id);
    let newState = { ...state };
    let newContents = Array.from(state.contents);
    if(action.type === 'Home'){
      newState.mode = action.type;
    }else if(action.type === 'Read'){
      newState.mode = action.type;
      newState.selected = action.id;
    }else if(action.type === 'Create'){
      newState.mode = action.type;
    }else if(action.type === 'createProcess'){

      // 그냥 state를 복제한 newstate의 contents에 push하면 state도 변경되어서, list component가 state의 변화를 못느끼고 render를 실행 안시킴

      // 해결) 우리 예전에, 불변성 배울 때, 두개의 변수는 같은 객체를 보며, 복제되었다 하더라도, 객체 안의 객체는 서로 같은것을 보기 때문에, 그 객체만 따로 복사해줘야 한다고 배웠음.

      newContents.push({
        id : state.id + 1,
        title : action.data.title,
        desc : action.data.desc
      });
      newState.id = state.id + 1;
      newState.selected = newState.id;
      newState.mode = 'Read';
      newState.contents = newContents;
    }else if(action.type === 'Update'){
      newState.mode = action.type;
    }else if(action.type === 'updateProcess'){
      newContents.forEach(res => {
        if(res.id === action.id){
          res.title = action.data.title;
          res.desc = action.data.desc;
        };
      });
      newState.contents = newContents;
      newState.mode = 'Read';
      newState.selected = action.id;
    }else if(action.type === 'Delete'){
      const selected = newContents.find(res => res.id === state.selected);
      const index = newContents.indexOf(selected);
      newContents.splice(index, 1);
      newState.contents = newContents;
      newState.mode = 'Home';
      newState.selected = null;
    };

    return newState;
  };
});