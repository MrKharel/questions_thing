import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env["NEXT_PUBLIC_DB_URL"];
const supabaseAnonKey = process.env["NEXT_PUBLIC_DB_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing Supabase environment variables");
}

const createClient = async () => {
	return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

export { createClient };
