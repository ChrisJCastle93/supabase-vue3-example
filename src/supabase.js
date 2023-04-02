import { createClient } from '@supabase/supabase-js'

class Service {
    constructor(supabaseUrl, supabaseAnonKey) {
        this.supabase = createClient(supabaseUrl, supabaseAnonKey)
    }

    async verifySession() {
        const { data } = await this.supabase.auth.getSession()
        return data;
    }
}

const SupabaseService = new Service(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export const supabase = SupabaseService.supabase;
export default SupabaseService;
