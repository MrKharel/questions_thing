import { createClient } from "@supabase/supabase-js";

const url = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const serviceRolekey = process.env["NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY"]!;
if (!url || !serviceRolekey) throw new Error("Service role key and url both must be present");

export default function supabaseAdmin() {
	return createClient(url, serviceRolekey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
	});
}
