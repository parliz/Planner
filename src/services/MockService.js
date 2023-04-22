import axios from "axios";
import { mapState } from 'vuex'

const bRunDBMock = true;
// let AccessToken = this.$store.state.userToken;
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2ODIxNzYxNDIsImV4cCI6MTY4MjI2MjU0Mn0.bNVuddcyAdw9nzA-BlvwEp8MdCC8rRKnqy2tNfS4ja8";
let apiClient;

if (bRunDBMock) {
  apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: false,
    headers: {
      Accept: '*/*',
      Authorization: "Bearer "+ accessToken
    }
  });
}

let oTempData = {
  "user": {
    "id": "12345",
    "name": "Исакова Мария",
    "language": {
      "key": "ru",
      "text": "Русский"
    }
  },
  "tasks": [
    {
      "taskId": "1",
      "taskDate": "12.02.2023",
      "timeStart": "8.30",
      "timeEnd": "",
      "taskText": "Выучить 20 англ слов",
      "taskDone": false
    },
    {
      "taskId": "2",
      "taskDate": "12.02.2023",
      "timeStart": "",
      "timeEnd": "",
      "taskText": "Выгулить собаку",
      "taskDone": true
    },
    {
      "taskId": "3",
      "taskDate": "12.02.2023",
      "timeStart": "",
      "timeEnd": "",
      "taskText": "Помыть посуду",
      "taskDone": true
    },

  ]
};

export default {
  setUser(newUser) {
    return apiClient.post("/api/user", newUser);
  },
  getUser(user) {
    return apiClient.post("/api/login", user);
  },
  getTasksByDay(day) {
    return apiClient.get(`api/tasks/${day}`);

  },
  setNewTask(task) {
    if (bRunDBMock) {
      return apiClient.post("/tasks/addNewTask", task);
    }
  },
  getTask(){
    return apiClient.get(`/api/task/1`);
  }
}
