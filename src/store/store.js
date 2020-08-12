import { createStore } from 'redux'

// let reducer = function (state = { count: 1 }, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       state.count += action.payload;
//       return { ...state };
//     default:
//       return state;
//   }
// }
let id = 1;

let store = createStore((state = [], action) => {
  switch (action.type) {
    case 'ADD_ACTION':
      return [
        ...state,
        {
          id: id++,
          todo: action.payload,
          checked: false,
        }
      ];
    case 'TOGGLE_ACTION':
      return state.map(item => item.id === action.payload ? { ...item, checked: !item.checked } : item);
    case 'DEL_ACTION':
      return state.filter(item => item.id !== action.payload);
    case 'CHANGE_ACTION':
      return state.map(item => item.id === action.payload.id ? { ...item, todo: action.payload.todo } : item);
    default:
      return state;
  }
});

export default store;