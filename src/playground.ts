import { readFileSync } from "node:fs";

import type { RuntimeConfig } from "./persistence.js";

const playgroundHtmlTemplate = readFileSync(new URL("./playground/index.html", import.meta.url), "utf8");
const playgroundStyle = readFileSync(new URL("./playground/playground.css", import.meta.url), "utf8");
const playgroundScript = readFileSync(new URL("./playground/playground.js", import.meta.url), "utf8");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderApiPlayground(config: RuntimeConfig): string {
  const backendLabel = escapeHtml(config.backend);
  const backendPath = config.path ? escapeHtml(config.path) : "";
  const backendDescription = config.path
    ? `Using ${backendLabel} persistence at <code>${backendPath}</code>.`
    : `Using ${backendLabel} persistence for this service instance.`;

  return playgroundHtmlTemplate
    .replaceAll("__BACKEND_LABEL__", backendLabel)
    .replaceAll("__BACKEND_DESCRIPTION__", backendDescription);
}

export function getPlaygroundStyle(): string {
  return playgroundStyle;
}

export function getPlaygroundScript(): string {
  return playgroundScript;
}
