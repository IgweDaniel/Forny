import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
    token: localStorage.getItem("token"),
    user: null
  },
  mutations: {
    createNotification(state, payload) {
      const id = `${new Date()} ${state.notifications.length + 1}`;
      state.notifications.unshift({ ...payload, id });
    },
    deleteNotification(state, payload) {
      state.notifications = state.notifications.filter(
        notification => notification.id != payload.id
      );
    },
    addAuth(state, payload) {
      state.user = payload.user;
      state.token = payload.access_token;
    },
    removeAuth(state) {
      state.user = null;
      state.token = null;
    },
    updateUser(state, payload) {
      state.user = payload.user;
    }
  },
  actions: {
    notify({ commit }, { message, type }) {
      commit("createNotification", { message, type });
    },
    unotify({ commit }, id) {
      commit("deleteNotification", { id });
    },
    login({ commit }, data) {
      commit("addAuth", data);
    },
    logout({ commit }) {
      commit("removeAuth");
    },
    setUser({ commit }, user) {
      commit("updateUser", { user });
    }
  },
  modules: {}
});
