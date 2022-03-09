import documentsService from "@/services/documents-service";
import type { Document } from "@/types";
import { useEffect, useState } from "react";

const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      const documents = await documentsService.getAllDocuments();
      setDocuments(documents);
    };
    handleAsync();
  }, []);

  return documents;
};

export default useDocuments;
