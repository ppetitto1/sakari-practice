import {
  SearchReq,
  SearchRes,
  GetWorkReq,
  GetWorkRes,
  zodWorkSchema,
} from "../helpers/schema";
import { OpenLibraryBook, OpenLibraryOptions, SearchResult } from "./models";
let openLibraryService: OpenLibraryService;

export class OpenLibraryService {
  private baseUrl: string;
  private maxRetries: number;

  constructor(opts: OpenLibraryOptions) {
    this.baseUrl = opts.baseUrl ?? "https://openlibrary.org/";
    this.maxRetries = opts.maxRetries ?? 3;
  }

  private getPage(page: string): number {
    let pageNumber = parseInt(page || "1");
    if (pageNumber <= 0) {
      pageNumber = 1;
    }
    return pageNumber;
  }

  private getLimit(limit: string): number {
    let limitNumber = parseInt(limit || "10");
    if (limitNumber <= 0) {
      limitNumber = 10;
    }
    return limitNumber;
  }

  public async search(req: SearchReq): Promise<SearchRes> {
    const page = this.getPage(req.page);
    const limit = this.getLimit(req.limit);

    return await this.retry<SearchRes>(async () => {
      const response = await fetch(
        `${this.baseUrl}/search.json?q=${req.query}&page=${page}&limit=${limit}`
      );
      const data = (await response.json()) as SearchResult;
      if (!data.docs || data.docs.length === 0) {
        throw `Invalid request. ${JSON.stringify(data)}.`;
      }
      return {
        items: data.docs.map((val: OpenLibraryBook) => ({
          title: val.title,
          authors: val.author_name,
          firstPublishYear: val.first_publish_year,
          workId: val.key.split("/")[2],
        })),
        page: req.page || "1",
        limit: req.limit || "10",
        hasMore: data.docs.length === parseInt(req.limit || "10"),
      };
    });
  }

  public async getWork(req: GetWorkReq): Promise<GetWorkRes> {
    return await this.retry<GetWorkRes>(async () => {
      const response = await fetch(`${this.baseUrl}/works/${req.workId}.json`);
      return zodWorkSchema.parse(await response.json());
    });
  }

  private async retry<T>(fn: () => Promise<T>): Promise<T> {
    let error: Error | null = null;
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        error = error;
      }
    }
    throw new Error(
      `OpenLibraryService: Max retries reached. Failed to execute function. Error: ${
        error ? JSON.stringify(error) : "Unknown error"
      }`
    );
  }
}

export function getOpenLibraryService() {
  if (!openLibraryService) {
    openLibraryService = new OpenLibraryService({
      baseUrl: "https://openlibrary.org/",
      maxRetries: 3,
    });
  }
  return openLibraryService;
}
