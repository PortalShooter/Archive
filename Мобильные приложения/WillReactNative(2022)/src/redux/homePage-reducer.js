import {API} from '../api/api';
import {getTasksActual} from "./auth-reducer";
import {fetchUserFilledDays, fetchUserNotes} from "./dayBook-reducer";

const initialState = {
  statistics: {},
  visibleReminder: true
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-TASKS-STATISTICS': {
      return {...state, statistics: action.obj};
    }
    case 'SET-VISIBLE-REMINDER': {
      return {...state, visibleReminder: action.bool};
    }
    default:
      return {...state};
  }
};
// action
export const setTasksStatistics = obj => ({type: 'SET-TASKS-STATISTICS', obj});
export const setVisibleReminderAC = bool => ({type: 'SET-VISIBLE-REMINDER', bool});


// thunk
export const fetchTaskDays= () => dispatch => {
  API.getTasksDaysIndex()
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const putTaskDays = (obj, idDay, id) => async (dispatch) => {
 await API.putTaskDaysUpdate(obj, idDay).then(res => {
    console.log(res.data)
  }).catch((e) => {
    console.log(e.response)
  });
  await dispatch(getTasksActual());
  await dispatch(fetchUserNotes());
  await dispatch(fetchUserFilledDays());
  await dispatch(fetchTasksStatistics(id));
};
export const fetchTasksStatistics = (id) => (dispatch) => {
  API.getTasksStatistics(id).then((res) => {
    dispatch(setTasksStatistics(res.data.data))
  }).catch((e) => {
    console.log(e.response)
  })
};




