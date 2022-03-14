import api from "@/configs/api";

class FetcherService {
  #api;

  constructor(api: { files: string }) {
    this.#api = api;
  }

  postFilesFormData(formData: FormData) {
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(this.#api.files, options);
  }
}

export default new FetcherService(api);
