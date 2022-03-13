import incomingForm from "@/configs/incoming-form";
import type { File } from "formidable";
import type IncomingForm from "formidable/Formidable";
import type { IncomingMessage } from "http";

class HttpFilesService {
  #incomingForm;

  constructor(incomingForm: IncomingForm) {
    this.#incomingForm = incomingForm;
  }

  getFileByFileName(incomingMessage: IncomingMessage, fileName: string) {
    return new Promise<File | File[]>((resolve, reject) => {
      this.#incomingForm.parse(incomingMessage, (err, _, files) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        if (!Object.getOwnPropertyNames(files).includes(fileName)) {
          const err = new Error(`File name "${fileName}" not found`);
          console.error(err);
          return reject(err);
        }

        resolve(files[fileName]);
      });
    });
  }
}

export default new HttpFilesService(incomingForm);
