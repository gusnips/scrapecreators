import { describe, expect, test } from "bun:test";
import { groupName, methodNames } from "./names";

describe("groupName", () => {
  test("keeps a brand as one word and joins the rest", () => {
    expect(groupName("TikTok")).toBe("tiktok");
    expect(groupName("GitHub")).toBe("github");
    expect(groupName("TikTok Shop")).toBe("tiktokShop");
    expect(groupName("Facebook Ad Library")).toBe("facebookAdLibrary");
    expect(groupName("Scrape Creators")).toBe("account");
  });
});

describe("methodNames", () => {
  test("drops the version and the segments that repeat the group", () => {
    expect(
      methodNames("tiktok", [
        "/v1/tiktok/profile",
        "/v3/tiktok/profile/videos",
      ]),
    ).toEqual(["profile", "profileVideos"]);
    expect(
      methodNames("tiktokShop", [
        "/v1/tiktok/shop/search",
        "/v1/tiktok/product",
      ]),
    ).toEqual(["search", "product"]);
    expect(
      methodNames("googleAdLibrary", [
        "/v1/google/ad",
        "/v1/google/adLibrary/advertisers/search",
      ]),
    ).toEqual(["ad", "advertisersSearch"]);
  });

  test("names a path that is only its group get", () => {
    expect(methodNames("linktree", ["/v1/linktree"])).toEqual(["get"]);
    expect(methodNames("creatorTools", ["/v1/find-creator-emails"])).toEqual([
      "findCreatorEmails",
    ]);
  });

  test("gives the newer version a suffix and keeps the oldest plain", () => {
    expect(
      methodNames("tiktok", [
        "/v2/tiktok/video",
        "/v1/tiktok/video",
        "/v3/tiktok/video",
      ]),
    ).toEqual(["videoV2", "video", "videoV3"]);
  });

  test("stops when two paths end up with one name", () => {
    expect(() =>
      methodNames("tiktok", ["/v1/tiktok/live", "/v1/tiktok/Live"]),
    ).toThrow("named");
  });
});
