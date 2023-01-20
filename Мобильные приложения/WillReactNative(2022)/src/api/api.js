import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'https://api.volya-school.sector.show',
});

instance.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export const API = {
  checkPhoneAndSendSms(phone) {
    return instance.post('/api/auth/send-sms', {phone});
  },
  registerOrLogin(phone, code) {
    return instance.post('/api/auth', {phone, code});
  },
  logOut() {
    return instance.get('/api/logout')
  },
  // getTasksDaysIndex() {
  //   return instance.get('/api/tasks/14/task-days')
  // },
  getTasksActual() {
    return instance.get('/api/tasks/actual')
  },
  putTaskDaysUpdate(obj, idDay) {
    return instance.put(`/api/task-days/${idDay}`, obj)
  },
  putTaskDaysUpdateNotes(id, notes) {
    return instance.put(`/api/task-days/${id}/notes`, {notes: notes}  )
  },
  getTrainsTimer(id) {
    return instance.get(`/api/trainings/${id}/days`);
  },
  getUserFilledDays() {
    return instance.get('/api/task-days/get-user-filled-days')
  },
  getUserNotes() {
    return instance.get(`/api/user-notes`)
  },
  getTrainingsIndex() {
    return instance.get('/api/trainings')
  },
  postUserNotes(date, notesInputValue) {
    const data = { day: date, text: notesInputValue};
    return instance.post('/api/user-notes', data)
  },
  postTrainsTimer(training_id: 4, day, elapsed_time) {
    return instance.post('/api/trainings/days', {
      training_id,
      day,
      elapsed_time,
    });
  },
  deleteTrainsTimer(trainingDays) {
    return instance.delete('/api/trainings/days',  {data: {trainingDays: trainingDays}})
  },
  getTasks() {
    return instance.get('/api/default-cases');
  },
  getTasksStatistics(id) {
    return instance.get(`/api/tasks/${id}/statistics`)
  },
  getNotes(id) {
    return instance.get(`/api/trainings/${id}/notes`);
  },
  postNotesTraining(training_id, note) {
    return instance.post('/api/trainings/notes', {training_id, note})
  },
  deleteNotes(id) {
    return instance.delete(`/api/trainings/notes/${id}`)
  },
  postFirstTask(startDate, firstDayTime, weekNumber, title, minTime) {
    const data = {
      start_date: startDate,
      first_day_time: weekNumber,
      weeks_number: firstDayTime,
      user_case_title: title,
      user_case_min_time_in_minutes: minTime,
    };
    return instance.post('/api/tasks', data);
  },
  changeDayTime(taskId, days_ids, planned_start_times) {
    return instance.put(`/api/tasks/${taskId}/task-days/mass-update`, {days_ids, planned_start_times})
  },
  taskUpdateParams(taskId, description) {
    return instance.put(`/api/tasks/${taskId}/update-params`, {description})
  },
  checkActivation(phone, activation_code) {
    return instance.post(`/api/auth/check-activation-and-login`, {phone ,activation_code})
  },
  getAllTasks() {
    return instance.get('/api/tasks')
  },
  deleteTask(id) {
    return instance.delete(`/api/tasks/${id}`)
  },
  updateTask(id) {
    const data = {
      "end_date": new Date()
    }
    return instance.put(`/api/tasks/${id}`, {"is_accomplished": 1, data})
  },
  addWeeksToLatestTask() {
    return instance.post('/api/tasks/add-weeks', {weeks_number: 6})
  },
  getDocuments() {
    return instance.get('/api/documents')
  },
  getDownloadDocument(id) {
    return instance.get(`/api/documents/download/${id}`)
  }
};

