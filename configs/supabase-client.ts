import { createClient } from "@supabase/supabase-js";
import getConfig from "next/config";

const configureSupabaseClient = () => {
  const { publicRuntimeConfig = {} } = getConfig();

  const { supabaseUrl = "", supabaseKey = "" } = publicRuntimeConfig;

  return createClient(supabaseUrl, supabaseKey);
};

export default configureSupabaseClient();
