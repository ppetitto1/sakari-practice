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

  public async search(req: SearchReq): Promise<SearchRes> {
    // It's not respecting limits... need to debug; no time right now.
    const response = await fetch(
      `${this.baseUrl}/search.json?q=${req.query}&page=${req.page}&limit=${req.limit}`
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
      page: req.page || "0",
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
