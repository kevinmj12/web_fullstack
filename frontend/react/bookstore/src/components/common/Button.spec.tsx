import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../context/ThemeContext";
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    // 1. 렌더
    // React 컴포넌트를 테스트 환경에 렌더링
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    // 요소가 DOM에 존재하는지 검사
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size props 적용", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          제목
        </Button>
      </BookStoreThemeProvider>
    );

    // 인라인 스타일이 제대로 적용되었는지 검사
    expect(screen.getByRole("button")).toHaveStyle({
      fontSize: "1.5rem",
    });
  });
});
