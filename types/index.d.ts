export interface Metadata extends Record<string, unknown> {}

export interface Document {
  data: Metadata;
  content: string;
}
