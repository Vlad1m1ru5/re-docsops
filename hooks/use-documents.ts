import supabaseClient from "@/configs/supabase-client";
import type { Document } from "@/types";
import { useEffect, useState } from "react";

const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      const { data } = await supabaseClient.from<Document>("test").select("*");

      setDocuments(data ?? []);
    };
    handleAsync();
  }, [setDocuments]);

  return documents;
};

export default useDocuments;
