import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";
import { useIsMobile } from "./useMediaQuery";

interface BooksListProps {
  books: Book[];
}

const BooksList: React.FC<BooksListProps> = ({ books }) => {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  const { isMobile } = useIsMobile();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  return (
    <BooksListStyle view={view} isMobile={isMobile}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view={view} />
      ))}
    </BooksListStyle>
  );
};

interface BooksListStyleProps {
  view: ViewMode;
  isMobile: boolean;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view, isMobile }) =>
    view === "grid"
      ? isMobile
        ? "repeat(2, 1fr)"
        : "repeat(4, 1fr)"
      : "repeat(1, 1fr)"};
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: ${({ view }) =>
      view === "grid" ? "repeat(2, 1fr)" : "repeat(1, 1fr)"};
  }
`;

export default BooksList;
