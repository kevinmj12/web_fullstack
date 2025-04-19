import { styled } from "styled-components";

const Header = () => {
  const HeaderStyle = styled.header`
    background-color: ${({ theme }) => theme.color.background};
    h1 {
      color: ${({ theme }) => theme.color.primary};
    }
  `;

  return (
    <HeaderStyle>
      <h1>Book Store</h1>
    </HeaderStyle>
  );
};

export default Header;
