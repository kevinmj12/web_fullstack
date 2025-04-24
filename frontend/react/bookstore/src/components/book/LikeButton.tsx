import styled from "styled-components";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";
import { BookDetail } from "../../models/book.model";

interface LikeButtonProps {
  book: BookDetail;
  onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ book, onClick }) => {
  return (
    <LikeButtonStyle
      size="medium"
      scheme={book.liked ? "like" : "normal"}
      onClick={() => {
        onClick();
      }}
    >
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
};

const LikeButtonStyle = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
