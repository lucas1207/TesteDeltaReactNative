import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  renderNewUser: false,
  renderEditUser: false,
  reloadList: false,
  currentUser: {},
  renderDeleteUser: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setRenderNewUser':
      return { ...state, renderNewUser: action.value };
    case 'setRenderEditUser':
      return { ...state, renderEditUser: action.value };
    case 'setRenderDeleteUser':
      return { ...state, renderDeleteUser: action.value };
    case 'setReloadList':
      return { ...state, reloadList: action.value };
    case 'setCurrentUser':
      return { ...state, currentUser: action.value };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export default store;
