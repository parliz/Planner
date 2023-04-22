import Vue from 'vue';
import Vuex from 'vuex';
// import * as balance from '@/store/module/balance.js';
import * as secure from '@/store/module/secure.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // balance,
    secure
  },
  state: {
    user: {},
    userToken: "",
    headerParams: {
      title: "",
      isNavBack: true,      
    },
    stateValue: {
      None: "default",
      Success: "success",
      Error: "error",
      Warning: "warning",
    }
  },
  getters: {
  },
  mutations: {
    setHeaderParams(state, params) {
      state.headerParams = params;
      document.title = params.title;
    }
  },
  actions: {
  }
})

