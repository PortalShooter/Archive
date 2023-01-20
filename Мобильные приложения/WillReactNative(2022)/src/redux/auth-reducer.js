import {API} from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

const initialState = {
  success: false,
  phoneNumber: '',
  error: '',
  status: '',
  user: {},
  tasksActual: undefined,
  acivated: null,
  numberTusks: null,
  allTasks: [],

  startDate: '',
  firstDayTime: '',
  taskTitle: '',
  taskDescription: '',
  weekNumber: '',
  minTimeTask: 5,
  successTask: false,
  planingModal: false,
  reminder: false,

  preloader: false,

  tabBtn: false,
  changePlanning: false,
  changeModal: false,

  blockPlan: false,
  audioPlay: false,

  dataDocuments: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-SUCCESS': {
      return {...state, success: action.bool};
    }
    case 'SET-PHONE-NUMBER': {
      return {...state, phoneNumber: action.num};
    }
    case 'SET-ERROR': {
      return {...state, error: action.text};
    }
    case 'SET-USER': {
      return {...state, user: action.payload};
    }
    case 'SET-STATUS': {
      return {...state, status: action.payload};
    }
    case 'SET-TASKS': {
      return {...state, tasks: action.payload};
    }
    case 'SET-START-DATE': {
      return {...state, startDate: action.payload};
    }
    case 'SET-WEEK-NUMBER': {
      return {...state, weekNumber: action.payload};
    }
    case 'SET-TIME-DAY': {
      return {...state, firstDayTime: action.payload};
    }
    case 'SET-SUCCESS-TASK': {
      return {...state, successTask: action.bool, preloader: false};
    }
    case 'SET-TITLE-TASK': {
      return {...state, taskTitle: action.payload};
    }
    case 'SET-DESCRIPTION-TASK': {
      return {...state, taskDescription: action.payload};
    }
    case 'SET-ID-TASK': {
      return {...state, id: action.payload};
    }
    case 'SET-TASKS-ACTUAL': {
      return {...state, tasksActual: action.payload};
    }
    case 'SET-LOADER': {
      return {...state, preloader: action.bool};
    }
    case 'SET-MIN-TIME-TASK': {
      return {...state, minTimeTask: action.payload};
    }
    case 'SET-PLANING-MODAL': {
      return {...state, planingModal: action.bool};
    }
    case 'SET-ACTIVATED': {
      return {...state, acivated: action.bool};
    }
    case 'SET-NUMBER-TASKS': {
      return {...state, numberTusks: action.number};
    }
    case 'SET-ALL-TASKS': {
      return {...state, allTasks: action.obj};
    }
    case 'SET-TAB-BTN': {
      return {...state, tabBtn: action.bool};
    }
    case 'SET-CHANGE-PLANNING': {
      return {...state, changePlanning: action.bool};
    }
    case 'SET-CHANGE-MODAL': {
      return {...state, changeModal: action.bool};
    }
    case 'SET-BLOCK-PLAN': {
      return {...state, blockPlan: action.bool};
    }
    case 'SET-AUDIO-PLAY': {
      return {...state, audioPlay: action.bool};
    }
    case 'SET-DATA-DOCUMENTS': {
      return {...state, dataDocuments: action.obg};
    }
    default:
      return {...state};
  }
};

