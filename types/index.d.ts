export interface Metadata extends Record<string, any> {}

export interface Document {
  data: Metadata;
  content: string;
}
