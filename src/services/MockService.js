import axios from "axios";

import ApiService from "@/services/ApiService";

let oTempData = {
  user: {
    id: "12345",
    name: "Исакова Мария",
    language: {
      key: "ru",
      text: "Русский"
    }
  },
  tasks: [
    {
      taskId: "1",
      taskDate: "12.02.2023",
      timeStart: "8.30",
      timeEnd: "",
      taskText: "Выучить 20 англ слов",
      taskDone: false
    },
    {
      taskId: "2",
      taskDate: "12.02.2023",
      timeStart: "",
      timeEnd: "",
      taskText: "Выгулить собаку",
      taskDone: true
    },
    {
      taskId: "3",
      taskDate: "12.02.2023",
      timeStart: "",
      timeEnd: "",
      taskText: "Помыть посуду",
      taskDone: true
    }
  ]
};

export default {
  setUser(newUser) {
    return ApiService.post(`/api/newUser`, newUser);
  },
  getUser(user) {
    return ApiService.post(`/api/user`, user);
  },
  getUsers() {
    return ApiService.get(`/api//users`)
  },
  getTasksByDay(day) {
    return ApiService.get(`api/task/${day}`);
  },
  addNewTask(task) {
    return ApiService.post(`api/task`, task);
  },
  getTask() {
    return ApiService.get(`/api/task/1`);
  },
  taskUpdateFromCalendar(taskId, update) {
    return ApiService.put(`/api/task/${taskId}`, update);
  },
  deleteTaskFromCalendar(taskId) {
    return ApiService.delete(`/api/task/${taskId}`);
  },
  createProject(project) {
    return ApiService.post(`/api/project/`, project);
  },
  getAllMyProjects() {
    return ApiService.get(`/api/projects/`)
  },
  getProjectDetail(id) {
    return ApiService.get(`/api/project/${id}`);
  },
  addProjectTask(projectId, task){
    return ApiService.post(`/api/projectTask/${projectId}`, task);
  },
  changeTaskStatus(taskId, taskStatus) {
    return ApiService.put(`/api/projectTask/${taskId}`, taskStatus);
  },
  changeTaskPriority(taskId, taskPriority) {
    return ApiService.put(`/api/projectTaskPriority/${taskId}`, taskPriority);
  },
  changeTaskResponsible(taskId, taskResponsible) {
    return ApiService.put(`/api/projectTaskResponsible/${taskId}`, taskResponsible);
  },
  getTaskDetail(taskId) {
    return ApiService.get(`/api/projectTask/${taskId}`);
  },
  getProjectParticipants(projectId) {
    return ApiService.get(`/api/projectTaskParticipants/${projectId}`);
  },
  postNewComment(comment) {
    return ApiService.post(`/api/projectTaskComment/`, comment);
  },
  createList(list) {
    return ApiService.post(`/api/list/`, list);
  },
  getAllMyLists() {
    return ApiService.get(`/api/lists/`)
  },
  createListItem(listItem) {
    return ApiService.post(`/api/listItem/`, listItem)
  },
  getListDetails(listId) {
    return ApiService.get(`/api/listItem/${listId}`)
  }
};
