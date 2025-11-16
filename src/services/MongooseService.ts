//Implement mongoose middle layer

import { zodSchema } from "@zodyac/zod-mongoose";
import { MongooseAuth } from "./models";
import {
  GetBooksReq,
  GetBooksRes,
  UpsertBookReq,
  UpsertBookRes,
  GetBookReq,
  GetBookRes,
  UpsertFavoriteReq,
  UpsertFavoriteRes,
  GetFavoritesReq,
  GetFavoritesRes,
} from "../helpers/schema";
import mongoose from "mongoose";
import { zodBookSchema, zodFavoriteSchema } from "../helpers/schema";

export default class MongooseService {
  private mongoose: typeof mongoose;
  private auth: MongooseAuth;
  constructor(auth: MongooseAuth) {
    this.mongoose = mongoose;
    this.auth = auth;
  }

  public async connect(): Promise<MongooseService> {
    this.mongoose = await this.mongoose.connect(this.auth.MONGO_URI);
    await this.initModels();
    return this;
  }

  public async disconnect(): Promise<MongooseService> {
    await this.mongoose.disconnect();
    return this;
  }

  public getReadyState(): number {
    return this.mongoose.connection.readyState;
  }

  public async initModels(): Promise<MongooseService> {
    this.mongoose.model("Book", zodSchema(zodBookSchema));
    this.mongoose.model("Favorite", zodSchema(zodFavoriteSchema));
    return this;
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

  public async getBooks(req: GetBooksReq): Promise<GetBooksRes> {
    const page = this.getPage(req.page);
    const limit = this.getLimit(req.limit);
    const books = await this.mongoose
      .model("Book")
      .find({})
      .skip(page | 1)
      .limit(limit);
    return {
      items: books,
      page: page.toString(),
      limit: limit.toString(),
      hasMore: books.length === limit,
    };
  }

  public async upsertBook(req: UpsertBookReq): Promise<UpsertBookRes> {
    const book = await this.mongoose
      .model("Book")
      .findOneAndUpdate({ workId: req.workId }, req, {
        upsert: true,
        new: true,
      });
    return book;
  }

  public async getBook(req: GetBookReq): Promise<GetBookRes> {
    const book = await this.mongoose
      .model("Book")
      .findOne({ workId: req.workId });
    return book;
  }

  public async upsertFavorite(
    req: UpsertFavoriteReq
  ): Promise<UpsertFavoriteRes> {
    const favorite = await this.mongoose
      .model("Favorite")
      .findOneAndUpdate({ workId: req.workId }, req, { upsert: true });
    return favorite;
  }

  public async getFavorites(req: GetFavoritesReq): Promise<GetFavoritesRes> {
    const page = this.getPage(req.page);
    const limit = this.getLimit(req.limit);
    const favorites = await this.mongoose
      .model("Favorite")
      .find({})
      .skip(page)
      .limit(limit);

    return {
      items: favorites,
      page: page.toString(),
      limit: limit.toString(),
      hasMore: favorites.length === limit,
    };
  }
}
