import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagenation.model";
import { httpClient } from "./http";

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params: params,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  try {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post("/likes", { bookId });
  return response.data;
};

export const removeLikeBook = async (bookId: number) => {
  const response = await httpClient.delete("/likes", { data: { bookId } });
  return response.data;
};
