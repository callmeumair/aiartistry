import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is required`);
    }
    return value;
}

export const supabaseBrowser = (): SupabaseClient => {
    const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    const supabaseAnonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: true, autoRefreshToken: true },
    });
};

export const getSupabaseAdmin = (): SupabaseClient => {
    const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    const supabaseServiceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    return createClient(supabaseUrl, supabaseServiceRoleKey);
};
