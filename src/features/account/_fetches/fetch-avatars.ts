"use server";
import createClient from "@/lib/supabase/server";

export async function fetchAvatars() {
  const avatars = [
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-1.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-2.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-3.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-4.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-5.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-6.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-7.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-8.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-9.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-10.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-11.png" },
    { src: "https://xtfoonhedzclnasbwjgd.supabase.co/storage/v1/object/public/avatar/avatar-12.png" },
  ];
  return avatars;
}
