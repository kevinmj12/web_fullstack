import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${768}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      console.log(e.matches);
      setIsMobile(e.matches);
    };

    // 초기 값 설정
    setIsMobile(mediaQuery.matches);

    // 이벤트 리스너 등록
    mediaQuery.addEventListener("change", handleChange);

    // 정리(clean up)
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isMobile };
};
