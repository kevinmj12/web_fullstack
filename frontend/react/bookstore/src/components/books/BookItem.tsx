import styled from "styled-components";
import { Book } from "@/models/book.model";
import { getImgSrc } from "@/utils/image";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa";
import { ViewMode } from "./BooksViewSwitcher";
import { Link } from "react-router-dom";

interface BookItemProps {
  book: Book;
  view?: ViewMode;
}

const BookItem: React.FC<BookItemProps> = ({ book, view }) => {
  return (
    <Link to={`/book/${book.id}`}>
      <BookItemStyle view={view}>
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="content">
          <h2 className="title">{book.title}</h2>
          <p className="summary">{book.summary}</p>
          <p className="author">{book.author}</p>
          <p className="price">{formatNumber(book.price)}원</p>
          <div className="likes">
            <FaHeart />
            <span className="like-count">{book.likes}</span>
          </div>
        </div>
      </BookItemStyle>
    </Link>
  );
};

const BookItemStyle = styled.div<Pick<BookItemProps, "view">>`
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === "grid" ? "column" : "row")};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    color: inherit;
  }

  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: ${({ view }) => (view === "grid" ? "100%" : "160px")};
    flex-shrink: 0;

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }

  .content {
    padding: 16px;
    position: relative;
    flex: ${({ view }) => (view === "grid" ? 0 : 1)};
    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .summary,
    .author,
    .price {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
      margin-bottom: 4px;
    }

    .price {
      font-weight: 700;
    }

    .likes {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.primary};
      font-weight: 700;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute;
      bottom: 16px;
      right: 16px;

      svg {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;

export default BookItem;
