import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import Empty from "../common/Empty";

const BooksEmpty = () => {
  return (
    //  <BooksEmptyStyle>
    //   <div className="icon">
    //     <FaSmileWink />
    //   </div>
    //   <Title size="large" color="secondary">
    //     검색 결과가 없습니다.
    //   </Title>
    //   <p>
    //     <Link to="/books">전체 검색 결과로 이동</Link>
    //   </p>
    // </BooksEmptyStyle>
    <Empty
      title="검색 결과가 없습니다."
      icon={<FaSmileWink />}
      description={<Link to="/books">전체 검색 결과로 이동</Link>}
    />
  );
};

// const BooksEmptyStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   padding: 120px 0;

//   .icon {
//     svg {
//       font-size: 4rem;
//       fill: #ccc;
//     }
//   }
// `;

export default BooksEmpty;
