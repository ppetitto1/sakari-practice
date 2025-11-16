export interface Book {
  title: string;
  authors: string[];
}

export interface MongooseAuth {
  MONGO_URI: string;
}

export interface OpenLibraryOptions {
  baseUrl?: string;
  maxRetries?: number;
}

export interface SearchResult {
  level: number;
  time: number;
  pid: number;
  hostname: string;
  reqId: string;
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: number | null;
  docs: OpenLibraryBook[];
}

export interface OpenLibraryBook {
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  ebook_access: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_collection_s: string;
  key: string;
  language: string[];
  lending_edition_s: string;
  lending_identifier_s: string;
  public_scan_b: boolean;
  title: string;
  id_standard_ebooks: string[];
}
