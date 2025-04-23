import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../context/ThemeContext";
import { Book } from "../../models/book.model";
import { getByAltText, render, screen } from "@testing-library/react";

const dummyBook: Book = {
  id: 1,
  title: "dummy book",
  img: 5,
  category_id: 1,
  form: "dummy form",
  isbn: "dummy isbn",
  summary: "dummy summary",
  detail: "dummy detail",
  author: "dummy author",
  page: 100,
  contents: "dummy contents",
  price: 10000,
  likes: 1,
  pubDate: "2023-10-01",
};

describe("BookItem", () => {
  it("렌더 여부", () => {
    render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
    expect(screen.getByAltText(dummyBook.title)).toHaveAttribute(
      "src",
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
