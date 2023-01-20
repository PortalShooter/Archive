import {API} from "../api/api";
import {getTasksActual} from "./auth-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
  userFilledDays: [],
  userNotes: []
}

export const dayBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-USER-FILLED-DAYS': {
      return {...state, userFilledDays: action.payload}
    }
    case 'SET-USER-NOTES': {
      return {...state, userNotes: action.payload}
    }
    default:
      return {...state}
  }
}
// action
const setUserFilledDays = (payload) => ({type: 'SET-USER-FILLED-DAYS', payload})
const setUserNotes = (payload) => ({type: 'SET-USER-NOTES', payload})


// thunk

export const fetchUserNotes = () => (dispatch) => {
  API.getUserNotes().then((res) => {
    dispatch(setUserNotes( res.data.data.user_notes))
  }).catch((e) => {
    console.log(e)
  })
}
export const postUserNotes = (date, notesInputValue) => async (dispatch) => {
  await API.postUserNotes(date, notesInputValue).then(async (res) => {
    console.log(res.data)
    await AsyncStorage.removeItem('@DayBookNotes')
  }).catch((e) => {
    console.log(e)
  })
  await dispatch(fetchUserNotes())
}
export const fetchUserFilledDays = () => (dispatch) => {
  API.getUserFilledDays().then((res) => {
    console.log(res.data)
    dispatch(setUserFilledDays(res.data.data))
  }).catch((e) => {
    console.log(e)
  })
}
