import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth-reducer';
import {trainingReducer} from './training-reducer';
import {dayBookReducer} from './dayBook-reducer';
import {homePageReducer} from "./homePage-reducer";

const rootReducer = combineReducers({
  Auth: authReducer,
  Training: trainingReducer,
  HomePage: homePageReducer,
  DayBook: dayBookReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
