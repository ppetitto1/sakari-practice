//Implement mongoose middle layer

import { FastifyInstance } from "fastify";
import { Mongoose } from "mongoose";
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
} from "../helpers/models";

export default class MongooseService {
  private mongoose: Mongoose;
  constructor(fastify: FastifyInstance) {
    this.mongoose = fastify.mongoose;
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
