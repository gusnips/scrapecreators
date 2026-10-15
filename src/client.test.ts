import { describe, expect, test } from "bun:test";
import { ScrapeCreatorsClient } from "./client";
import { ScrapeCreatorsError } from "./errors";
import type { ScrapeCreatorsFetch } from "./http";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function setup(handler: () => Response) {
  const requests: Request[] = [];
  const fetch: ScrapeCreatorsFetch = async (request) => {
    requests.push(request.clone());
    return handler();
  };
  return {
    client: new ScrapeCreatorsClient({ apiKey: "sk_test", fetch }),
    requests,
  };
}

describe("ScrapeCreatorsClient", () => {
  test("sends the key in a header and the query to the endpoint's path", async () => {
    const { client, requests } = setup(() =>
      json({ success: true, credits_remaining: 9 }),
    );

    const result = await client.tiktok.profile({ handle: "nasa" });

    expect(result.credits_remaining).toBe(9);
    const url = new URL(requests[0].url);
    expect(requests[0].method).toBe("GET");
    expect(requests[0].headers.get("x-api-key")).toBe("sk_test");
    expect(url.origin + url.pathname).toBe(
      "https://api.scrapecreators.com/v1/tiktok/profile",
    );
    expect(Object.fromEntries(url.searchParams)).toEqual({ handle: "nasa" });
  });

  test("keeps the version of an endpoint in its path", async () => {
    const { client, requests } = setup(() => json({ success: true }));

    await client.tiktok.profileVideos({ handle: "nasa" });

    expect(new URL(requests[0].url).pathname).toBe("/v3/tiktok/profile/videos");
  });

  test("rejects a parameter the endpoint does not have", async () => {
    const { client } = setup(() => json({ success: true }));

    // @ts-expect-error `nope` is not a parameter of this endpoint.
    await client.tiktok.profile({ nope: "1" });
  });

  test("sends the parameters of a POST in the JSON body", async () => {
    const { client, requests } = setup(() => json({ success: true }));

    await client.facebookAdLibrary.searchAdsPost({
      query: "shoes",
      cursor: "abc",
    });

    expect(requests[0].method).toBe("POST");
    expect(new URL(requests[0].url).pathname).toBe(
      "/v1/facebook/adLibrary/search/ads",
    );
    expect(await requests[0].json()).toEqual({ query: "shoes", cursor: "abc" });
  });

  test("returns the list an endpoint answers with, and refuses an object in its place", async () => {
    const list = setup(() =>
      json([{ usage_date: "2026-04-14", total_credits: "47" }]),
    );
    expect(await list.client.account.getDailyUsageCount()).toEqual([
      { usage_date: "2026-04-14", total_credits: "47" },
    ]);

    const wrong = setup(() => json({ success: true }));
    await expect(
      wrong.client.account.getDailyUsageCount(),
    ).rejects.toBeInstanceOf(ScrapeCreatorsError);
  });

  test("throws ScrapeCreatorsError with the API's message", async () => {
    const { client } = setup(() => json({ error: "Invalid API key" }, 401));

    const error = await client.tiktok
      .profile({ handle: "nasa" })
      .catch((caught) => caught);

    expect(error).toBeInstanceOf(ScrapeCreatorsError);
    expect(error.status).toBe(401);
    expect(error.message).toBe("Invalid API key");
  });

  test("says what to do when an error comes with no message", async () => {
    const { client } = setup(() => json({}, 402));

    const error = await client.account
      .creditBalance()
      .catch((caught) => caught);

    expect(error.message).toContain("https://app.scrapecreators.com/billing");
  });
});
