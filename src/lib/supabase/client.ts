import { createBrowserClient } from "@supabase/ssr";

const url = process.env["SUPABASE_URL"]!;
const anonKey = process.env["SUPABASE_ANON_KEY"]!;
if (!url || !anonKey) console.error("No environment variables found.");

export default function createClient() {
  return createBrowserClient(url, anonKey);
}
