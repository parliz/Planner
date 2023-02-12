import axios from "axios";

const bRunDBMock = true;
let apiClient;

if (bRunDBMock) {
  apiClient = axios.create({
    baseURL: 'http://localhost:4004',
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
      "id": "1",
      "date": "12.02.2023",
      "timeStart": "",
      "timeEnd": "",
      "taskText": "Выучить 20 англ слов",
      "isTaskDone": false
    },

  ]
};

export default {
  getUser() {
    if (bRunDBMock) {
      return apiClient.get("/user");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["user"]
      });
    });
  },
  getShipments() {
    if (bRunDBMock) {
      return apiClient.get("/shipments");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["shipments"]
      });
    });
  },
  getBalance() {
    if (bRunDBMock) {
      return apiClient.get("/balance");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["balance"]
      });
    });
  },
  getShipment(sId) {
    if (bRunDBMock) {
      return apiClient.get("/shipments/" + sId);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["shipments"].find(oTempRow => oTempRow.id === sId)
      });
    });
  },
  getShipmentHistory(sId) {
    if (bRunDBMock) {
      return apiClient.get("/shipmentsHistory/" + sId);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["shipmentsHistory"].find(oTempRow => oTempRow.id === sId)
      });
    });
  },
  getUnpaidBills() {
    if (bRunDBMock) {
      return apiClient.get("/unpaidBills");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["unpaidBills"]
      });
    });
  },
  getPaymentHistory() {
    if (bRunDBMock) {
      return apiClient.get("/paymentHistory");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["paymentHistory"]
      });
    });
  },
  getShipmentDocuments(sId) {
    if (bRunDBMock) {
      return apiClient.get("/shipmentDocuments/" + sId);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["shipmentDocuments"].find(oTempRow => oTempRow.id === sId)
      });
    });
  },
  getRequests() {
    if (bRunDBMock) {
      return apiClient.get("/conversations");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["conversations"]
      });
    });
  },
  getRequest(sId) {
    if (bRunDBMock) {
      return apiClient.get("/conversations/" + sId);
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["conversations"].find(oTempRow => oTempRow.id === sId)
      });
    });
  },
  sendMessage() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 5000)
    });
  },
  createRequest(oRequest) {
    if (bRunDBMock) {
      return apiClient.post("/conversations", oRequest);
    }
    return new Promise((resolve) => {
      oTempData["conversations"].push(oRequest);
      resolve({
        data: oRequest
      });
    });

  },
  getBalanceData() {
    if (bRunDBMock) {
      return apiClient.get("/balanceReportData");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["balanceReportData"]
      });
    });
  },
  getClientBalanceReportData() {
    if (bRunDBMock) {
      return apiClient.get("/clientBalanceReportData");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["clientBalanceReportData"]
      });
    });
  },
  getPaymentPeriodData() {
    if (bRunDBMock) {
      return apiClient.get("/paymentPeriodData");
    }
    return new Promise((resolve) => {
      resolve({
        data: oTempData["paymentPeriodData"]
      });
    });
  },
}
