import { style } from "@vanilla-extract/css";
import { vars } from "../../app.css";

export const listContainer = style({
  height: "max-content",
  display: "flex",
  flexWrap: "wrap",
  rowGap: vars.spacing.listSpacing,
  margin: vars.spacing.listSpacing,
});
