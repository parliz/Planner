import axios from "axios";

const bRunDBMock = true;
let apiClient;

if (bRunDBMock) {
  apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: false,

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
    if (bRunDBMock) {
      return apiClient.post("/api/user", newUser);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["user"]
      });
    });
  },
  getUser(user) {
    if (bRunDBMock) {
      return apiClient.get("/api/user", user);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["user"]
      });
    });
  },
  getTasksByDay(userId, day) {
    if (bRunDBMock) {
      return apiClient.get("/shipments");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["tasks"]
      });
    });
  },
  setNewTask(task) {
    if (bRunDBMock) {
      return apiClient.post("/tasks/addnNewTask", task);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["tasks"]
      });
    });
  }
}
