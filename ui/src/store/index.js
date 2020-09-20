import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notifications: [],
  },
  mutations: {
    createNotification(state, payload) {
      const id = `${new Date()} ${state.notifications.length + 1}`;
      state.notifications.unshift({ ...payload, id });
    },
    deleteNotification(state, payload) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id != payload.id
      );
    },
  },
  actions: {
    notify({ commit }, { message, type }) {
      commit("createNotification", { message, type });
    },
    unotify({ commit }, id) {
      commit("deleteNotification", { id });
    },
  },
  modules: {},
});
