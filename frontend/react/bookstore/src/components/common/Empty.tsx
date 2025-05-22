import styled from "styled-components";
import Title from "./Title";

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ icon, title, description }) => {
  return (
    <EmptyStyle>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </EmptyStyle>
  );
};

const EmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default Empty;
