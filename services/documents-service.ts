import supabaseClient from "@/configs/supabase-client";
import type { Document } from "@/types";

const findAll = async () => {
  const { data } = await supabaseClient.from<Document>("test").select("*");
  return data ?? [];
};

export { findAll };
