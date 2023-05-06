/* eslint-disable no-unused-vars */
import axios from 'axios'
// import db from '@/db/idb.js'
// import service from '@/services/service.js'

export const namespaced = true;

export const state = {
  login: localStorage.getItem('login') || '',
  token: localStorage.getItem('token') || null,
}

export const getters = {
  isLoggedIn: function (state) {
    return state.token !== null
  }
}

export const actions = {
  login (context, credentials) {
    return new Promise((resolve, reject) => {
      axios.post(`http://localhost:5000/api/login`, { email: credentials.email, password: credentials.password})
      .then(function (oResponse) {
        console.log(oResponse)
        state.token = oResponse.data.token;
        localStorage.setItem('token', oResponse.data.token);
        resolve(oResponse)
      })
      .catch((oError) => {
        console.log(oError)
        reject(oError)
      })
    })

  },
  // login({ commit, dispatch }, user) {
  //   return new Promise((resolve, reject) => {
  //     localStorage.setItem('login', user.login);
  //     commit('SET_LOGIN', user.login);
  //     if (user.login.startsWith("123") || !user.login || !user.password) {
  //       reject("Неверный логин или пароль");
  //     } else {
  //       resolve();
  //     }
  //   })
  // },
  logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      state.token = null;
      // commit('LOGOUT');
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

// export const mutations = {
//   SET_LOGIN(state, login) {
//     state.login = login;
//   },
//   LOGOUT(state) {
//     state.user = {};
//     state.login = '';
//   }
// }
