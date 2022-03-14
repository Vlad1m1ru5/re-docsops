import type { File } from "formidable";
import { readFile } from "fs/promises";

class LocalFilesService {
  mapToFiles(file: File | File[]) {
    return Array.isArray(file) ? file : [file];
  }

  partitionMarkdownFiles(files: File[]) {
    const markdownFiles: File[] = [];
    const resourceFiles: File[] = [];

    files.forEach((file) => {
      if (file.originalFilename?.endsWith(".md")) {
        return markdownFiles.push(file);
      }

      resourceFiles.push(file);
    });

    return [markdownFiles, resourceFiles];
  }

  read(file: File) {
    return readFile(file.filepath, "utf-8");
  }
}

export default new LocalFilesService();
