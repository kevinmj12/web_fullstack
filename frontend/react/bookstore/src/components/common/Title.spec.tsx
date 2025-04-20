import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../context/ThemeContext";

describe("Title 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("size props 적용", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({
      fontSize: "2rem",
      color: "brown",
    });
  });
});
