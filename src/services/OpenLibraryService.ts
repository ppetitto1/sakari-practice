import {
  Book,
  GetWorkReq,
  GetWorkRes,
  SearchReq,
  SearchResult,
} from "../helpers/models";
import { zodWorkSchema } from "../helpers/schema";
let openLibraryService: OpenLibraryService;

export class OpenLibraryService {
  private baseUrl = "https://openlibrary.org/";

  constructor() {
    this.baseUrl = "https://openlibrary.org/";
  }

  public async search(req: SearchReq): Promise<Book[]> {

    // It's not respecting limits... need to debug; no time right now.
    const response = await fetch(
      `${this.baseUrl}/search.json?q=${req.query}&page=${req.page}&limit=${req.limit}`
    );

    const data = (await response.json()) as SearchResult;

    if (!data.docs || data.docs.length === 0) {
      throw `Invalid request. ${JSON.stringify(data)}.`;
    }

    console.log(data.docs.length);

    return data.docs.map((val: any) => ({
      title: val.title,
      authors: val.author_name,
      firstPublishYear: val.first_publish_year,
      subjects: val.subject,
    })) as Book[];
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
