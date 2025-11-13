import { ZodObject } from "zod";

export interface Book {
  title: string;
  authors: string[];
}

export interface SchemaRegistration {
  name: string;
  schema: ZodObject;
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

export interface SearchReq {
  query: string;
  page: number;
  limit: number;
}

export interface SearchRes {
  items: Book[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface GetWorkReq {
  workId: string;
}

export interface GetWorkRes {
  workId: string;
  title: string;
  description: string;
  subjects: string[];
  authors: string[];
  firstPublishYear: number;
}

export interface GetBookReq {
  workId: string;
}

export interface GetBookRes {
  workId: string;
  title: string;
  description: string;
  subjects: string[];
  authors: string[];
  firstPublishYear: number;
}

export interface GetBooksReq {
  page?: number;
  limit?: number;
}

export interface GetBooksRes {
  items: Book[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface UpsertBookReq {
  workId: string;
  title: string;
  authors: string[];
  firstPublishYear: number;
}

export interface UpsertBookRes {
  workId: string;
  title: string;
  authors: string[];
  firstPublishYear: number;
  description: string;
  subjects: string[];
}

export interface UpsertFavoriteReq {
  workId: string;
  message: string;
}

export interface UpsertFavoriteRes {
  workId: string;
  message: string;
}

export interface GetFavoritesReq {
  page: number;
  limit: number;
}

export interface GetFavoritesRes {
  items: Favorite[];
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Favorite {
  workId: string;
  message: string;
}
