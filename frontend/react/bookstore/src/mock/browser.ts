import { setupWorker } from "msw/browser";
import { reiviewsById } from "./review";

const handlers = [reiviewsById];

export const worker = setupWorker(...handlers);
