import * as documentsServie from "@/services/documents-service";
import type { Document } from "@/types";
import { useEffect, useState } from "react";

const useDocumets = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      const documents = await documentsServie.findAll();
      setDocuments(documents);
    };
    handleAsync();
  }, []);

  return documents;
};

export default useDocumets;
