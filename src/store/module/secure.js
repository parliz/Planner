/* eslint-disable no-unused-vars */
// import axios from 'axios'
// import db from '@/db/idb.js'
// import service from '@/services/service.js'

export const namespaced = true;

export const state = {
  login: localStorage.getItem('login') || '',
}

export const getters = {
  isLoggedIn: function (state) {
    return !!state.login
  }
}

export const actions = {
  login({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      localStorage.setItem('login', user.login);
      commit('SET_LOGIN', user.login);
      if (user.login.startsWith("123") || !user.login || !user.password) {
        reject("Неверный логин или пароль");
      } else {
        resolve();
      }
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('login');
      commit('LOGOUT');
      //   delete axios.defaults.headers.common['Authorization'];
      resolve();
    })
  },
  fetchUserInfo({ commit, dispatch }) {
    // return new Promise((resolve, reject) => {
    //   if (this.secure && this.secure.state.user) resolve(this.secure.state.user)
    //   else db.get('user')
    //     .then((result) => { commit('SET_USER', result); resolve(result) })
    //     .catch((e) => {
    //       reject(new Error('Требуется аутентификация.'))
    //     })
    // })
  }
}

export const mutations = {
  SET_LOGIN(state, login) {
    state.login = login;
  },
  LOGOUT(state) {
    state.user = {};
    state.login = '';
  }
}
