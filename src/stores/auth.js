import { defineStore } from "pinia";
import SupabaseService from "@/services/supabase";
import router from "@/router/router";


export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    session: null,
    error: null,
    sessionMessage: {
      message: '',
      type: ''
    }
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

    setSessionMessage(msg, type) {
      this.sessionMessage = {
        message: msg,
        type
      }
      setTimeout(() => {
        this.sessionMessage = {
          message: null,
          type: null,
        };
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
      if (error) {
        this.setError(error);
      } else {
        this.setSessionMessage('You have been signed out.', 'success')
        router.push('/')
      }
    },

    resetPassword(email) {
      SupabaseService.resetPassword(email);
    },

    async updatePassword(password) {
      const { error } = await SupabaseService.updatePassword(password);
      if (error) {
        this.setError(error);
      } else {
        this.setSessionMessage('Successfully updated password. You are logged in.', 'success')
        router.push('/')
      }
    }
  }
}
);
