import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseBrowser = () => {
	return createClient(supabaseUrl, supabaseAnonKey, {
		auth: { persistSession: true, autoRefreshToken: true },
	});
};

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
