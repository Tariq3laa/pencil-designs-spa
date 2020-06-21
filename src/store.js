import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    news: null,
    token: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_user(state, payload) {
      state.user = payload;
    },
    SET_news(state, payload) {
      state.news = payload;
    },
    SET_token(state, payload) {
      state.token = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/login", {
            email: payload.email,
            password: payload.password
          })
          .then(res => {
            commit("SET_token", res.data.access_token);
            commit("SET_user", res.data.user);
            commit("SET_news", res.data.news);
            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    performAddAction({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/news/add", {
            title: payload.title,
            body: payload.body,
            token: state.token
          })
          .then(res => {
            console.log(res.data.news);
            commit("SET_news", res.data.news);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    performLogoutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/logout", {
            token: state.token
          })
          .then(res => {
            commit("SET_token", null);
            commit("SET_loggedIn", false);
            commit("SET_user", null);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteNewAction({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/news/delete", {
            id: id,
            token: state.token
          })
          .then(res => {
            commit("SET_news", res.data.news);
            location.reload();
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateNewAction({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/news/update", {
            id: payload.id,
            title: payload.title,
            body: payload.body,
            token: state.token
          })
          .then(res => {
            commit("SET_news", res.data.news);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  getters: {
    get_loggedIn: state => state.loggedIn,
    get_user: state => state.user,
    get_news: state => state.news
  }
});
