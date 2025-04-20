import styled from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface TitleProps {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title: React.FC<TitleProps> = ({ children, size }) => {
  return <TitleStyle size={size}>{children}</TitleStyle>;
};

const TitleStyle = styled.h1<Omit<TitleProps, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;

export default Title;
