// /store/user.js

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    async updateUser(user) {
      this.user = user;
    },
  },
});