export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// What to do about the statuses ScrapeCreators' own CLI explains, for an answer with no message.
const FIXES: Record<number, string> = {
  401: "ScrapeCreators did not accept the API key. Check it at https://app.scrapecreators.com.",
  402: "No credits left. Add more at https://app.scrapecreators.com/billing.",
  429: "Too many requests. Wait a moment, then try again.",
};

// An error answer is { message } or { error }, or plain text.
function messageOf(body: unknown): string | undefined {
  if (typeof body === "string") return body || undefined;
  if (!isRecord(body)) return undefined;
  const { message, error } = body;
  if (typeof message === "string") return message;
  return typeof error === "string" ? error : undefined;
}

export class ScrapeCreatorsError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(
      message ??
        messageOf(body) ??
        FIXES[status] ??
        `ScrapeCreators request failed (HTTP ${status}). Check the request and your API key.`,
    );
    this.name = "ScrapeCreatorsError";
    this.status = status;
    this.body = body;
  }
}
