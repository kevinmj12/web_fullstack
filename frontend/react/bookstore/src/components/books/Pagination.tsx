import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagenation.model";

import Button from "../common/Button";
import { LIMIT } from "../../constants/pagination";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

interface PaginationProps {
  pagination: IPagination;
}

const Pagination: React.FC<PaginationProps> = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalCount, currentPage } = pagination;
  const pages = Math.ceil(totalCount / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li>
                <Button
                  key={index}
                  size="small"
                  scheme="normal"
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default Pagination;
