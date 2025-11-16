//Implement mongoose middle layer

import { zodSchema } from "@zodyac/zod-mongoose";
import {
  GetBookReq,
  GetBookRes,
  GetBooksReq,
  GetBooksRes,
  GetFavoritesReq,
  GetFavoritesRes,
  UpsertBookReq,
  UpsertBookRes,
  UpsertFavoriteReq,
  UpsertFavoriteRes,
  MongooseAuth,
} from "../helpers/models";
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

  public async initModels(): Promise<MongooseService> {
    this.mongoose.model("Book", zodSchema(zodBookSchema));
    this.mongoose.model("Favorite", zodSchema(zodFavoriteSchema));
    return this;
  }

  public async getBooks(req: GetBooksReq): Promise<GetBooksRes> {
    const books = await this.mongoose
      .model("Book")
      .find({})
      .skip(req.page || 0)
      .limit(req.limit || 10);
    return {
      items: books,
      page: req.page || 0,
      limit: req.limit || 10,
      hasMore: books.length === (req.limit || 10),
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
    const favorites = await this.mongoose
      .model("Favorite")
      .find({})
      .skip(req.page)
      .limit(req.limit);
    return {
      items: favorites,
      page: req.page,
      limit: req.limit,
      hasMore: favorites.length === req.limit,
    };
  }
}
