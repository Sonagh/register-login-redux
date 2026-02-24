import { createStore, combineReducers } from 'redux';
import user from './reducers/user';

const rootReducer = combineReducers({
    user: user,
})

export const store = createStore(rootReducer);