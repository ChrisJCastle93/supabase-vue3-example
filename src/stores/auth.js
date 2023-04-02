/* eslint-disable no-console */
import { ref } from "vue";
import { defineStore } from "pinia";
import SupabaseService from "../supabase";
import router from "../router/router";


export const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const session = ref({});
  const error = ref('');

  const setUser = (userParam, sessionParam) => {
    user.value = userParam;
    session.value = sessionParam;
  }

  const setError = (errorParam) => {
    error.value = errorParam
  }

  const verifySession = () => {
    const data = SupabaseService.verifySession();
    !data.session ? router.push('/auth/signup') : session.value = data.session;
  }
  return { user, session, setUser, setError, error, verifySession };
});
