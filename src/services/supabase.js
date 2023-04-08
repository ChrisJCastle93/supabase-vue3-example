import { createClient } from '@supabase/supabase-js'

class Service {
    constructor(supabaseUrl, supabaseAnonKey) {
        this.supabase = createClient(supabaseUrl, supabaseAnonKey)
    }

    verifySession() {
        return this.supabase.auth.getSession();
    }

    userSignup(email, password) {
        return this.supabase.auth.signUp({
            email,
            password,
        });
    }

    userSignin(email, password) {
        return this.supabase.auth.signInWithPassword({
            email,
            password,
        })
    }

    userSignout() {
        return this.supabase.auth.signOut();
    }

    getUser() {
        return this.supabase.auth.getUser();
    }

    resetPassword(email) {
        return this.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'localhost:5178/',
        })
    }

    updatePassword(password) {
        console.log("SERVICE UPDATING PW:", password)
        return this.supabase.auth.updateUser({ password })

    }
}

const SupabaseService = new Service(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export const supabase = SupabaseService.supabase;
export default SupabaseService;
