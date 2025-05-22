import { BookReviewItem } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

// const mockReviewData: BookReviewItem[] = [
//   {
//     id: 1,
//     userName: "Kim",
//     content: "감사합니다",
//     createdAt: "2025-01-01",
//     score: 5,
//   },
//   {
//     id: 2,
//     userName: "Lee",
//     content: "고맙습니다",
//     createdAt: "2025-01-02",
//     score: 3,
//   },
// ];

const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: index,
    userName: faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.number.int({ min: 1, max: 5 }),
  })
);

export const reiviewsById = http.get(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);