// action
export const setSuccess = bool => ({type: 'SET-SUCCESS', bool});
export const setPhoneNumber = num => ({type: 'SET-PHONE-NUMBER', num});
export const setError = text => ({type: 'SET-ERROR', text});
export const setUser = payload => ({type: 'SET-USER', payload});
export const setStatus = payload => ({type: 'SET-STATUS', payload});
export const setTasks = payload => ({type: 'SET-TASKS', payload});
export const setStartDate = payload => ({type: 'SET-START-DATE', payload});
export const setWeekNumber = payload => ({type: 'SET-WEEK-NUMBER', payload});
export const setTimeDay = payload => ({type: 'SET-TIME-DAY', payload}); // For time
export const setSuccessTask = bool => ({type: 'SET-SUCCESS-TASK', bool});
export const setTitleTask = payload => ({type: 'SET-TITLE-TASK', payload});
export const setTasksActual = payload => ({type: 'SET-TASKS-ACTUAL', payload});
export const setDescriptionTask = payload => ({
  type: 'SET-DESCRIPTION-TASK',
  payload,
});
export const setIdTask = payload => ({type: 'SET-ID-TASK', payload});
export const setLoader = bool => ({type: 'SET-LOADER', bool});
export const setMinTimeTask = payload => ({type: 'SET-MIN-TIME-TASK', payload});
export const setPlanningModal = bool => ({type: 'SET-PLANING-MODAL', bool});
export const setAcivated = bool => ({type: 'SET-ACTIVATED', bool});
export const setNumberTasks = number => ({type: 'SET-NUMBER-TASKS', number});
export const setAllTasks = obj => ({type: 'SET-ALL-TASKS', obj});
export const setTabBtn = bool => ({type: 'SET-TAB-BTN', bool});
export const setChangePlanning = bool => ({type: 'SET-CHANGE-PLANNING', bool});
export const setChangeModal = bool => ({type: 'SET-CHANGE-MODAL', bool});
export const setBlockPlan = bool => ({type: 'SET-BLOCK-PLAN', bool});
export const setAudioPlay = bool => ({type: 'SET-AUDIO-PLAY', bool});
export const setDataDocuments = obg => ({type: 'SET-DATA-DOCUMENTS', obg});
// thunk
export const checkPhone = phone => dispatch => {
  API.checkPhoneAndSendSms(phone)
    .then(res => {
      dispatch(setSuccess(res.data));
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const fetchUser = (phone, code) => dispatch => {
  API.registerOrLogin(phone, code)
    .then(async res => {
      if (res.data.data.is_activated) {
        await dispatch(
          setUser({...initialState.user, token: res.data.data.token}),
        );
        await AsyncStorage.setItem('token', res.data.data.token);
        await dispatch(getTasksActual());
        await dispatch(setAcivated(true));
        await dispatch(setStatus(res.status));
      } else {
        await dispatch(setAcivated(false));
      }
    })
    .catch(e => {
      console.log(e);
      dispatch(setError('Неверный код'));
    });
};

export const getTasks = () => dispatch => {
  API.getTasks()
    .then(async res => {
      await dispatch(setTasks(res.data.data.default_cases));
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const getStartDate = (date, week) => dispatch => {
  dispatch(setStartDate(date));
  dispatch(setWeekNumber(week));
};
export const setFirstDayTitle =
  (title, description, id, minTime) => dispatch => {
    dispatch(setTitleTask(title));
    dispatch(setDescriptionTask(description));
    dispatch(setIdTask(id));
    dispatch(setMinTimeTask(minTime));
  };
export const setFirstNewTitle = title => dispatch => {
  dispatch(setTitleTask(title));
};
export const postTask =
  (startDate, weekNumber, firstDayTime, title, minTime) => dispatch => {
    dispatch(setLoader(true));
    API.postFirstTask(startDate, weekNumber, firstDayTime, title, minTime)
      .then(async res => {
        await AsyncStorage.setItem('@taskTitle', res.data.data.task.title);
        await AsyncStorage.setItem('@startDate', res.data.data.task.start_date);
        await AsyncStorage.setItem(
          '@weekNumber',
          String(res.data.data.task.weeks_number),
        );
        const tasksActual = JSON.stringify(res.data.data.task);
        await AsyncStorage.setItem('@tasksActual', tasksActual);
        await dispatch(getTasksActual());
        dispatch(setSuccessTask(true));
      })
      .catch(e => {
        console.log(e.response);
      });
  };
export const getTasksActual = () => async dispatch => {
  await dispatch(setLoader(true));
  await API.getTasksActual()
    .then(async res => {
      dispatch(setTasksActual(res.data.task));
      const tasksActual = JSON.stringify(res.data.task);
      await AsyncStorage.setItem('@tasksActual', tasksActual);
    })
    .catch(e => {
      console.log(e.response);
      dispatch(setTasksActual(null));
    });
  await dispatch(setLoader(false));
};

export const updateDayTime =
  (taskId, days_ids, planned_start_times) => async dispatch => {
    await API.changeDayTime(taskId, days_ids, planned_start_times)
      .then(() => {
        dispatch(setTabBtn(false));
        dispatch(setBlockPlan(false));
      })
      .catch(e => {
        console.log(e.response);
      });
    await dispatch(getTasksActual());
  };

export const updateTaskParams = (taskId, description) => async dispatch => {
  await API.taskUpdateParams(taskId, description)
    .then(() => {
      dispatch(setTabBtn(false));
      dispatch(setBlockPlan(false));
    })
    .catch(e => {
      console.log(e.response);
    });
  await dispatch(getTasksActual());
};

export const checkActivationCode =
  (phone, activation_code) => async dispatch => {
    await API.checkActivation(phone, activation_code)
      .then(async res => {
        await dispatch(
          setUser({...initialState.user, token: res.data.data.token}),
        );
        await AsyncStorage.setItem('token', res.data.data.token);
        await dispatch(getTasksActual());
        await dispatch(setAcivated(true));
      })
      .catch(e => {
        console.log(e.response.data.error);
        dispatch(setError(e.response.data.error));
      });
  };

export const getNumberTasks = () => async dispatch => {
  await API.getAllTasks()
    .then(async res => {
      dispatch(setNumberTasks(res.data.data.tasks.length));
      dispatch(setAllTasks(res.data.data.tasks));
      await AsyncStorage.setItem(
        '@numberTasks',
        String(res.data.data.tasks.length),
      );
    })
    .catch(e => {
      console.log(e);
    });
};

export const deleteTaskActual = id => async dispatch => {
  await API.deleteTask(id)
    .then(() => {
      console.log('Дело удалено успешно');
      dispatch(setTasksActual(undefined));
      dispatch(setSuccessTask(false));
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const addWeeks = () => async dispatch => {
  await API.addWeeksToLatestTask()
    .then(e => {
      console.log(e);
    })
    .catch(e => {
      console.log(e.response);
    });
  await dispatch(getTasksActual());
};

export const closeTaskActual = (id, navigation) => async dispatch => {
  await API.updateTask(id)
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'DateStart',
          },
        ],
      });
      dispatch(setTasksActual(undefined));
      dispatch(setSuccessTask(false));
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const getDocuments = () => async dispatch => {
  await API.getDocuments()
    .then(res => {
      dispatch(setDataDocuments(res.data));
      console.log(res.data);
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const downloadDocument = id => async dispatch => {
  await API.getDownloadDocument(id)
    .then(res => {
      const fileUrl = res.data.data.url;

      const checkPermission = async () => {
        if (Platform.OS === 'ios') {
          downloadFile();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Требуется разрешение на хранение',
                message:
                  'Приложению требуется доступ к вашему хранилищу для загрузки файла',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // Start downloading
              downloadFile();
              console.log('Разрешение на хранение предоставлено.');
            } else {
              // If permission denied then show alert
              Alert.alert('Ошибка', 'Разрешение на хранение не предоставлено');
            }
          } catch (err) {
            // To handle permission related exception
            console.log(err);
          }
        }
      };

      const downloadFile = () => {
        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = fileUrl;
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];

        const {config, fs} = RNFetchBlob;
        let RootDir =
          Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        const fileName =
          'file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext;

        const configfb = {
          fileCache: true,
          addAndroidDownloads: {
            path: RootDir + '/' + fileName,
            description: 'downloading file...',
            notification: true,
            useDownloadManager: true,
            title: fileName,
          },
        };

        const configOptions = Platform.select({
          ios: {
            fileCache: configfb.fileCache,
            title: configfb.addAndroidDownloads.title,
            path: configfb.addAndroidDownloads.path,
            appendExt: file_ext,
          },
          android: configfb,
        });

        config(configOptions)
          .fetch('GET', FILE_URL)
          .then(res => {
            if (Platform.OS === 'ios') {
              RNFetchBlob.fs.writeFile(
                configfb.addAndroidDownloads.path,
                res.data,
                'base64',
              );
              RNFetchBlob.ios.previewDocument(
                configfb.addAndroidDownloads.path,
              );
            } else {
              Alert.alert('Уведомление', 'Файл успешно загружен');
            }
          });
      };

      const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
      };
      checkPermission();
    })
    .catch(e => {
      console.log(e);
    });
};
