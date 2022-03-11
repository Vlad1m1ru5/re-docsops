import supabaseClient from "@/configs/supabase-client";
import type { Document } from "@/types";
import type { SupabaseClient } from "@supabase/supabase-js";

class DocumentsService {
  #supabaseClient: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.#supabaseClient = supabaseClient;
  }

  async getAllDocuments() {
    const { data } = await this.#supabaseClient
      .from<Document>("test")
      .select("*");

    return data ?? [];
  }

  async postDocument(documentDto: Partial<Document>) {
    const { status } = await this.#supabaseClient
      .from<Document>("test")
      .insert(documentDto);

    return;
  }
}

export default new DocumentsService(supabaseClient);
