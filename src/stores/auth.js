import { defineStore } from "pinia";
import SupabaseService from "@/services/supabase";
import router from "@/router/router";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    error: null,
    sessionMessage: ''
  }),
  actions: {
    setUser(userParam, sessionParam) {
      this.user = userParam;
      this.session = sessionParam;
    },

    setError(errorParam) {
      this.error = errorParam
      setTimeout(() => {
        this.setError(null);
      }, 5000);
    },

    setSessionMessage(msg) {
      this.sessionMessage = msg
      setTimeout(() => {
        this.setError(null);
      }, 5000);
    },

    async verifySession() {
      if (!this.session) {
        const { data } = await SupabaseService.verifySession();
        if (data.session) this.session = data.session;
      }
    },

    async getUser() {
      if (!this.user && this.session) {
        const { data } = await SupabaseService.getUser();
        if (data.user) this.user = data.user;
      }
    },

    async userSignup(email, password) {
      const { data, error } = await SupabaseService.userSignup(email, password);
      if (data.user) {
        this.setUser(data.user, data.session);
        router.push('/auth/protected')
      } else if (error.message) {
        this.setError(error.message);
      }
    },

    async userSignin(email, password) {
      const { data, error } = await SupabaseService.userSignin(email, password);
      if (data.user) {
        this.setUser(data.user, data.session);
        router.push('/auth/protected')
      } else if (error.message) {
        this.setError(error.message);
      }
    },

    async userSignout() {
      const { error } = await SupabaseService.userSignout();
      this.session = null;
      this.user = null;
      this.setSessionMessage('You have been signed out.')
      if (error) console.log(error)
      router.push('/')
    },
  }
}
);
