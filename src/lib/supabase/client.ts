import { createBrowserClient } from "@supabase/ssr";

const url = process.env["NEXT_PUBLIC_SUPABASE_URL"]!;
const anonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]!;

if (!url || !anonKey) {
  console.error("Missing supabase environment variables.");
}

const createClient = async () => {
  return createBrowserClient(url, anonKey);
};

export default createClient;
