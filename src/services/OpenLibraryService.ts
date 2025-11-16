import {
  SearchReq,
  SearchRes,
  GetWorkReq,
  GetWorkRes,
  zodWorkSchema,
} from "../helpers/schema";
import { OpenLibraryBook, SearchResult } from "./models";
let openLibraryService: OpenLibraryService;

export class OpenLibraryService {
  private baseUrl = "https://openlibrary.org/";

  constructor() {
    this.baseUrl = "https://openlibrary.org/";
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

    const response = await fetch(
      `${this.baseUrl}/search.json?q=${req.query}&page=${page}&limit=${limit}`
    );

    const data = (await response.json()) as SearchResult;

    if (!data.docs || data.docs.length === 0) {
      throw `Invalid request. ${JSON.stringify(data)}.`;
    }

    console.log(data.docs.length);

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
  }

  public async getWork(req: GetWorkReq): Promise<GetWorkRes> {
    const response = await fetch(`${this.baseUrl}/works/${req.workId}.json`);
    return zodWorkSchema.parse(await response.json());
  }
}

export function getOpenLibraryService() {
  if (!openLibraryService) {
    openLibraryService = new OpenLibraryService();
  }
  return openLibraryService;
}
