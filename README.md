# scrapecreators

TypeScript client for the [ScrapeCreators](https://scrapecreators.com) API: public data from TikTok, Instagram, YouTube, Facebook, Twitter, Reddit and many more. Unofficial, not made by ScrapeCreators.

```bash
npm install scrapecreators
# or
bun add scrapecreators
```

You can also install `@gusnips/scrapecreators`. Both names give you the same code.

## First call

```ts
import { ScrapeCreatorsClient } from "scrapecreators";

const scrapecreators = new ScrapeCreatorsClient("YOUR_API_KEY");

const profile = await scrapecreators.tiktok.profile({
  handle: "stoolpresidente",
});
```

Get an API key at [app.scrapecreators.com](https://app.scrapecreators.com). Keep it on your server and out of the browser.

The client sends the key for you, in the `x-api-key` header.

## What you get back

Every method returns what ScrapeCreators sent, as an object:

```ts
const { credits_charged, credits_remaining } =
  await scrapecreators.account.creditBalance();
```

ScrapeCreators publishes no schema for its answers, only one sample each. So the type has three optional fields and the rest is `unknown`:

- `success`
- `credits_charged`: what this call cost.
- `credits_remaining`: your balance after it.

Most endpoints send all three. A few send none, so any of them can be missing. Check the shape of the rest before you read it, with a library like zod, or read only the fields you need.

Four endpoints answer with a list, and their methods return `unknown[]`: `account.getApiUsage`, `account.getDailyUsageCount`, `account.getMostUsedRoutes` and `twitch.clip`.

## Finding the method you need

Each endpoint is one method. The group is the platform's tag in ScrapeCreators' docs. The name is the path in camelCase, without the version and without the parts that repeat the group:

| ScrapeCreators endpoint                 | In the SDK                                     |
| --------------------------------------- | ---------------------------------------------- |
| `GET /v1/tiktok/profile`                | `scrapecreators.tiktok.profile()`              |
| `GET /v3/tiktok/profile/videos`         | `scrapecreators.tiktok.profileVideos()`        |
| `GET /v1/facebook/adLibrary/search/ads` | `scrapecreators.facebookAdLibrary.searchAds()` |
| `GET /v1/linktree`                      | `scrapecreators.linktree.get()`                |
| `GET /v1/account/credit-balance`        | `scrapecreators.account.creditBalance()`       |

A path that is only the group, like `/v1/linktree`, is `get`. ScrapeCreators' own command line tool does the same.

The version stays in the request, so `tiktok.profileVideos()` calls `/v3/...`. If ScrapeCreators ever ships two versions of one endpoint, the oldest keeps the plain name and the newer one adds its version, like `profileV2`.

`GET /v1/account/credit-balance` and its siblings are in `account`. ScrapeCreators tags them "Scrape Creators".

There are 38 groups and 198 methods: `tiktok` (22), `instagram` (20), `youtube` (17), `facebook` (12), `github` (10), `reddit` (8), `facebookAdLibrary` (7), `twitter` (7), `spotify` (7), `cosmos` (7), `linkedin` (6), `tiktokShop` (5), `rumble` (5), `threads` (5), `twitch` (5), `account` (4), `pinterest` (4), `appleMusic` (4), `facebookMarketplace` (3), `facebookEvents` (3), `googleAdLibrary` (3), `truthSocial` (3), `bluesky` (3), `soundcloud` (3), `kwai` (3), `snapchat` (3), `telegram` (3), `creatorTools` (3), `tiktokAdLibrary` (2), `linkedinAdLibrary` (2), `kick` (2), `google`, `linktree`, `komi`, `pillar`, `linkbio`, `linkme` and `amazonShop` (1 each).

Hover a method in your editor to read what it does and how it counts credits. The parameters are typed from ScrapeCreators' OpenAPI file, so your editor lists them and marks the required ones.

## More pages

An endpoint with more results sends a cursor in its answer. Send it back in the next call. The parameter's name changes from one endpoint to the next (`cursor`, `max_cursor`, `continuationToken`, `page`), so read the method's parameters:

```ts
const first = await scrapecreators.tiktok.profileVideos({
  handle: "stoolpresidente",
});
// Read the cursor from `first`, then ask for the next page:
const next = await scrapecreators.tiktok.profileVideos({
  handle: "stoolpresidente",
  max_cursor: "1734562353000",
});
```

The cursor sits in a different place in each answer, so print one answer before you write a loop.

## POST for long cursors

After many pages, a cursor can get too long for a URL. Three endpoints also accept a POST, with the same parameters in the JSON body. Their methods end in `Post`:

```ts
await scrapecreators.facebookAdLibrary.searchAdsPost({
  query: "shoes",
  cursor: "...",
});
```

They are `facebookAdLibrary.searchAdsPost`, `facebookAdLibrary.companyAdsPost` and `reddit.postCommentsPost`. Use the plain method until the cursor stops fitting.

## Errors

A failed call throws `ScrapeCreatorsError`. It has the HTTP `status`, the raw `body`, and a `message`. The message is ScrapeCreators' own when the answer has one. If not, a 401, 402 or 429 gets a message that says what to do.

```ts
import { ScrapeCreatorsError } from "scrapecreators";

try {
  await scrapecreators.tiktok.profile({ handle: "stoolpresidente" });
} catch (error) {
  if (error instanceof ScrapeCreatorsError && error.status === 402) {
    // No credits left. Add more, then call again.
  }
  throw error;
}
```

ScrapeCreators does not list its error statuses in the OpenAPI file. These are the ones its command line tool explains:

| Status | Meaning                                                      |
| ------ | ------------------------------------------------------------ |
| 401    | The API key was not accepted.                                |
| 402    | No credits left. Add more at app.scrapecreators.com/billing. |
| 404    | The endpoint or the thing you asked for was not found.       |
| 429    | Too many requests. Wait a moment, then try again.            |
| 5xx    | A fault at ScrapeCreators. Try again in a few seconds.       |

If a call answers 200 but not with an object (or a list, for the four list endpoints), you get a `ScrapeCreatorsError` too, with the answer in `error.body`.

Network failures, like a lost connection, throw the error `fetch` gives you.

## Timeouts and retries

A call waits as long as `fetch` waits. To stop after 60 seconds, pass a signal as the last argument:

```ts
await scrapecreators.tiktok.profile(
  { handle: "stoolpresidente" },
  { signal: AbortSignal.timeout(60_000) },
);
```

The client never retries. A call that works costs credits, so you decide when to try again.

## Options

```ts
new ScrapeCreatorsClient({
  apiKey: "YOUR_API_KEY",
  baseUrl: "https://api.scrapecreators.com", // the default
  fetch: myFetch, // takes a Request, returns a Response
});
```

`scrapecreators.api` is the typed [openapi-fetch](https://openapi-ts.dev/openapi-fetch/) client underneath. Use it when you need the raw `Response`, such as its headers. It sends the key too.

ScrapeCreators also publishes a command line tool, [`@scrapecreators/cli`](https://www.npmjs.com/package/@scrapecreators/cli). This package is the JavaScript client, not the command line tool.

## Keeping it current

The methods are written by a script from `openapi.json`, which is ScrapeCreators' file at [docs.scrapecreators.com/openapi.json](https://docs.scrapecreators.com/openapi.json). To follow an API change, replace that file and run:

```bash
bun run generate
```

Do not edit `src/schema.d.ts`, `src/client.ts` or `src/modules/`. The script rewrites them.

## License

MIT. Not affiliated with ScrapeCreators.
