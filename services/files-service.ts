import type { File } from "formidable";
import { readFile } from "fs/promises";

class FilesService {
  mapToFiles(file: File | File[]) {
    return Array.isArray(file) ? file : [file];
  }

  partitionMarkdownFiles(files: File[]) {
    const markdownFiles: File[] = [];
    const notMarkdownFiles: File[] = [];

    files.forEach((file) => {
      if (file.originalFilename?.endsWith(".md")) {
        return markdownFiles.push(file);
      }

      notMarkdownFiles.push(file);
    });

    return [markdownFiles, notMarkdownFiles];
  }

  read(file: File) {
    return readFile(file.filepath, "utf-8");
  }
}

export default new FilesService();
