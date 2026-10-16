import { done } from "@/lib/api";

import { Profile } from "@/lib/types";

const data: Profile = {
  id: "1",
  username: "ajeshkharel",
  display_name: "Ajesh Kharel",
  email: "ajeshkharel5@gmail.com",
  avatar: null,
  bio: "Nothing serious, and interesting. Just living my life.",
  location: "Jhapa, Nepal",
  created_at: "2059-12-26T06:15:26Z",
  updated_at: "2059-12-26T06:15:26Z",
};

export const GET = async () => {
  return done(data, 200);
};

export const PATCH = async () => {
  const patchedData = { ...data, username: "AjeshKharel" };
  return done(patchedData, 200);
};
