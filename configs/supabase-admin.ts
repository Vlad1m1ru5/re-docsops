import { createClient } from "@supabase/supabase-js";
import getConfig from "next/config";

const configureSupabaseAdmin = () => {
  const { publicRuntimeConfig = {}, serverRuntimeConfig = {} } = getConfig();

  const { supabaseUrl = "" } = publicRuntimeConfig;
  const { supabaseKey = "" } = serverRuntimeConfig;

  return createClient(supabaseUrl, supabaseKey);
};

export default configureSupabaseAdmin();
