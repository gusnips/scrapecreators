import createClient from "openapi-fetch";
import type { Client } from "openapi-fetch";
import { ScrapeCreatorsError, isRecord } from "./errors";
import type { paths } from "./schema";

export type ScrapeCreatorsFetch = (request: Request) => Promise<Response>;

export interface ScrapeCreatorsConfig {
  /** The API key from your ScrapeCreators dashboard. */
  apiKey: string;
  baseUrl?: string;
  fetch?: ScrapeCreatorsFetch;
}

/** Pass `AbortSignal.timeout(60_000)` to stop waiting after 60 seconds. */
export interface CallOptions {
  signal?: AbortSignal;
}

/** The query string of one endpoint. */
export type Query<P extends keyof paths> =
  paths[P]["get"]["parameters"]["query"];

type PostPath = {
  [P in keyof paths]: paths[P] extends { post: unknown } ? P : never;
}[keyof paths];

/** The JSON body of an endpoint's POST: the same parameters as its query string. */
export type Body<P extends PostPath> =
  paths[P]["post"]["requestBody"]["content"]["application/json"];

/**
 * What most endpoints answer. ScrapeCreators publishes no schema for the rest of the object, so
 * everything else is `unknown`: check its shape before you use it. Most endpoints send the three
 * named fields, but a few send none, so each may be missing.
 */
export interface ScrapeCreatorsResponse {
  success?: boolean;
  credits_remaining?: number;
  credits_charged?: number;
  [key: string]: unknown;
}

function isResponse(value: unknown): value is ScrapeCreatorsResponse {
  return isRecord(value);
}

export function createApi(config: ScrapeCreatorsConfig): Client<paths> {
  return createClient<paths>({
    baseUrl: (config.baseUrl ?? "https://api.scrapecreators.com").replace(
      /\/+$/,
      "",
    ),
    fetch: config.fetch,
    headers: { Accept: "application/json", "x-api-key": config.apiKey },
  });
}

type Result = Promise<{ data?: unknown; error?: unknown; response: Response }>;

async function successBody(
  result: Result,
): Promise<{ data: unknown; status: number }> {
  const { data, error, response } = await result;
  if (!response.ok) throw new ScrapeCreatorsError(response.status, error);
  return { data, status: response.status };
}

export async function unwrap(result: Result): Promise<ScrapeCreatorsResponse> {
  const { data, status } = await successBody(result);
  if (!isResponse(data)) {
    throw new ScrapeCreatorsError(
      status,
      data,
      "The answer is not a JSON object. See error.body.",
    );
  }
  return data;
}

/** A few endpoints answer with a list, not an object. */
export async function unwrapList(result: Result): Promise<unknown[]> {
  const { data, status } = await successBody(result);
  if (!Array.isArray(data)) {
    throw new ScrapeCreatorsError(
      status,
      data,
      "The answer is not a JSON list. See error.body.",
    );
  }
  return data;
}
