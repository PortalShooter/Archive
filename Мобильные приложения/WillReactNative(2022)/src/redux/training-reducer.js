import {API} from '../api/api';

const initialState = {
  trainingDays: [],
  training_notes: [],
  training_index: []
};

export const trainingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-TRAINS-TIMER': {
      return {...state, trainingDays: action.obj};
    }
    case 'SET-TRAINING-NOTES': {
      return {...state, training_notes: action.arr};
    }
    case 'SET-TRAINING-INDEX': {
      return {...state, training_index: action.arr};
    }
    default:
      return {...state};
  }
};
// action
export const setTrainsTimer = obj => ({type: 'SET-TRAINS-TIMER', obj});
export const setTrainingNotes = arr => ({type: 'SET-TRAINING-NOTES', arr});
export const setTrainingsIndex = arr => ({type: 'SET-TRAINING-INDEX', arr});

// thunk
export const fetchTraining = (id) => dispatch => {
  API.getTrainsTimer(id)
    .then(res => {
      console.log(res.data.data.training_days)
      dispatch(setTrainsTimer(res.data.data.training_days));
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const postTrainingTimer = (id, day, time) => async dispatch => {
  await API.postTrainsTimer(id, day, time)
    .then((e) => {
      console.log(e)})
    .catch(e => {
      console.log(e.response);
    });
  await dispatch(fetchTraining(id));
};
export const deleteTrainsTimer = (trainings, id) => async (dispatch) => {
  await API.deleteTrainsTimer(trainings).then((res) => {
  }).catch((e) => {
    console.log(e)
  })
  await dispatch(fetchTraining(id));
}
export const fetchTrainingsIndex = () => async dispatch => {
  await API.getTrainingsIndex()
    .then((res) => {
      dispatch(setTrainingsIndex(res.data.data.trainings))
    })
    .catch(e => {
      console.log(e);
    });
  await dispatch(fetchTraining());
};

export const fetchTrainingNotes = (id) => dispatch => {
  API.getNotes(id)
    .then(res => {
      dispatch(setTrainingNotes(res.data.data.training_notes));
    })
    .catch(e => {
      console.log(e);
    });
};
export const postTrainingNotes = (training_id, note) => async dispatch => {
  await API.postNotesTraining(training_id, note)
    .then(() => {
      console.log('Post notes');
    })
    .catch(e => {
      console.log(e);
    });
  await dispatch(fetchTrainingNotes(training_id));
};

export const deleteTrainingNotes = (idTraining, id) => async dispatch => {
  await API.deleteNotes(id)
    .then(() => {
      console.log(`Delete notes ${id}`);
    })
    .catch(e => {
      console.log(e.response);
    });
  await dispatch(fetchTrainingNotes(idTraining));
};
