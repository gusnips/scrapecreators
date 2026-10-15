export interface paths {
  "/v1/tiktok/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Fetches public profile data for a TikTok user by their handle or user_id, useful for looking up a creator's identity, bio, and account stats. Returns a `user` object (display name, avatar URLs, bio/signature, verification status, bio link) and a `stats` object (followerCount, followingCount, heartCount/total likes, videoCount). This only returns profile metadata, not the user's actual videos or followers list.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description TikTok handle. You can pass handle or user_id.
           * @example stoolpresidente
           */
          handle?: string;
          /**
           * @description TikTok user id.
           * @example 6659752019493208069
           */
          user_id?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/profile/region": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Region
     * @description Returns the TikTok region code for a public profile, like `US` for United States or `MX` for Mexico.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok handle
           * @example stoolpresidente
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/user/audience": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User's Audience Demographics
     * @description Retrieves audience demographic data for a TikTok user, showing where their followers are located by country. Returns `audienceLocations`, an array of objects each containing `country`, `countryCode`, `count`, and `percentage`. Costs 26 credits per request.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok handle
           * @example shakira
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/collection/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Collection Videos
     * @description Fetches the videos saved in a public TikTok collection, which TikTok also calls a playlist. Pass the collection URL. Returns `videos` using TikTok's native web video object format, including `id`, `desc`, `author`, `stats`, and `video`. To fetch the next page, pass the previous response's `max_cursor` as `cursor` when `has_more` is true.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public TikTok collection URL
           * @example https://www.tiktok.com/@kibblemaster808/collection/Want-to-go-7665668414573546258
           */
          url: string;
          /**
           * @description Cursor to get more videos. Use max_cursor from the previous response.
           * @example 4
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v3/tiktok/profile/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Videos
     * @description Fetches videos posted by a TikTok user, sortable by latest or most popular, use this to get a creator's video feed or TikToks. Returns `aweme_list`, an array of video objects each containing `aweme_id`, `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count, collect_count/saves), and `video` (download URLs, duration, cover image). Paginate with `max_cursor` from the previous response, keeping the same `region` and `sort_by` throughout a cursor chain. Known limitation: this feed is not an exhaustive inventory of a creator's public posts. TikTok's web page, single-post lookup, comments, and profile feed use different public sources and request contexts; a post may be retrievable through one and unavailable or missing through another. A missing feed item does not prove deletion, and a returned item does not guarantee browser playback in your country. Try the creator's country with a two-letter `region` code, restarting pagination when changing it, but country selection does not guarantee completeness. Repeated requests for the same page can also return different item sets. For campaign tracking, retain submitted post URLs/IDs and refresh them with `/v2/tiktok/video` rather than relying only on feed discovery. Retry a suspect page within a bounded budget and deduplicate by `aweme_id`; do not merge cursors from separate responses. [Examples and troubleshooting](https://docs.scrapecreators.com/tiktok-post-availability).
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok handle
           * @example stoolpresidente
           */
          handle: string;
          /**
           * @description TikTok user id. Use this for faster responses.
           * @example 6659752019493208069
           */
          user_id?: string;
          /**
           * @description What to sort by
           * @example latest
           */
          sort_by?: "latest" | "popular";
          /**
           * @description Cursor to get more videos. Get 'max_cursor' from previous response.
           * @example 1734562353000
           */
          max_cursor?: string;
          /**
           * @description Country code passed to the profile-feed source. Defaults to US. If a profile should have videos but returns none, try another relevant two-letter country code. Changing this value does not guarantee that region-restricted posts will appear.
           * @example US
           */
          region?: string;
          /**
           * @description Whether to include pinned posts. Defaults to true. Set to false to exclude posts marked as pinned, including with trim=true. Keep this value unchanged while paginating. Filtering can produce shorter or empty pages; follow has_more and max_cursor. Successful pages still cost 1 credit, including empty results.
           * @example true
           */
          include_pinned?: boolean;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v2/tiktok/video": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Video Info
     * @description Fetches detailed data for a single TikTok video by URL, including its metadata, engagement stats, and optionally its transcript/captions. Returns `aweme_detail` with `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count, collect_count), `video` URLs, `author` info, and `music` info; also returns `transcript` in WEBVTT format if `get_transcript=true`. For no-watermark video URLs, use `aweme_detail.video.download_no_watermark_addr.url_list[0]` when it exists. If it is missing and `aweme_detail.video.has_watermark` is false, use `aweme_detail.video.play_addr.url_list[0]` instead. If `has_watermark` is true and `download_no_watermark_addr` is missing, TikTok did not return a no-watermark URL for that video. Also accepts photo/slideshow URLs and returns `image_post_info` when available. Availability is source-specific: a TikTok web page can be blocked in your country while this endpoint still retrieves public metadata, and a post can be missing from the profile feed while this endpoint succeeds. A `404 not_found` means the post could not be retrieved through the endpoint's available public sources; it does not by itself prove global deletion. Keep the last known campaign record and retry later with a relevant `region` rather than marking a post deleted from a single failure. [Examples and troubleshooting](https://docs.scrapecreators.com/tiktok-post-availability). Native captions are opt-in via get_transcript=true and are included in the existing base endpoint price. This detail endpoint does not use AI transcription or an AI fallback; missing captions return no transcript. For AI fallback, use /v1/tiktok/video/transcript.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok video or photo/slideshow URL
           * @example https://www.tiktok.com/@randomspamvideos25/video/7251387037834595630
           */
          url: string;
          /** @description Native captions are opt-in via get_transcript=true and are included in the existing base endpoint price. This detail endpoint does not use AI transcription or an AI fallback; missing captions return no transcript. For AI fallback, use /v1/tiktok/video/transcript. */
          get_transcript?: boolean;
          /**
           * @description Two-letter country code passed to the primary post source. Defaults to US. Try the creator's country if a post is unavailable. This does not guarantee a matching browser/proxy country or complete retrieval; the fallback source does not receive this parameter.
           * @example US
           */
          region?: string;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
          /** @description Set to true to download the video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. */
          download_media?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/video/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Extracts existing transcripts, captions, or subtitles from a TikTok video by URL. Returns id, url, and transcript (native captions are WEBVTT-formatted; AI fallback returns text). Native transcripts cost 1 credit only when returned, with no fixed length limit; no transcript costs 0 credits. AI fallback is opt-in via use_ai_as_fallback=true and is used only when native captions are unavailable. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This dedicated transcript route charges the AI rate instead of adding a native-caption fee. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /**
           * @description TikTok video URL
           * @example https://www.tiktok.com/@stoolpresidente/video/7499229683859426602
           */
          url: string;
          /**
           * @description Language of the transcript. 2 letter language code, ie 'en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'zh'
           * @example en
           */
          language?: string;
          /**
           * @description Set to 'true' to use paid AI only when existing captions are unavailable. Defaults to false. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
           * @example false
           */
          use_ai_as_fallback?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/user/live": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Live
     * @description Checks if a TikTok user is currently live streaming and retrieves their live room details. Use the top-level `is_live` boolean instead of checking TikTok's numeric status values yourself. Also returns `liveRoomUserInfo` (nickname, avatar, followerCount, roomId) and `liveRoom` (title, startTime, status, `liveRoomStats` with enterCount and userCount, plus `streamData` with playback URLs in multiple qualities).
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok handle
           * @example thejustalex
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/live": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Live Info
     * @description Gets curated room-level info for a TikTok live using TokAPI's live info endpoint. Use `/v1/tiktok/user/live` first to find the `room_id`. If you only have a TikTok handle and need the user's numeric id, use `/v1/tiktok/profile` first to get `user.id`. This endpoint is separate from `/v1/tiktok/user/live` because it uses a different upstream call and returns a smaller response with the most relevant fields: `room_id`, `like_count`, `viewer_count`, `status`, `title`, `cover_url`, and `owner`.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok live room id. Get this from `/v1/tiktok/user/live` in `liveRoomUserInfo.roomId` or `liveRoom.id` when the user is live.
           * @example 7523685855395842871
           */
          room_id: string;
          /**
           * @description TikTok numeric user id for the live owner. Get this from `/v1/tiktok/profile` in `user.id`.
           * @example 6742945285876515845
           */
          user_id: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/video/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comments
     * @description Fetches comments on a TikTok video by URL, useful for reading audience reactions, replies, and engagement. Returns `comments`, an array where each comment includes `text`, `digg_count` (likes), `reply_comment_total`, `create_time`, and a `user` object with the commenter's nickname and unique_id; also returns `total` comment count. Paginate with `cursor` from the previous response. Public photo/slideshow posts are supported as well as videos. Comments use a separate TikTok public web source, so successful single-post metadata retrieval does not guarantee readable comments. An empty terminal page does not by itself prove the post has no comments globally or was deleted. This endpoint does not expose a country-selection parameter. Use the returned cursor and stop when `end_of_pagination=true`. Pages that return comments cost 1 credit; successful empty pages cost 0 credits, including the first page, later pages, and trim=true responses. Replaying a terminal null cursor also costs 0 credits. [Examples and troubleshooting](https://docs.scrapecreators.com/tiktok-post-availability).
     */
    get: {
      parameters: {
        query: {
          /** @description TikTok video URL */
          url: string;
          /**
           * @description Cursor to get more comments. Get 'cursor' from previous response.
           * @example 20
           */
          cursor?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/video/comment/replies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comment Replies
     * @description Fetches replies to a specific TikTok comment by its ID. Returns `comments`, an array of comment objects each with `text`, `user` info, and `create_time`. Paginate with `cursor` from the previous response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok comment ID. This is the cid from the comments endpoint.
           * @example 7623828115408274207
           */
          comment_id: string;
          /**
           * @description TikTok video URL. This is the url from the comments endpoint.
           * @example https://www.tiktok.com/@stoolpresidente/video/7623818255903329566
           */
          url: string;
          /**
           * @description Cursor to get more replies. Get 'cursor' from previous response.
           * @example 3
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/user/following": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Following
     * @description Retrieves the following list, accounts that a TikTok user follows, by their handle. Returns `followings`, an array of user objects each with `nickname`, `unique_id`, `uid`, `follower_count`, `following_count`, `signature`, and avatar URLs; also returns `total` count. Paginate with `min_time` from the previous response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description TikTok handle
           * @example stoolpresidente
           */
          handle: string;
          /**
           * @description Used to paginate. Get 'min_time' from previous response.
           * @example 1605663376
           */
          min_time?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/user/followers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Followers
     * @description Retrieves the follower list of a TikTok account by handle or user_id, useful for seeing who follows a creator or getting subscriber data. Returns `followers`, an array of user objects each with `nickname`, `unique_id`, `uid`, `follower_count`, `following_count`, and avatar URLs; also returns `total` follower count. Paginate with `min_time` from the previous response.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description TikTok handle
           * @example stoolpresidente
           */
          handle?: string;
          /**
           * @description User id. Use this for faster response times.
           * @example 6659752019493208069
           */
          user_id?: string;
          /**
           * @description Used to paginate. Get 'min_time' from previous response.
           * @example 1605663376
           */
          min_time?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/search/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Users
     * @description Searches for TikTok users by keyword or name, useful for finding creators or accounts matching a query. Returns `users`, an array of objects each containing `user_info` (nickname, unique_id, signature/bio, follower_count, following_count, avatar) and associated `items`. Paginate with `cursor` from the previous response.
     */
    get: {
      parameters: {
        query: {
          /** @description Search query for users */
          query: string;
          /**
           * @description Cursor to get more users. Get 'cursor' from previous response.
           * @example 10
           */
          cursor?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/search/suggestions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Suggestions
     * @description Gets the autocomplete suggestions TikTok shows while someone is typing in search. Returns `suggestions`, a clean array of suggested search terms and the most useful metadata for each suggestion.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query to get suggestions for
           * @example dogs
           */
          query: string;
          /**
           * @description Region code for suggestions
           * @example US
           */
          region?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/search/hashtag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search by Hashtag
     * @description Searches for TikTok videos under a specific hashtag, useful for finding content by topic or trend. Returns `aweme_list`, an array of video objects each with `aweme_id`, `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count), `video` info, and `author` details. Paginate with `cursor` from the previous response. TikTok may return duplicate results.
     */
    get: {
      parameters: {
        query: {
          /** @description Hashtag to search for (without #) */
          hashtag: string;
          /**
           * @description Region the proxy will be set to. Note: this isn't going to grab you all tiktoks from this region, you're just setting the proxy there.
           * @example US
           */
          region?: string;
          /**
           * @description Cursor to get more videos. Get 'cursor' from previous response.
           * @example 10
           */
          cursor?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/search/keyword": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search by Keyword
     * @description Searches for TikTok videos by keyword or phrase, the general video search across all of TikTok. Returns `search_item_list`, an array of objects each containing `aweme_info` with `aweme_id`, `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count), `video` info, and `author` details. Paginate with `cursor`. TikTok may return duplicate results.
     */
    get: {
      parameters: {
        query: {
          /** @description Keyword to search for */
          query: string;
          /**
           * @description Time Frame
           * @example all-time
           */
          date_posted?:
            | "yesterday"
            | "this-week"
            | "this-month"
            | "last-3-months"
            | "last-6-months"
            | "all-time";
          /**
           * @description Sort by
           * @example relevance
           */
          sort_by?: "relevance" | "most-liked" | "date-posted";
          /** @description Note, this doesn't filter the tiktoks only in a specfic region, it puts the proxy there. Use it in case you want to scrape posts only available for some country. Use 2 letter country codes like US, GB, FR, etc */
          region?: string;
          /**
           * @description Cursor to get more videos. Get 'cursor' from previous response.
           * @example 10
           */
          cursor?: number;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/search/top": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Top Search
     * @description Searches TikTok's 'Top' results by query, returns both videos and photo carousels, unlike keyword search which only returns videos. Returns `items`, an array of objects each with `id`, `desc` (caption), `content_type` (video or photo carousel), `statistics` (play_count, digg_count/likes, comment_count, share_count), `video` info, and `images` for carousels. Paginate with `cursor`. TikTok may return duplicate results.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword to search for
           * @example funny
           */
          query: string;
          /**
           * @description Time Frame TikTok was posted
           * @example all-time
           */
          publish_time?:
            | "yesterday"
            | "this-week"
            | "this-month"
            | "last-3-months"
            | "last-6-months"
            | "all-time";
          /**
           * @description Sort by
           * @example relevance
           */
          sort_by?: "relevance" | "most-liked" | "date-posted";
          /** @description Note, this doesn't filter the tiktoks only in a specfic region, it puts the proxy there. Use it in case you want to scrape posts only available for some country. Use 2 letter country codes like US, GB, FR, etc */
          region?: string;
          /** @description Cursor to get more videos. Get 'cursor' from previous response. */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/creators/popular": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get popular creators
     * @description Discovers trending and popular TikTok creators, filterable by follower count range, creator country, and audience country. Returns `creator_list`, an array of creator objects each with `nickname`, `unique_id`, `follower_count`, `likes_count`, `video_views`, `engagement_rate`, and avatar URLs. Sortable by engagement, follower count, or average views.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Page number
           * @example 1
           */
          page?: number;
          /**
           * @description Sort creators by engagement, follower count, or average views
           * @example engagement
           */
          sortBy?: "engagement" | "follower" | "avg_views";
          /**
           * @description Filter by follower count range
           * @example 10K-100K
           */
          followerCount?: "10K-100K" | "100K-1M" | "1M-10M" | "10M+";
          /**
           * @description Country code of the creator
           * @example US
           */
          creatorCountry?:
            | "AU"
            | "BR"
            | "CA"
            | "EG"
            | "FR"
            | "DE"
            | "ID"
            | "IL"
            | "IT"
            | "JP"
            | "MY"
            | "PH"
            | "RU"
            | "SA"
            | "SG"
            | "KR"
            | "ES"
            | "TW"
            | "TH"
            | "TR"
            | "AE"
            | "GB"
            | "US"
            | "VN";
          /**
           * @description Country code of the audience/follower
           * @example US
           */
          audienceCountry?:
            | "AU"
            | "BR"
            | "CA"
            | "EG"
            | "FR"
            | "DE"
            | "ID"
            | "IL"
            | "IT"
            | "JP"
            | "MY"
            | "PH"
            | "RU"
            | "SA"
            | "SG"
            | "KR"
            | "ES"
            | "TW"
            | "TH"
            | "TR"
            | "AE"
            | "GB"
            | "US"
            | "VN";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/song": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Song Details
     * @description Fetches detailed metadata for a specific TikTok sound or song by its clipId. Returns `music_info` with `title`, `author`, `album`, `duration`, `user_count` (number of videos using this sound), `play_url`, cover art, and artist details. Use the `clipId` from a sound URL or from the popular songs endpoint.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description This is a little confusing because this isn't songId like you'd think. It is the clipId. I guess because you can clip different portions of a song 🤷‍♂️
           * @example 7439295283975702544
           */
          clipId: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/song/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * TikToks using Song
     * @description Fetches TikTok videos that use a specific sound or song, identified by its clipId. Returns `aweme_list`, an array of video objects each with `aweme_id`, `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count), `video` info, and `author` details. Paginate with `cursor` from the previous response.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description This is clipId. Can be found on a url like so: https://www.tiktok.com/music/That%27s-Who-I-Praise-7370375686554782506, where 7370375686554782506 is the clipId
           * @example 7439295283975702544
           */
          clipId?: string;
          /**
           * @description The cursor to get the next page of results.
           * @example 12
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/get-trending-feed": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Trending Feed
     * @description Fetches TikTok's trending/For You feed for a given region, useful for discovering viral content and what's currently popular. Returns `aweme_list`, an array of video objects each with `aweme_id`, `desc` (caption), `statistics` (play_count, digg_count/likes, comment_count, share_count, collect_count), `video` (playback and download URLs, cover), `author` info, and `image_post_info` for photo carousels.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Where you want the proxy to be. This doesn't mean that you will only see TikToks from this region, you will just see the content that isn't banned in that region.
           * @example US
           */
          region: string;
          /**
           * @description Set to true to get a trimmed response.
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/shop/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Shop Search
     * @description Searches TikTok Shop for products matching a keyword query. Returns an array of product objects each with `title`, `cover` image, `url` (product page link), `price`, `sold_count`, `review_count`, `rating`, and `shop_name`. Paginate with `page`; filter by region.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Term you want to search for
           * @example shoes
           */
          query: string;
          /**
           * @description Page number to retrieve
           * @example 1
           */
          page?: number;
          /**
           * @description Region to search shop products in. Non-US TikTok Shop regions are not reliable right now and may return limited or inconsistent results. Sorry for the inconvenience.
           * @example US
           */
          region?:
            | "US"
            | "GB"
            | "DE"
            | "FR"
            | "IT"
            | "ID"
            | "MY"
            | "MX"
            | "PH"
            | "SG"
            | "ES"
            | "TH"
            | "VN"
            | "BR"
            | "JP"
            | "IE";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/shop/products": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Shop Products
     * @description Lists all products from a specific TikTok Shop store by its URL. Returns an array of product objects each with `title`, `cover` images, `url`, `price` info, `sold_count`, `review_count`, and `rating`. Paginate with `cursor` from the previous response; filter by region; use `sort_by=top` for best-selling products or `sort_by=new_releases` for newest products. Non-US shop catalog coverage depends on TikTok exposing that shop in the selected region, so some shops can return `not_found` outside the US even when they appear in shop search.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The TikTok Shop store URL.
           * @example https://www.tiktok.com/shop/store/goli-nutrition/7495794203056835079
           */
          url: string;
          /** @description Cursor parameter from the previous response to retrieve the next page of products. Omit for the first page. */
          cursor?: string;
          /**
           * @description Sort products by best-selling items (`top`) or newest products (`new_releases`). Defaults to `top`.
           * @example top
           */
          sort_by?: "top" | "new_releases";
          /**
           * @description Region to get shop products from. Defaults to US if not provided. Non-US regions are not reliable right now and may return `not_found` or limited catalog data even when the shop appears in search. Sorry for the inconvenience.
           * @example US
           */
          region?:
            | "US"
            | "GB"
            | "DE"
            | "FR"
            | "IT"
            | "ID"
            | "MY"
            | "MX"
            | "PH"
            | "SG"
            | "ES"
            | "TH"
            | "VN"
            | "BR"
            | "JP"
            | "IE";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/product": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Product Details
     * @description Fetches full details for a specific US TikTok Shop product by its URL, including stock levels and affiliate videos. Returns `product_info` with `product_base` (title, images, sold_count, price), `skus` (variants with exact `stock` counts plus TikTok's `sku_name` and `gtin` when available), and `product_detail_review` (product_rating, review_count, sample reviews). `gtin` contains `gtin_type` and `gtin_code`, or is null when TikTok does not provide a barcode. The response also includes `shop_info` (shop_name, shop_rating, followers_count) and `related_videos` (affiliate TikToks promoting the product). This endpoint currently supports the US region only.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the product to get details for.
           * @example https://www.tiktok.com/shop/pdp/goli-ashwagandha-gummies-with-vitamin-d-ksm-66-vegan-non-gmo/1729587769570529799
           */
          url: string;
          /**
           * @description Region for the product details request. US is the reliable region right now; non-US regions should not be considered reliable and may return `bad_request` or missing product data. Sorry for the inconvenience.
           * @example US
           */
          region?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/shop/product/reviews": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Product Reviews
     * @description Fetches customer reviews for a TikTok Shop product by URL or product_id. Returns `product_reviews`, an array of review objects each with `rating`, `display_text`, `review_timestamp_fmt`, `review_user` (name, avatar), and `sku_specification` (variant purchased); also returns `total_reviews` count and `rating_distribution`. Paginate with `page`.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The URL of the product (required if product_id is not provided)
           * @example https://www.tiktok.com/shop/pdp/cat-nail-clipper-by-potaroma-adjustable-sizes-built-in-file-safe-for-kittens-cats/1731578642912612516
           */
          url?: string;
          /**
           * @description The ID of the product (required if url is not provided)
           * @example 1731578642912612516
           */
          product_id?: string;
          /**
           * @description The region of the product. US is the reliable region right now; non-US regions should not be considered reliable and may return limited or inconsistent review data. Sorry for the inconvenience.
           * @example US
           */
          region?: string;
          /**
           * @description The page number of the reviews
           * @example 1
           */
          page?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/user/showcase": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Showcase
     * @description Fetches products featured in a TikTok user's public showcase, the products a creator promotes on their profile. Returns an array of product objects each with title, price, images, and shop details. Use POST request if pagination is cutting off too early. Just send the query params in the body.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The handle of the user
           * @example mrtiktokreviews
           */
          handle: string;
          /**
           * @description Region to put the proxy in. Non-US TikTok Shop regions are not reliable right now and may return limited or inconsistent showcase data. Sorry for the inconvenience.
           * @example US
           */
          region?: string;
          /**
           * @description The cursor to the next page of products
           * @example 21
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves comprehensive public Instagram profile information including biography, bio links, follower and following counts, verification status, and profile picture URLs. Also returns recent timeline posts with engagement metrics such as likes, comments, and video view counts, plus a list of related profiles. Useful for account overview, audience analysis, or discovering similar creators. Instagram may return media_count as null or return only the current post batch in edge_owner_to_timeline_media.count. Use Profile Post Count when you specifically need the total number of posts. An explicit rendered age gate (for example, You must be 21 years old or over to see this profile. Log in to continue.) returns HTTP 403, success=false, age_restricted=true, error=forbidden, errorStatus=403, and message=Profile is age restricted, without charging credits. This means Instagram identified an existing profile but requires an age-verified login to view it; we do not bypass the gate. It applies to GET, trimmed GET, and POST handle requests. The age_restricted field is omitted when age gating has not been explicitly confirmed; its absence is not proof that the account has no age limit. For GET handle requests, Profile is private means Instagram returned is_private=true. Account doesn't exist means the handle lookup returned no matching account, not confirmed deletion. A legacy Profile is restricted placeholder means the profile reports content but its public timeline returned no items. These placeholders return HTTP 200, success=true, error=not_found, errorStatus=404, and userId=null, and cost one credit. An explicitly rendered generic audience restriction returns HTTP 404 with Profile is restricted and zero credits charged; it does not confirm an age limit. Profile is unavailable on Instagram also returns an uncharged HTTP 404 and does not identify privacy, deletion, or age gating. HTTP 500 with Shoot, IG is blocking us. Try again and it should work. is an uncharged upstream failure, not a confirmed account restriction. Do not label generic login prompts or unavailable responses as age-restricted.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Instagram handle
           * @example jane
           */
          handle: string;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/basic-profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Basic Profile
     * @description Fetches a lightweight Instagram profile summary by user ID, returning username, full name, biography, profile picture URL, verification status, follower count, following count, media count, and account privacy and type. Ideal for quick lookups or enrichment when you already have the numeric user ID.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Instagram user id
           * @example 314216
           */
          userId?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v2/instagram/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Posts
     * @description Returns a paginated feed of a user's public Instagram posts, including reels, photos, videos, and carousels. Each item includes media type, shortcode, caption text, like count, comment count, play count, video URLs, image URLs, tagged users, and the published time in `items[].created_at` as an ISO 8601 UTC date. The original Unix timestamp remains available in `items[].taken_at`. Play counts reflect Instagram-only views and exclude cross-posted Facebook views. Supports cursor-based pagination via next_max_id for scrolling through the full timeline.
     */
    get: {
      parameters: {
        query: {
          /** @description Instagram handle */
          handle: string;
          /** @description Cursor to get next page of results. */
          next_max_id?: string;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/user/tagged-posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Tagged Posts
     * @description Returns up to 10 public posts per page from an Instagram user's Tagged tab. Each item is a flat post object with its shortcode, caption, media type, engagement counts, media URLs, and owner details. Keep passing the returned cursor to fetch additional pages until has_more is false.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Numeric Instagram user ID.
           * @example 325734299
           */
          user_id: string;
          /**
           * @description Cursor returned by the previous response.
           * @example 3953374600788032611
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/user/reels": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Reels
     * @description Returns a paginated list of a user's public Instagram reels (short-form videos). Each reel includes its shortcode, play count, like count, comment count, video versions with download URLs, thumbnail image, owner info, and the published time in `items[].media.created_at` as an ISO 8601 UTC date. With `trim=true`, use `items[].created_at`. The original Unix timestamp remains available as `taken_at`. Note that reel captions are not returned by this endpoint. Play counts are Instagram-only views and exclude cross-posted Facebook views. Supports cursor-based pagination via max_id; providing a user_id instead of a handle yields faster responses.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Instagram user id. Use this for faster response times.
           * @example 2700692569
           */
          user_id?: string;
          /**
           * @description Instagram handle. Use user_id for faster response times.
           * @example jane
           */
          handle?: string;
          /**
           * @description Max id to get more reels. Get 'max_id' from previous response.
           * @example QVFCVzNnS2lI...==
           */
          max_id?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post/Reel Info
     * @description Fetches detailed metadata for a single Instagram post or reel by shortcode or URL. Returns caption text, like count, comment count, video URL, video play count, video duration, display images, owner info, tagged users, carousel sidecar children when applicable, and the published time in `data.xdt_shortcode_media.created_at` as an ISO 8601 UTC date. The original Unix timestamp remains available in `data.xdt_shortcode_media.taken_at_timestamp`. Play counts are Instagram-only views and exclude cross-posted Facebook views. Set `include_play_count=false` to omit the play count and skip its additional fetch for a faster response.
     */
    get: {
      parameters: {
        query: {
          /** @description Instagram post or reel URL */
          url: string;
          /**
           * @description 2 letter country code to set the proxy in
           * @example US
           */
          region?: string;
          /** @description Set to true to get a trimmed response */
          trim?: boolean;
          /** @description Set to true to download the video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. */
          download_media?: boolean;
          /**
           * @description Set to false to omit `video_play_count` and skip its additional fetch for a faster response. Defaults to true.
           * @example true
           */
          include_play_count?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v2/instagram/media/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Generates AI speech-to-text for an Instagram video post or reel. Returns a transcripts array containing each video's id, shortcode, and text; no speech can produce null entries. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. For carousels, default pricing stays flat 1 credit per request. With allow_long_transcription=true, sum 10 * ceil(duration_seconds / 60) for each successfully transcribed video, rather than rounding the combined duration; images and empty video transcripts have no AI fee. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /** @description Instagram post or reel URL */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (By default, successful AI up to 120 seconds costs a flat 1 credit per request; over 120 seconds requires allow_long_transcription=true, which bills ALL successful AI at 10 credits per started minute, including short videos; empty AI results and errors cost 0 credits). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Instagram
     * @description Use this for Instagram-native account, hashtag, or place lookup. It returns ranked users, hashtags, places, and keyword suggestions from Instagram itself. It is not Google-indexed, does not require an Instagram login, returns one page only, and does not return posts. For an Instagram-curated topic page with posts, use /v1/instagram/search/popular. For the same native account results in a profile-only response, use /v1/instagram/search/profiles.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The username, hashtag, place, or keyword to search for.
           * @example nike
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/search/popular": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Popular Search
     * @description Use this to explore an Instagram topic and the posts Instagram curates for it. It scrapes the public /popular/{query} page without requiring an Instagram login. The first page returns the topic title, numeric total media count, Instagram's generated description and sources, suggested terms, posts, and an opaque cursor. Pass that cursor with the same query to fetch more posts. Later pages return query, posts, cursor, and has_more only. For an exact hashtag through Google-indexed results, use /v1/instagram/search/hashtag. For reels only, use /v2/instagram/reels/search. Each successful request costs 1 credit.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The Popular topic to search for.
           * @example basketball
           */
          query: string;
          /**
           * @description The opaque cursor returned by the previous response. Use it with the same query to fetch the next page of posts.
           * @example opaque-cursor-from-response
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/search/hashtag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Hashtag Posts
     * @description Use this when you know the exact hashtag and want Google-indexed public Instagram posts or reels, optional date filters, and pagination. It returns post details such as caption, engagement, owner, and post time. Results are best-effort and not a complete Instagram-native hashtag feed. For an Instagram-curated topic page with generated context and suggested terms, use /v1/instagram/search/popular. Pass media_type=reels to only return reels. Cursors are limited to pages 1 through 11; cursor 12 or greater returns a 400 response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The hashtag to search for. Include or omit the #.
           * @example makeup
           */
          hashtag: string;
          /**
           * @description Only return Google-indexed posts found in this relative window.
           * @example last-week
           */
          date_posted?:
            "last-hour" | "last-day" | "last-week" | "last-month" | "last-year";
          /**
           * @description Use all to search public posts and reels, or reels to only return reels. Defaults to all.
           * @example all
           */
          media_type?: "all" | "reels";
          /**
           * @description The cursor returned by the previous response. It is the next Google results page number and cannot exceed 11; cursor 12 or greater returns a 400 response.
           * @example 2
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/search/profiles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Instagram Profiles
     * @description Use this for Instagram-native profile lookup. It returns every account in Instagram's first ranked native result set, then performs bounded best-effort enrichment for the first 10 accounts to preserve the previous profile fields such as biography, bio links, account flags, and follower/following/media counts. Results after the first 10 retain native ID, username, full name, verification status, profile photo, and URL, while unavailable detail fields are null or empty. It does not search Google-indexed bios or captions, Google title/description fields are null, and pagination is not supported. For users, hashtags, places, and keyword suggestions together, use /v1/instagram/search.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The profile name or username to search for.
           * @example fitness coach
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v2/instagram/reels/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Reels
     * @description Use this when you only want Google-indexed Instagram reels matching a keyword or phrase, with optional date filters and pagination. It returns reel media, engagement, owner, location, and audio details. Results are best-effort rather than a complete Instagram-native search. For Instagram-curated topic posts, use /v1/instagram/search/popular. For an exact hashtag across posts and reels, use /v1/instagram/search/hashtag. Pages 1 through 11 are supported; page 12 or greater returns a 400 response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The keyword to search for
           * @example dogs
           */
          query: string;
          /**
           * @description Google-indexed date window. Recent hour/day filters are not supported because Google does not index Instagram reels reliably enough in those windows.
           * @example last-week
           */
          date_posted?: "last-week" | "last-month" | "last-year";
          /**
           * @description The page number to return. Must be between 1 and 11; page 12 or greater returns a 400 response.
           * @example 1
           */
          page?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/audio/reels": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Reels By Audio Id
     * @description Fetches the reels Instagram exposes for an audio page like instagram.com/reels/audio/{audio_id}/. Pass the audio_id from that URL. Use cursor from the previous response to request the next page when Instagram returns one.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The audio id from the Instagram audio page URL.
           * @example 1392969992841787
           */
          audio_id: string;
          /**
           * @description Pagination cursor returned by Instagram from the previous response.
           * @example Gsbyq-aju4eF02y...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/reels/trending": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Trending Reels
     * @description Discovers reels through Instagram's public Popular pages and current featured topics, with pagination handled internally. Each reel's actual publication timestamp is checked: posts older than seven days, posts with unavailable dates, and unavailable posts are excluded. Results are deduplicated within each response and ordered by available play counts. This is recent popular-Reels discovery, not Instagram's official global trending ranking or a measure of view growth. Returns up to 12 reels, and repeated calls can overlap. Returns `reels` with shortcode, URL, caption, publication date, media URLs, available engagement counts, and user info. Missing engagement counts may be null. Successful requests cost one credit; if Instagram supplies too few verified recent reels, the endpoint returns an uncharged 503 rather than including older posts.
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v2/instagram/post/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comments
     * @description Retrieves comments on a public Instagram post or reel. Each comment includes the comment text, creation timestamp, reply count when Instagram provides it, and commenter details such as username, user ID, verification status, and profile picture URL. `child_comment_count` can be null when Instagram does not expose the count publicly. Set `include_replies=true` to fetch the first page of replies for every returned comment. This adds `replies`, `replies_cursor`, and `has_more_replies` to each comment. This option always costs 15 credits because Scrape Creators makes a separate Instagram replies request for every comment in the response. It is possible that no replies are returned, but you will still be charged 15 credits because those reply lookups were performed. This option is much slower than a normal comments request and may time out at 29 seconds. Supports cursor-based pagination to load additional comment pages.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the post or reel to get comments from
           * @example https://www.instagram.com/reel/DOq6eV6iIgD
           */
          url: string;
          /**
           * @description The cursor to get more comments. Get 'cursor' from previous response.
           * @example eyJjYWNoZWRfY29tbWVud...
           */
          cursor?: string;
          /**
           * @description Set to true to include replies for every returned comment. This always costs 15 credits because each comment requires a separate Instagram replies request. You will still be charged 15 credits if no replies are returned. This is much slower and may time out at 29 seconds.
           * @example true
           */
          include_replies?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/post/comment/replies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comment Replies
     * @description Retrieves the public replies to a specific Instagram comment. Pass the post or reel URL and the parent comment's `id` from the Comments endpoint. Returns reply text, timestamps, engagement counts, parent comment ID, and user details. Paginate with `cursor` when `has_more` is true.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The Instagram post or reel URL
           * @example https://www.instagram.com/reel/C8rKmYvsrck
           */
          url: string;
          /**
           * @description The parent comment ID from the Comments endpoint
           * @example 18038110327814211
           */
          comment_id: string;
          /**
           * @description The cursor to get more replies. Get `cursor` from the previous response.
           * @example QVFDc29...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/user/highlights": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Story Highlights
     * @description Lists all story highlight albums for an Instagram user. Each highlight includes its ID, title, cover thumbnail URL, and owner info with username and profile picture. Accepts either a user_id or handle; providing user_id yields faster responses.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Instagram user id. Use for faster response times.
           * @example 2700692569
           */
          user_id?: string;
          /**
           * @description Instagram handle. Use user_id for faster response times.
           * @example jane
           */
          handle?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/user/highlight/detail": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Highlights Details
     * @description Fetches the full contents of a specific Instagram story highlight album by its ID. Returns the highlight's cover image, title, user info, and an items array containing each story with its media type, image or video URLs, dimensions, timestamp, and sticker/interactive element data. Useful for archiving or analyzing individual highlight reels.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The ID of the highlight to get details for
           * @example 18067016518767507
           */
          id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/profile/post-count": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Post Count
     * @description Returns the post count shown on a public Instagram profile. Use this endpoint when Profile returns media_count as null or edge_owner_to_timeline_media.count contains only the current batch size. This endpoint makes a separate Instagram profile-page request so it does not add latency to the main Profile endpoint. Full values such as 12,345 Posts return the exact integer with is_estimated set to false. For profiles with more than 10,000 posts, Instagram may expose only a compact value such as 12K Posts or 1.2M Posts. Set allow_estimated=true to return the scaled integer with is_estimated set to true. Estimated counts are opt-in: when allow_estimated is omitted or false, the endpoint returns an uncharged 422 response explaining that exact precision is unavailable. If Instagram omits the count entirely, the endpoint returns an error without deducting a credit.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Instagram handle
           * @example lifestyleperfume
           */
          handle: string;
          /** @description Set to true to return scaled estimates when Instagram abbreviates counts for profiles with more than 10,000 posts. Defaults to false; false or omitted returns an uncharged 422 when only an estimate is available. */
          allow_estimated?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/instagram/user/embed": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Embed HTML
     * @description Returns the raw HTML embed snippet for an Instagram user's profile widget. The response contains a single html string that can be inserted into a webpage to render an embeddable Instagram profile card. Requires the user's handle as input.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Instagram handle
           * @example jane
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Details
     * @description Retrieves comprehensive YouTube channel profile data including name, avatar images, subscriber count (subscribers), total video and view counts, join date, tags, and linked social accounts like Twitter and Instagram. Accepts a channelId, handle, or full channel URL as input. Returns channel metadata such as country, email, and external store links when available. Contact fields come from the submitted public profile. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description YouTube channel ID. Can pass a channelId, handle or url
           * @example UC-9-kyTW8ZkZNDHQJ6FgpwQ
           */
          channelId?: string;
          /**
           * @description YouTube channel handle. Can pass a channelId, handle or url
           * @example ThePatMcAfeeShow
           */
          handle?: string;
          /**
           * @description YouTube channel URL. Can pass a channelId, handle or url
           * @example https://www.youtube.com/@ThePatMcAfeeShow
           */
          url?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel-videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Videos
     * @description Fetches a paginated list of videos uploaded by a YouTube channel, including each video's title, URL, thumbnail, view count (views), publish date, duration, and description. Supports sorting by latest or popular, and use the continuationToken to page through all results. Optionally include extras like like count, comment count, and descriptions for each video.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description YouTube channel ID
           * @example UC-9-kyTW8ZkZNDHQJ6FgpwQ
           */
          channelId?: string;
          /**
           * @description YouTube channel handle
           * @example ThePatMcAfeeShow
           */
          handle?: string;
          /**
           * @description Sort by latest or popular
           * @example latest
           */
          sort?: "latest" | "popular";
          /**
           * @description Continuation token to get more videos. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
          /**
           * @description Set to 'true' to search YouTube's public paid product placement / sponsorship / endorsement search surface. This returns normal YouTube videos where the creator declared paid promotion. Cannot be combined with filter, uploadDate, sortBy, type, duration, or includeExtras.
           * @example false
           */
          is_paid_promotions?: string;
          /**
           * @description This will get you the like + comment count and the description. To get the full details of the video, use the /v1/youtube/video endpoint. Honestly, if you use this param, the error rate is higher. We might deprecate this param in the future.
           * @example false
           */
          includeExtras?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel/playlists": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Playlists
     * @description Fetches playlists from a YouTube channel's Playlists tab, including playlist ID, title, thumbnail, video count, channel info, playlist URL, and a continuationToken when YouTube has more results. Pass a handle or channelId for the first page, then pass continuationToken to page through more playlists.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description YouTube channel ID
           * @example UCX6OQ3DkcsbYNE6H8uQQuVA
           */
          channelId?: string;
          /**
           * @description YouTube channel handle
           * @example MrBeast
           */
          handle?: string;
          /**
           * @description Continuation token to get more playlists. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel/lives": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Lives
     * @description Fetches live streams and past streams from a YouTube channel's Live tab, including title, URL, thumbnail, view count, publish time, duration, and a continuationToken when YouTube has more results. Pass a handle or channelId for the first page, then pass continuationToken to page through more lives.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description YouTube channel ID
           * @example UCWsDFcIhY2DBi3GB5uykGXA
           */
          channelId?: string;
          /**
           * @description YouTube channel handle
           * @example IShowSpeed
           */
          handle?: string;
          /**
           * @description Continuation token to get more lives. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel/community-posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Community Posts
     * @description Fetches community posts from a YouTube channel's Posts tab, including post ID, URL, content, images, attached video, like count, publish time, channel info, and a continuationToken when YouTube has more results. Pass a handle or channelId for the first page, then pass continuationToken to page through more posts.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description YouTube channel ID
           * @example UCX6OQ3DkcsbYNE6H8uQQuVA
           */
          channelId?: string;
          /**
           * @description YouTube channel handle
           * @example MrBeast
           */
          handle?: string;
          /**
           * @description Continuation token to get more community posts. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/channel/shorts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Shorts
     * @description Retrieves a paginated list of short-form videos (Shorts) from a YouTube channel, including each short's title, URL, view count (views), likes, comments, description, and publish date. publishDate is a full ISO 8601 timestamp with an offset when YouTube exposes the exact publish time; otherwise it is null. It does not return date-only strings. Supports sorting by newest or popular; use the continuationToken to page through all results. Returns data in the shorts array.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Can pass channelId or handle
           * @example starterstory
           */
          handle?: string;
          /**
           * @description Can pass channelId or handle
           * @example UC-9-kyTW8ZkZNDHQJ6FgpwQ
           */
          channelId?: string;
          /**
           * @description Sort by newest or popular
           * @example newest
           */
          sort?: "newest" | "popular";
          /**
           * @description Continuation token to get more videos. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/video": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Video/Short Details
     * @description Fetches full details for a YouTube video or short, including title, description, thumbnail, view count (views), like count (likes), comment count, publish date, duration, genre, keywords, chapters, collaborators, and available caption tracks (subtitles/captions). isPaidPromotion is true when YouTube marks the video as including paid promotion and false when it does not. Also returns related recommended videos in watchNextVideos and channel info for the uploader. When YouTube exposes its public Most replayed graph, most_replayed contains normalized graph buckets in markers and YouTube's highlighted ranges in ranges. The field is null when the graph is not available. YouTube says the graph may be unavailable when the channel has active strikes, the content is potentially inappropriate, the video is too new or has too few views, or its systems deem the video ineligible for another reason. YouTube does not publish fixed age or view-count thresholds. Age-restricted videos return 403 with message: "This video is age restricted" because Scrape Creators only uses the public logged-out YouTube source.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description YouTube video or short URL
           * @example https://youtu.be/gTCi7PaOPLY
           */
          url: string;
          /**
           * @description Preferred response language (mapped to Accept-Language header; not guaranteed due to YouTube localization behavior). 2 letter language code, ie 'en', 'es', 'fr' etc.
           * @example en
           */
          language?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/video/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Retrieves publicly available captions, subtitles, or transcripts from a YouTube video or Short. Returns both a timestamped transcript array with start/end times and a plain-text version in transcript_only_text. Supports specifying a language code. Videos of any length are supported when YouTube exposes public captions. This endpoint does not use AI transcription. A returned transcript costs 1 credit; missing captions cost 0 credits. If no matching caption track is available, the transcript fields return null.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description YouTube video or short URL
           * @example https://www.youtube.com/watch?v=bjVIDXPP7Uk
           */
          url: string;
          /**
           * @description Language code, ie 'en', 'es', 'fr' or 'en-US'. Overrides the default track selection unless original_audio=true. If omitted, prefers captions matching the original spoken language when YouTube identifies the original audio. If that metadata is unavailable or ambiguous, prefers an auto-generated caption, otherwise the first caption track. If the requested or identified original language has no matching captions, the transcript will be null and no credits are charged.
           * @example en
           */
          language?: string;
          /**
           * @description Set to true to return captions only in the original spoken language identified by YouTube. Takes precedence over language. If the original audio cannot be reliably identified or has no matching captions, transcript, transcript_only_text, and language are null and no credits are charged. No extra lookup or credit cost; a returned transcript costs the usual 1 credit. Omit or set to false for the existing default selection.
           * @example true
           */
          original_audio?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/video/sponsors": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Video Sponsors
     * @description Experimental endpoint. Checks a YouTube video for the paid-promotion disclosure and infers likely sponsors/promoted brands from the public description, description links, promo-code text, and transcript. YouTube tells us that a video contains paid promotion, but it does not always tell us the sponsor directly, so this endpoint returns suspected sponsors with confidence and evidence. This is inferred, not an official YouTube sponsor field. Feedback welcome: support@scrapecreators.com
     */
    get: {
      parameters: {
        query: {
          /**
           * @description YouTube video or short URL
           * @example https://www.youtube.com/watch?v=AVO0ifle-OU
           */
          url: string;
          /**
           * @description 2 letter language code used for transcript lookup, ie 'en', 'es', 'fr' etc.
           * @example en
           */
          language?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches YouTube by keyword query and returns matching videos, channels, playlists, shorts, shelves, and live streams. Each video result includes title, URL, thumbnail, view count (views), publish date, duration, channel info, and badges. Supports filtering by upload date, sorting by relevance or popularity, and paginating with continuationToken. Set is_paid_promotions=true to search YouTube videos with the paid product placement / sponsorship disclosure.
     */
    get: {
      parameters: {
        query: {
          /** @description Search query. For stricter title matching, use YouTube's intitle: operator, for example intitle:"Foursquare Swarm". Quoted queries by themselves may still be broadened by YouTube when no fresh exact matches are available. */
          query: string;
          /** @description Upload date */
          uploadDate?: "today" | "this_week" | "this_month" | "this_year";
          /**
           * @description Sort by
           * @example relevance
           */
          sortBy?: "relevance" | "popular";
          /**
           * @description Type of content to search for
           * @example videos
           */
          type?: "videos" | "shorts" | "channels" | "playlists";
          /**
           * @description Duration of the video. Only applies to videos (not shorts).
           * @example under_3_min
           */
          duration?: "under_3_min" | "between_3_and_20_min" | "over_20_min";
          /**
           * @description 2 letter country code of the country to put the proxy in.
           * @example US
           */
          region?: string;
          /**
           * @description Continuation token to get more videos. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
          /**
           * @description This will get you the like + comment count and the description. To get the full details of the video, use the /v1/youtube/video endpoint. *This will slow down the response slightly.*
           * @example false
           */
          includeExtras?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/search/typeahead": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Typeahead
     * @description Returns the live search suggestions YouTube displays while a user types. Each result includes the suggested text and whether it is a normal query or a channel. When YouTube returns a channel suggestion, the response also includes its public channel ID, handle, name, and thumbnail.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Partial or complete YouTube search query
           * @example mr beast
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/search/hashtag": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search by Hashtag
     * @description Searches YouTube for content matching a specific hashtag and returns matching videos with title, URL, thumbnail, view count (views), publish date, duration, and channel info. Supports pagination via continuationToken and filtering to return all content types or only shorts.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Hashtag to search for
           * @example funny
           */
          hashtag: string;
          /**
           * @description Continuation token to get more videos. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
          /**
           * @description Search for all types of content or only shorts
           * @example all
           */
          type?: "all" | "shorts";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/video/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comments
     * @description Fetches comments and replies from a YouTube video, including each comment's text content, author details, like count, reply count, and publish date. Supports ordering by top or newest, and paginating with continuationToken. Limited to approximately 1,000 top comments or 7,000 newest comments.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description YouTube video URL
           * @example https://www.youtube.com/watch?v=dQw4w9WgXcQ
           */
          url: string;
          /**
           * @description Continuation token to get more comments. Get 'continuationToken' from previous response.
           * @example 4qmFsgKrCBIYVUNkRkpXVWE0M3NtUm00SXBIQnB
           */
          continuationToken?: string;
          /**
           * @description Order of comments
           * @example top
           */
          order?: "top" | "newest";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/video/comment/replies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comment Replies
     * @description Fetches replies to a specific comment on a YouTube video, including each reply's text content, author details (name, channel ID, avatar, verified/creator status), like count, and publish date. Requires a continuationToken obtained from the 'repliesContinuationToken' field on comments returned by the Comments endpoint. Supports paginating through additional replies with the continuationToken returned in each response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Continuation token for the comment replies. Use 'repliesContinuationToken' from the Comments endpoint, or 'continuationToken' from a previous replies response to paginate.
           * @example Eg0SC2RRdzR3OVdnWGNRGAYygwEaUBIa...
           */
          continuationToken: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/shorts/trending": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Trending Shorts
     * @description Fetches approximately 48 currently trending YouTube Shorts (viral/popular short-form videos) per call, returning each short's title, URL, thumbnail, view count (views), like count (likes), comment count, publish date, channel info, keywords, and duration. Each subsequent call returns a fresh batch of different trending shorts.
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/playlist": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Playlist
     * @description Retrieves a page of videos in a YouTube playlist, including each video's title, URL, thumbnail, duration, and channel. Accepts the playlist ID found in the 'list' URL parameter. The first page includes title, owner, and totalVideos. Later pages return videos and continuationToken without playlist metadata. Pass the previous response's continuationToken to get the next page. Stop when continuationToken is null. Each page costs 1 credit.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The ID of the YouTube playlist. In the YouTube URL it will be the 'list' parameter.
           * @example PLP32wGpgzmIlInfgKVFfCwVsxgGqZNIiS
           */
          playlist_id: string;
          /** @description Token from the previous response to get the next page. Omit for the first page. Stop when the returned continuationToken is null. */
          continuationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/youtube/community-post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Community Post Details
     * @description Retrieves the full details of a YouTube community post, including its text content, attached images, like count, publish date, and associated channel info. Also returns a linked video if the post includes one.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the YouTube community post to get
           * @example https://www.youtube.com/post/Ugkxvj2KoApYAXoqLWnKVr6zZe5JjeHrQeP8
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rumble/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches Rumble videos by keyword. Returns matching videos and shorts with title, URL, thumbnail, channel, published date, viewCountText, viewCountInt, and a numeric cursor for the next page.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query.
           * @example funny cats
           */
          query: string;
          /**
           * @description Cursor from the previous response. This is the next page number, like 2 or 3.
           * @example 2
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rumble/channel/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Videos
     * @description Gets videos from a Rumble channel by handle or URL. Returns channel metadata, videos, shorts, and a numeric cursor for the next page.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Rumble channel handle. If you'd prefer to use the URL instead, use the url parameter.
           * @example CuteCats223
           */
          handle?: string;
          /**
           * @description Rumble channel URL. If you'd prefer to use the handle instead, use the handle parameter.
           * @example https://rumble.com/c/CuteCats223
           */
          url?: string;
          /**
           * @description Cursor from the previous response. This is the next page number, like 2 or 3.
           * @example 2
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rumble/video": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Video
     * @description Gets Rumble video details by URL. Returns title, description, thumbnail, channel, publish date, view count, likes, dislikes, captions, and media metadata when available.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Rumble video URL.
           * @example https://rumble.com/v79xhhm-discovery-why-glenn-wants-israel-to-sue-the-new-york-times.html
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rumble/video/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Gets a Rumble video's transcript when captions are available. If Rumble does not expose captions for the video, transcript will be null and you will not be charged. Returned native captions cost 1 credit; empty transcripts and errors cost 0 credits. This endpoint does not use AI transcription.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Rumble video URL.
           * @example https://rumble.com/valm19-funny-cat-funny-cat.html
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/rumble/video/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comments
     * @description Gets all top level comments for a Rumble video by URL. Returns comment text, author, createdAt, createdAtText, likeCount, dislikeCount, and replyCount when comment bodies are public. If Rumble requires sign-in to view the comments, this endpoint returns HTTP 403 with error `forbidden` and does not charge credits. This is different from a public video with no comments, which returns a successful empty comments array.
     *
     *     Sign-in-required response example:
     *     ```json
     *     {
     *       "success": false,
     *       "credits_remaining": 100,
     *       "credits_charged": 0,
     *       "error": "forbidden",
     *       "errorStatus": 403,
     *       "message": "Rumble requires you to sign in to view this video's comments"
     *     }
     *     ```
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Rumble video URL.
           * @example https://rumble.com/v792vns-the-splc-is-a-deceitful-and-poisonous-group.-but-was-their-behavior-crimina.html?e9s=rel_v2_ep
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Person's Profile
     * @description Retrieves a person's public LinkedIn profile data, including their name, photo, location, follower count (followers), about/bio summary, recent posts, work experience, education, articles, activity feed, publications, projects, recommendations, and similar profiles. Only returns publicly available information visible in an incognito browser.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the LinkedIn profile to get
           * @example https://www.linkedin.com/in/parrsam/
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/company": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Company Page
     * @description Fetches a LinkedIn company page with details including name, description, logo, cover image, slogan, location, headquarters, employee count (headcount/staff size), website, industry, company type, founded year, specialties, funding rounds with investors, featured employees, recent posts, and similar company pages.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the LinkedIn company page to get
           * @example https://linkedin.com/company/shopify
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/company/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Company Posts
     * @description Retrieves paginated posts from a LinkedIn company or school page, including each post's URL, ID, publication date, and full text content. Accepts /company/ and /school/ URLs, such as https://www.linkedin.com/school/oxfordsbs/ for Oxford Saïd Business School. Supports page-based pagination up to a maximum of 7 pages due to a LinkedIn platform limitation.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The LinkedIn company (/company/) or school (/school/) page URL, for example https://www.linkedin.com/school/oxfordsbs/
           * @example https://linkedin.com/company/shopify
           */
          url: string;
          /**
           * @description The page number to get
           * @example 1
           */
          page?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/search/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Posts
     * @description Finds public LinkedIn posts, feed updates, and Pulse articles by keyword using Google Search, then returns post details such as description, author, media, images, like count, comment count, and published date when LinkedIn exposes them publicly. Results depend on what Google has indexed, so this is best-effort and not a complete LinkedIn-native search. Use date_posted for recent posts and pass the returned cursor to fetch the next page. Cursors are limited to pages 1 through 11; cursor 12 or greater returns a 400 response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword or phrase to search for in public LinkedIn posts
           * @example ai agents
           */
          query: string;
          /**
           * @description Date posted filter based on Google-indexed results
           * @example last-week
           */
          date_posted?:
            "last-hour" | "last-day" | "last-week" | "last-month" | "last-year";
          /**
           * @description The cursor returned from the previous response. The maximum cursor is 11; cursor 12 or greater returns a 400 response.
           * @example 2
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Fetches a single LinkedIn post or article, returning the title, headline, full description text, author info with follower count, publication date, like count (reactions), comment count, and individual comments. For public feed posts, activityUrn and contentUrn expose LinkedIn's public activity and underlying share or ugcPost URNs when present; either can be null when LinkedIn does not expose it. Also includes related articles from the same author in moreArticles.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the LinkedIn post to get
           * @example https://www.linkedin.com/pulse/being-father-has-made-me-better-leader-vice-versa-austen-allred/
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/post/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post Transcript
     * @description Fetches the transcript from a LinkedIn post video when LinkedIn exposes one publicly. Returns null with transcriptNotAvailable when the post has no transcript, and only deducts credits when a transcript is returned. Returned native captions cost 1 credit; empty transcripts and errors cost 0 credits. This endpoint does not use AI transcription.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the LinkedIn post to get the transcript from
           * @example https://www.linkedin.com/posts/gemini-35-flash-is-a-step-forward-for-google-ugcPost-7465082215316525056-MHBd/
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves public Facebook page details including category, address, email, phone, website, services, priceRange, rating, likeCount, talkingAboutCount, and followerCount. talkingAboutCount is nullable and only returned when Facebook exposes it publicly. Also returns adLibrary status with the page's ad activity and pageId. Optionally includes businessHours when get_business_hours is set to true. Contact fields come from the submitted public profile. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL. If Facebook shows an 18+ content gate, the response is still 200 with account_status: "age-restricted" and isPrivate: true. If Facebook shows a private content gate, the response is still 200 with account_status: "private" and isPrivate: true. If the page is not found, the response is 404 with accountDoesNotExist: true and isPrivate: false. Set include_gated_profile=true to also return limited public fields (such as id, name, category, likeCount, profilePicSmall, and links) when a profile is gated or age-restricted. This option only affects gated/age-restricted profiles, public profiles still return the normal full response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Facebook profile URL
           * @example https://www.facebook.com/mantraindianfolsom
           */
          url: string;
          /**
           * @description Get the business's hours
           * @example true
           */
          get_business_hours?: string;
          /**
           * @description When true, returns limited public fields for gated or age-restricted profiles. Ignored for normal public profiles, those still return the full response.
           * @example true
           */
          include_gated_profile?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/profile/reels": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Reels
     * @description Fetches up to 10 reels per request from a public Facebook page. Each reel includes id, url, view_count, description, creation_time, video_url, thumbnail, play_time_in_ms, and music details. Pagination requires passing both next_page_id and cursor from the previous response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Facebook page URL
           * @example https://www.facebook.com/pacemorby
           */
          url: string;
          /**
           * @description To paginate through to the next page
           * @example YXBwX2NvbGxlY3Rpb2......
           */
          next_page_id?: string;
          /**
           * @description To paginate through to the next page
           * @example AQHSFZtzkBauSDHgy8y......
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/search/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Videos
     * @description Searches Facebook's native public video search without a logged-in account and returns matching videos and Reels. This is not Google-indexed discovery or general Facebook text/photo-post search. Results follow Facebook's ranking and public availability, so coverage and ordering are not exhaustive or guaranteed. Requests can take several seconds; use a client timeout of at least 30 seconds. Temporary Facebook restrictions or upstream timeouts can return an uncharged error. Pass the returned cursor with the same query for the next page, and stop when cursor is null or has_more is false. Each successful search page costs 1 credit, including searches with no matches. Validation errors and upstream failures are not charged.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The keyword or phrase to search for
           * @example ai agents
           */
          query: string;
          /**
           * @description The opaque cursor returned by the previous response. Keep the query unchanged when paginating. Stop when cursor is null or has_more is false.
           * @example eyJ...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/profile/photos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Photos
     * @description Fetches photos from a public Facebook page with pagination support. Each photo includes photo_id, accessibility_caption, viewer_image with uri, height, and width, plus a thumbnail and direct url. Pagination requires passing both next_page_id and cursor from the previous response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Facebook page URL
           * @example https://www.facebook.com/Spurs
           */
          url: string;
          /**
           * @description To paginate through to the next page
           * @example YXBwX2NvbGxlY3Rpb2......
           */
          next_page_id?: string;
          /**
           * @description To paginate through to the next page
           * @example AQHSRM68MZ-AJKGSgRb0......
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/profile/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Posts
     * @description Returns publicly visible Facebook profile posts, limited to 3 posts per page due to API limitations. Each post includes id, text, url, reactionCount, commentCount, publishTime, videoDetails with sdUrl, hdUrl, and thumbnailUrl, plus topComments. Accepts either a url or pageId parameter, where pageId is faster.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Facebook profile URL
           * @example https://www.facebook.com/pacemorby
           */
          url?: string;
          /**
           * @description Facebook profile page id
           * @example 100063669491743
           */
          pageId?: string;
          /**
           * @description To paginate through the posts
           * @example Cg8Ob3JnYW5pY19jdXJzb3IJA...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/profile/events": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile Events
     * @description Get the events of a public Facebook page
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the public Facebook page
           * @example https://www.facebook.com/brickyardoldtown
           */
          url: string;
          /**
           * @description The cursor to paginate to get more events
           * @example eyJpZCI6IllYQndYMk52Ykd......
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Retrieves a single public Facebook post or reel by URL. Returns post_id, like_count, comment_count, share_count, view_count, description, creation_time, and author details, including the author handle when Facebook exposes a vanity profile URL. For some reels, Facebook does not expose the same view count on the individual post page that it shows on the profile Reels grid. This value can be null or lower than the public Reels badge. If you need the public Reel badge count, call /v1/facebook/profile/reels with the author URL and match the reel by post_id. For video posts, includes video sd_url, hd_url, thumbnail, and length_in_second. Optionally fetches comments and transcript via get_comments and get_transcript parameters. Transcription is opt-in via get_transcript=true. Default short AI (up to 120 seconds, inclusive) is included in the existing base endpoint price, with no extra AI fee. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. On detail routes, successful paid-mode AI costs are in addition to the existing base endpoint cost; media-download pricing is unchanged. Returned native captions leave the base endpoint price unchanged. Empty AI results and errors incur no AI fee; the base scrape fee still applies when the detail scrape succeeds. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /** @description Transcription is opt-in via get_transcript=true. Default short AI (up to 120 seconds, inclusive) is included in the existing base endpoint price, with no extra AI fee. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. On detail routes, successful paid-mode AI costs are in addition to the existing base endpoint cost; media-download pricing is unchanged. Returned native captions leave the base endpoint price unchanged. Empty AI results and errors incur no AI fee; the base scrape fee still applies when the detail scrape succeeds. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          get_transcript?: boolean;
          /**
           * @description The URL of the post to get
           * @example https://www.facebook.com/reel/1535656380759655
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit; default short AI is included; allow_long_transcription=true adds 10 credits per started minute to the existing base cost). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/post/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Returns the transcript text for a Facebook video post or reel. Existing transcripts or native captions are used first and cost 1 credit only when returned. Otherwise the public video is transcribed using AI. No transcript costs 0 credits. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /** @description Facebook post URL */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (Returned native captions cost 1 credit, even for long videos with the paid flag. By default, successful AI up to 120 seconds costs a flat 1 credit per request; over 120 seconds requires allow_long_transcription=true, which bills ALL successful AI at 10 credits per started minute, including short videos; empty AI results and errors cost 0 credits; no transcript: 0 credits). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/post/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comments
     * @description Fetches comments from a Facebook post or reel with cursor-based pagination. Each comment includes id, text, created_at, reply_count, reaction_count, and author details with name and profile_picture. Passing a feedback_id instead of a url significantly speeds up the request.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Facebook post URL (or reel URL)
           * @example https://www.facebook.com/reel/753347914167361
           */
          url?: string;
          /**
           * @description Using feedback_id (instead of url) will *really* speed up the request. You can get the feedback_id when you make a request to /v1/facebook/post.
           * @example ZmVlZGJhY2s6MTQ0NzY1NjMyMzM4Mzg0OA==
           */
          feedback_id?: string;
          /**
           * @description Cursor to get more comments. Get 'cursor' from previous response.
           * @example MToxNzU3MTA2NzYyOgF1P1VkxpkA9Ds4...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/post/comment/replies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Comment Replies
     * @description Get the replies to a comment.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The *feedback_id* of the comment. Be careful, this is not the comment id. You can get the feedback_id from the /v1/facebook/post/comments endpoint.
           * @example ZmVlZGJhY2s6MzM3MzYxMzI5OTQ4Nzc1NV8xOTI5NTk0OTE3Njg3MTcz
           */
          feedback_id: string;
          /**
           * @description The expansion_token of the comment. You can get the expansion_token from the /v1/facebook/post/comments endpoint.
           * @example MjoxNzc4NjM1MDM3OgF_JaMa3kMP9RIWC....
           */
          expansion_token: string;
          /**
           * @description The cursor to paginate to the next page
           * @example MToxNzc4NjM1MTIyOgF_w6rc3oH0HrKM2dLjla6A...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/group": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Facebook Group Info
     * @description Fetches the public information shown on a Facebook group's About page, including its description, privacy and visibility, member and activity counts, categories, administrators and moderators when Facebook exposes them, group history, and rules. Provide either url or group_id.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The Facebook group URL. Group sub-page URLs such as /about work too.
           * @example https://www.facebook.com/groups/366190054572553/about
           */
          url?: string;
          /**
           * @description The numeric Facebook group ID. Provide this instead of url if you already have it.
           * @example 366190054572553
           */
          group_id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/group/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Facebook Group Posts
     * @description Fetches posts from a public Facebook group, limited to 3 posts per page due to API limitations. Each post includes id, text, url, reactionCount, commentCount, publishTime, videoDetails, and topComments. Results are chronological by default. Supports TOP_POSTS, RECENT_ACTIVITY, CHRONOLOGICAL, and CHRONOLOGICAL_LISTINGS with cursor-based pagination.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The URL of the group
           * @example https://www.facebook.com/groups/1270525996445602/
           */
          url?: string;
          /**
           * @description The ID of the group
           * @example 742354120555345
           */
          group_id?: string;
          /**
           * @description How to sort the posts. Defaults to CHRONOLOGICAL.
           * @example CHRONOLOGICAL
           */
          sort_by?:
            | "TOP_POSTS"
            | "RECENT_ACTIVITY"
            | "CHRONOLOGICAL"
            | "CHRONOLOGICAL_LISTINGS";
          /**
           * @description The cursor to paginate to the next page
           * @example AQHRBjJCelNvdGRjH8s2j-6...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User
     * @description Retrieves public GitHub user details including name, bio, avatar, company, location, blog, follower counts, public repo counts, and account timestamps. Pass username, handle, or a full GitHub user url.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub username/handle of the user you want the details for
           * @example torvalds
           */
          handle?: string;
          /**
           * @description GitHub user URL, e.g. https://github.com/torvalds.
           * @example https://github.com/torvalds
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/repositories": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Repositories
     * @description Retrieves a user's public repositories with repo metadata like description, language, stars, forks, topics, license, visibility, default branch, and timestamps. Pass username, handle, or url. Supports pagination with cursor, plus GitHub's type, sort, and direction parameters.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub username/handle of the user you want the repositories for
           * @example torvalds
           */
          handle?: string;
          /**
           * @description GitHub user URL, e.g. https://github.com/kentcdodds.
           * @example https://github.com/kentcdodds
           */
          url?: string;
          /**
           * @description Repository type. Defaults to owner. GitHub also supports all and member.
           * @example owner
           */
          type?: "owner" | "all" | "member";
          /**
           * @description Sort by created, updated, pushed, or full_name. Defaults to updated.
           * @example updated
           */
          sort?: "created" | "updated" | "pushed" | "full_name";
          /**
           * @description Sort direction: ascending or descending.
           * @example desc
           */
          direction?: "asc" | "desc";
          /**
           * @description Cursor from the previous response. Defaults to 1.
           * @example 1
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/pull-requests": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Pull Requests
     * @description Searches public GitHub pull requests authored by a user using GitHub's public search index. Pass username, handle, or url. Optional since and until filters use YYYY-MM-DD created dates. Results include the PR title, repo, state, created_at, and url, sorted by newest created first.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description GitHub username/handle of the user you want pull requests for
           * @example torvalds
           */
          handle: string;
          /**
           * @description Only return pull requests created on or after this date. Use YYYY-MM-DD.
           * @example 2024-01-01
           */
          since?: string;
          /**
           * @description Only return pull requests created on or before this date. Use YYYY-MM-DD.
           * @example 2024-12-31
           */
          until?: string;
          /**
           * @description Cursor from the previous response. Defaults to 1.
           * @example 1
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/activity": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Activity
     * @description Retrieves GitHub profile contribution activity for a user from the public profile activity timeline. Defaults to the current year when year is not provided. Results come back one month at a time in the activity array. Pass cursor from the previous response to page backward through the year.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub handle
           * @example kentcdodds
           */
          handle?: string;
          /**
           * @description GitHub user URL, e.g. https://github.com/kentcdodds.
           * @example https://github.com/torvalds
           */
          url?: string;
          /**
           * @description When provided, returns profile contribution activity for that year. Defaults to the current year.
           * @example 2026
           */
          year?: number;
          /**
           * @description Cursor from the previous response. Pages backward by month through the selected year.
           * @example 1
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/followers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Followers
     * @description Retrieves public GitHub followers for a user. Each follower includes login, avatar, user URL, type, and GitHub IDs. Pass username, handle, or a full GitHub user url. Supports cursor pagination.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub username/handle of the user you want the followers for
           * @example torvalds
           */
          handle?: string;
          /**
           * @description GitHub user URL, e.g. https://github.com/torvalds.
           * @example https://github.com/torvalds
           */
          url?: string;
          /**
           * @description Cursor from the previous response. Defaults to 1.
           * @example 1
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/following": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Following
     * @description Retrieves public accounts followed by a GitHub user. Each account includes login, avatar, profile URL, type, and GitHub IDs. Pass username, handle, or a full GitHub profile url. Supports cursor pagination.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub handle
           * @example kentcdodds
           */
          handle?: string;
          /**
           * @description GitHub profile URL
           * @example https://github.com/kentcdodds
           */
          url?: string;
          /**
           * @description Cursor from the previous response. Defaults to 1.
           * @example 1
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/user/contributions": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Contributions
     * @description Retrieves the public GitHub contribution graph for a user and year, including total contributions and daily contribution counts/intensity. Pass github handle, or a full GitHub profile url. Defaults to the current year when year is not provided.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description GitHub handle
           * @example torvalds
           */
          handle?: string;
          /**
           * @description GitHub profile URL
           * @example https://github.com/torvalds
           */
          url?: string;
          /**
           * @description Contribution graph year. Defaults to the current year.
           * @example 2026
           */
          year?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/repository": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Repository
     * @description Retrieves public metadata for one GitHub repository, including owner, description, language, stars, forks, topics, license, visibility, default branch, open issues, and timestamps. Pass a full GitHub repository url.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description GitHub repository URL
           * @example https://github.com/torvalds/linux
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/trending/repositories": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Trending Repositories
     * @description Scrapes GitHub's public Trending repositories page. Returns ranked repositories with public URLs, descriptions, language, star/fork counts, stars for the selected range, and built-by users when GitHub shows them. Use language for paths like JavaScript or Python, since for daily/weekly/monthly, and spoken_language_code for GitHub's spoken language filter.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Optional coding language, e.g. javascript, python, or go.
           * @example javascript
           */
          language?: string;
          /**
           * @description Trending range: daily, weekly, or monthly. Defaults to daily.
           * @example daily
           */
          since?: "daily" | "weekly" | "monthly";
          /**
           * @description Optional spoken language code filter, e.g. en.
           * @example en
           */
          spoken_language_code?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/github/trending/developers": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Trending Developers
     * @description Scrapes GitHub's public Trending developers page. Returns ranked developers with username, name, public profile URL, avatar, and the popular repository GitHub shows for that developer when available. Use language for paths like javascript or python and since for daily/weekly/monthly.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Optional trending coding language, e.g. javascript, python, or go.
           * @example javascript
           */
          language?: string;
          /**
           * @description Trending range: daily, weekly, or monthly. Defaults to daily.
           * @example daily
           */
          since?: "daily" | "weekly" | "monthly";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/marketplace/location/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Marketplace Location Search
     * @description Searches Facebook Marketplace locations/cities and returns coordinates you can use with the Marketplace Search endpoint.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Location search query
           * @example Austin
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/marketplace/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Marketplace Search
     * @description Searches Facebook Marketplace listings by keyword and lat/lng. Each page contains up to 24 listings. Each listing includes creation_time as an ISO 8601 UTC timestamp when Facebook exposes an exact listing timestamp, plus listing_date_text when available; either field can be null. Pass category_id to restrict results to the numeric Facebook Marketplace category ID returned on listing results. Supports pagination with the returned cursor. Pass the cursor value back as-is. The sort and date filters use the same values as Facebook's Marketplace UI. creation_time_descend usually orders the first pages newest first, but Facebook can insert newer listings on later cursor pages. date_listed uses Facebook's calendar-day buckets, so last_24_hours can include listings from the prior calendar day rather than enforcing an exact rolling 24-hour cutoff. For alerting/new-item workflows, continue paging while has_next_page is true and dedupe by listing id.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search keyword
           * @example bike
           */
          query: string;
          /**
           * @description Numeric Facebook Marketplace category ID. Listing results include this value as category_id.
           * @example 1658310421102081
           */
          category_id?: string;
          /**
           * @description Latitude for the search location
           * @example 30.2677
           */
          lat: number;
          /**
           * @description Longitude for the search location
           * @example -97.7475
           */
          lng: number;
          /**
           * @description Search radius in kilometers
           * @example 65
           */
          radius_km?: number;
          /**
           * @description Minimum listing price
           * @example 100
           */
          min_price?: number;
          /**
           * @description Maximum listing price
           * @example 500
           */
          max_price?: number;
          /**
           * @description Facebook Marketplace sort option. creation_time_descend usually orders the first pages newest first, but Facebook can insert newer listings on later cursor pages.
           * @example creation_time_descend
           */
          sort_by?:
            | "suggested"
            | "distance_ascend"
            | "creation_time_descend"
            | "price_ascend"
            | "price_descend";
          /**
           * @description Delivery filter
           * @example local_pickup
           */
          delivery_method?: "all" | "local_pickup" | "shipping";
          /**
           * @description Condition filter
           * @example used_good
           */
          condition?: "new" | "used_like_new" | "used_good" | "used_fair";
          /**
           * @description Facebook Marketplace date filter. Uses the same calendar-day buckets as the UI, so last_24_hours can include listings from the prior calendar day.
           * @example 7
           */
          date_listed?:
            | "all"
            | "1"
            | "7"
            | "30"
            | "last_24_hours"
            | "last_7_days"
            | "last_30_days";
          /**
           * @description Availability filter
           * @example available
           */
          availability?: "available" | "sold" | "all";
          /**
           * @description Opaque pagination cursor returned from the previous response. Pass it back as-is.
           * @example eyJwZyI6MCwiYjJjIjp7...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/marketplace/item": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Marketplace Item
     * @description Fetches details for a Facebook Marketplace item by item id or Marketplace item URL, including title, description, price, location, condition, photos, seller, and availability flags. Rental listings can include listing_date_text and availability_text from Facebook's Marketplace GraphQL response, for example 'Listed over a week ago' and 'Available now'. creation_time can still be null when Facebook does not expose an exact timestamp.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Facebook Marketplace item id
           * @example 1656586118821988
           */
          id?: string;
          /**
           * @description Facebook Marketplace item URL
           * @example https://www.facebook.com/marketplace/item/1656586118821988/
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/events/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Events
     * @description Search for events by name. You can take a look at the page from Facebook we are getting the data from [here](https://www.facebook.com/events/search/?q=dogs)
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The query to search for
           * @example Event name or description
           */
          query: string;
          /**
           * @description The cursor to paginate to the next page
           * @example Abr1gHMU6H....
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/events": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Events
     * @description Get the events of a city. Check out this [link](https://www.facebook.com/events/explore/saint-petersburg-florida/111326725552547) for an example of where we are getting the data from.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the city's Facebook Events page
           * @example https://www.facebook.com/events/explore/saint-petersburg-florida/111326725552547
           */
          url: string;
          /** @description The time frame to search for. Defaults to all time */
          time?: "today" | "this_week" | "next_week";
          /**
           * @description The cursor to paginate to the next page
           * @example eyJzdGFydF...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/event/details": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Event Details
     * @description Get a specific event by its URL or id
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The ID of the event
           * @example 2255360061870188
           */
          id?: string;
          /**
           * @description The URL of the event
           * @example https://www.facebook.com/events/2255360061870188/
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/adLibrary/ad": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Details
     * @description Retrieves detailed information about a specific Facebook ad by its ID or URL. Returns adArchiveID, pageName, isActive, startDate, endDate, and a snapshot containing body, images, videos, display_format, link_url, and cta_text. Regulated ads may also include source-dependent aaa_info using the structure shown below. Political and social issue delivery data is normalized to location_audience and age_country_gender_reach_breakdown. Political location_audience rows include reach, and political delivery values are fractional shares, so 0.08 means 8%. Regional transparency data may use absolute reach counts. For ads with multiple versions, the ad creative is found in the snapshot.cards array rather than snapshot.body. Transcription is opt-in via get_transcript=true. Default short AI (up to 120 seconds, inclusive) is included in the existing base endpoint price, with no extra AI fee. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. On detail routes, successful paid-mode AI costs are in addition to the existing base endpoint cost; media-download pricing is unchanged. Returned native captions leave the base endpoint price unchanged. Empty AI results and errors incur no AI fee; the base scrape fee still applies when the detail scrape succeeds. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query?: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /** @description Transcription is opt-in via get_transcript=true. Default short AI (up to 120 seconds, inclusive) is included in the existing base endpoint price, with no extra AI fee. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. On detail routes, successful paid-mode AI costs are in addition to the existing base endpoint cost; media-download pricing is unchanged. Returned native captions leave the base endpoint price unchanged. Empty AI results and errors incur no AI fee; the base scrape fee still applies when the detail scrape succeeds. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          get_transcript?: boolean;
          /**
           * @description Facebook Ad Id
           * @example 702369045530963
           */
          id?: string;
          /**
           * @description Facebook Ad URL
           * @example https://www.facebook.com/ads/library?id=1185617869915074
           */
          url?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit; default short AI is included; allow_long_transcription=true adds 10 credits per started minute to the existing base cost). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/adLibrary/ad/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Transcript
     * @description Retrieves a transcript for a Facebook Ad Library video ad by ID or URL. Returned native captions cost 1 credit. Otherwise the public video URL is transcribed with AI. If the ad has no video or no transcript is available, transcript is null and the charge is 0 credits. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query?: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /**
           * @description Facebook Ad Id
           * @example 1020359190509080
           */
          id?: string;
          /**
           * @description Facebook Ad URL
           * @example https://www.facebook.com/ads/library?id=1020359190509080
           */
          url?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (Returned native captions cost 1 credit, even for long videos with the paid flag. By default, successful AI up to 120 seconds costs a flat 1 credit per request; over 120 seconds requires allow_long_transcription=true, which bills ALL successful AI at 10 credits per started minute, including short videos; empty AI results and errors cost 0 credits; no transcript: 0 credits). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/adLibrary/search/ads": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches the Meta Ad Library by keyword and returns matching ads. Supports filtering by language with a 2-letter code such as EN or ES. Each result includes ad_archive_id, page_name, is_active, publisher_platform, and a snapshot with body text, images, videos, and cta_text. Both GET and POST are supported. Use GET for normal requests. If the cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword to search for
           * @example running
           */
          query: string;
          /**
           * @description Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions.
           * @example total_impressions
           */
          sort_by?: "total_impressions" | "relevancy_monthly_grouped";
          /**
           * @description If you want to search by exact phrase or not
           * @example keyword_unordered
           */
          search_type?: "keyword_unordered" | "keyword_exact_phrase";
          /**
           * @description Search for all ads or only political and issue ads
           * @example all
           */
          ad_type?: "all" | "political_and_issue_ads";
          /**
           * @description This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL.
           * @example ALL
           */
          country?: string;
          /**
           * @description Language to filter ads on. Needs to be a 2 letter language code, such as EN, ES, or FR.
           * @example EN
           */
          language?: string;
          /**
           * @description Status of the ad. Defaults to ACTIVE.
           * @example ACTIVE
           */
          status?: "ALL" | "ACTIVE" | "INACTIVE";
          /**
           * @description Media type of the ad. Defaults to ALL. Meme just means the ad has text and an image. No clue why they call it meme.
           * @example ALL
           */
          media_type?:
            "ALL" | "IMAGE" | "VIDEO" | "MEME" | "IMAGE_AND_MEME" | "NONE";
          /**
           * @description Impressions start date. Needs to be in YYYY-MM-DD format.
           * @example 2025-01-05
           */
          start_date?: string;
          /**
           * @description Impressions end date. Needs to be in YYYY-MM-DD format.
           * @example 2025-02-16
           */
          end_date?: string;
          /**
           * @description Cursor to paginate through results
           * @example AQHRYLVDkoMkvGv7yK1rcce-vJmKiKv330R4v3j9KHSOaYvmF1bq1QkotG0rgW8Fkrj-
           */
          cursor?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    /**
     * Search
     * @description Searches the Meta Ad Library by keyword and returns matching ads. Supports filtering by language with a 2-letter code such as EN or ES. Each result includes ad_archive_id, page_name, is_active, publisher_platform, and a snapshot with body text, images, videos, and cta_text. Both GET and POST are supported. Use GET for normal requests. If the cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description Keyword to search for */
            query: string;
            /**
             * @description Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions.
             * @enum {string}
             */
            sort_by?: "total_impressions" | "relevancy_monthly_grouped";
            /**
             * @description If you want to search by exact phrase or not
             * @enum {string}
             */
            search_type?: "keyword_unordered" | "keyword_exact_phrase";
            /**
             * @description Search for all ads or only political and issue ads
             * @enum {string}
             */
            ad_type?: "all" | "political_and_issue_ads";
            /** @description This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. */
            country?: string;
            /** @description Language to filter ads on. Needs to be a 2 letter language code, such as EN, ES, or FR. */
            language?: string;
            /**
             * @description Status of the ad. Defaults to ACTIVE.
             * @enum {string}
             */
            status?: "ALL" | "ACTIVE" | "INACTIVE";
            /**
             * @description Media type of the ad. Defaults to ALL. Meme just means the ad has text and an image. No clue why they call it meme.
             * @enum {string}
             */
            media_type?:
              "ALL" | "IMAGE" | "VIDEO" | "MEME" | "IMAGE_AND_MEME" | "NONE";
            /** @description Impressions start date. Needs to be in YYYY-MM-DD format. */
            start_date?: string;
            /** @description Impressions end date. Needs to be in YYYY-MM-DD format. */
            end_date?: string;
            /** @description Cursor to paginate through results */
            cursor?: string;
            /** @description Set to true for a trimmed down version of the response */
            trim?: boolean;
          };
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/adLibrary/company/ads": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Company Ads
     * @description Fetches all ads currently running for a specific company from the Meta Ad Library. Each ad includes ad_archive_id, page_name, is_active, publisher_platform, and a snapshot with body, images, videos, and display_format. Supports filtering by country, media_type, date range, and language with cursor-based pagination. Both GET and POST are supported. If the cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The companies ad library page id. You can get this with my Search For Companies Endpoint. Can either use this or companyName
           * @example 367152833370567
           */
          pageId?: string;
          /**
           * @description The name of the company. Can either use this or pageId
           * @example Lululemon
           */
          companyName?: string;
          /**
           * @description This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL.
           * @example ALL
           */
          country?: string;
          /**
           * @description Status of the ad. Defaults to ACTIVE.
           * @example ACTIVE
           */
          status?: "ALL" | "ACTIVE" | "INACTIVE";
          /**
           * @description Media type of the ad. Defaults to ALL. Meme refers to ads with image and text. Not sure why they call it meme.
           * @example ALL
           */
          media_type?:
            "ALL" | "IMAGE" | "VIDEO" | "MEME" | "IMAGE_AND_MEME" | "NONE";
          /**
           * @description Language to filter ads on. Needs to be 2 letter language code, ie EN, ES, FR, etc
           * @example EN
           */
          language?: string;
          /**
           * @description Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions.
           * @example total_impressions
           */
          sort_by?: "total_impressions" | "relevancy_monthly_grouped";
          /**
           * @description Start date to search for. Format: YYYY-MM-DD
           * @example 2025-01-01
           */
          start_date?: string;
          /**
           * @description End date to search for. Format: YYYY-MM-DD
           * @example 2025-12-31
           */
          end_date?: string;
          /**
           * @description Cursor to paginate through results
           * @example AQHRBUAxNmFlxBVMFL6uTb1ICFsV65O4SqmPbcVZJhiveBpPS1hFHAmL6yCJcF760cXP
           */
          cursor?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    /**
     * Company Ads
     * @description Fetches all ads currently running for a specific company from the Meta Ad Library. Each ad includes ad_archive_id, page_name, is_active, publisher_platform, and a snapshot with body, images, videos, and display_format. Supports filtering by country, media_type, date range, and language with cursor-based pagination. Both GET and POST are supported. If the cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description The companies ad library page id. You can get this with my Search For Companies Endpoint. Can either use this or companyName */
            pageId?: string;
            /** @description The name of the company. Can either use this or pageId */
            companyName?: string;
            /** @description This can only be one country. It has to be the 2 letter code for the country. It defaults to ALL. */
            country?: string;
            /**
             * @description Status of the ad. Defaults to ACTIVE.
             * @enum {string}
             */
            status?: "ALL" | "ACTIVE" | "INACTIVE";
            /**
             * @description Media type of the ad. Defaults to ALL. Meme refers to ads with image and text. Not sure why they call it meme.
             * @enum {string}
             */
            media_type?:
              "ALL" | "IMAGE" | "VIDEO" | "MEME" | "IMAGE_AND_MEME" | "NONE";
            /** @description Language to filter ads on. Needs to be 2 letter language code, ie EN, ES, FR, etc */
            language?: string;
            /**
             * @description Sort by impressions (high to low), or Most Recent (relevancy_monthly_grouped). Defaults to impressions.
             * @enum {string}
             */
            sort_by?: "total_impressions" | "relevancy_monthly_grouped";
            /** @description Start date to search for. Format: YYYY-MM-DD */
            start_date?: string;
            /** @description End date to search for. Format: YYYY-MM-DD */
            end_date?: string;
            /** @description Cursor to paginate through results */
            cursor?: string;
            /** @description Set to true for a trimmed down version of the response */
            trim?: boolean;
          };
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/facebook/adLibrary/search/companies": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search for Companies
     * @description Searches for companies by name in the Meta Ad Library and returns their page IDs for use with other ad library endpoints. Each result includes page_id, name, category, likes, verification status, and Instagram details like ig_username and ig_followers.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword to search for
           * @example nike
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/ad-library/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Library Search
     * @description Searches TikTok's public Ads Library using either query for a general search or advertiser_name for advertiser-specific results. Advertiser-name searches resolve the name through TikTok's advertiser typeahead first, then search the selected advertiser entity and return adv_biz_ids on each ad. You can pass adv_biz_ids with advertiser_name to pin the exact advertiser shown in TikTok's See all ads link. TikTok requires the name with the ID and ignores an ID-only search, so provide exactly one of query or advertiser_name. If TikTok has no matching advertiser entity, the API falls back to TikTok's name search. Results are global, sorted by the latest shown date, support cursor pagination, and include a public TikTok Ads Library URL for each ad.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description General ad search. Provide either query or advertiser_name, not both.
           * @example The Creator Loop
           */
          query?: string;
          /**
           * @description Advertiser name to resolve through TikTok's typeahead and search by advertiser entity. Falls back to TikTok's name search when no entity matches. Provide either advertiser_name or query, not both.
           * @example Gymshark
           */
          advertiser_name?: string;
          /**
           * @description TikTok advertiser business ID from a See all ads link. Use it with advertiser_name to pin the exact advertiser. Required companion: advertiser_name; ID-only searches return 400 because TikTok ignores the ID without the name.
           * @example 7078923208527618049
           */
          adv_biz_ids?: string;
          /**
           * @description Opaque cursor returned from the previous response.
           * @example cursor from previous response
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/tiktok/ad-library/ad": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Library Ad
     * @description Fetches one TikTok ad by ID or URL. It first checks Creative Center Top Ads (ads.tiktok.com), then TikTok's public transparency Ads Library (library.tiktok.com) when the ID is not a Top Ads material. Both sources return the same response shape. Fields TikTok does not expose for a public Ads Library ad are null, empty, or false as appropriate.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Creative Center Top Ads material ID or URL, or a public Ads Library ad ID or library.tiktok.com detail URL.
           * @example 1869335220395266
           */
          ad_id: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/google/company/ads": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Company Ads
     * @description Fetches public ads for a company from the Google Ad Transparency Library by domain or advertiser_id. Each ad includes advertiserId, creativeId, format, adUrl, advertiserName, domain, firstShown, and lastShown. Costs 25 credits per request when get_ad_details=true; without it, only advertiserId and creativeId are returned at 1 credit.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The domain of the company
           * @example lululemon.com
           */
          domain?: string;
          /**
           * @description The advertiser id of the company
           * @example AR01614014350098432001
           */
          advertiser_id?: string;
          /**
           * @description The topic to search for. If you search for 'political', you will also need to pass a 'region', like 'US' or 'AU'
           * @example all
           */
          topic?: "all" | "political";
          /**
           * @description The region to search for. Defaults to anywhere
           * @example US
           */
          region?: string;
          /**
           * @description Start date to search for. Format: YYYY-MM-DD
           * @example 2025-08-01
           */
          start_date?: string;
          /**
           * @description End date to search for. Format: YYYY-MM-DD
           * @example 2025-08-11
           */
          end_date?: string;
          /**
           * @description Platform to search for.
           * @example youtube
           */
          platform?:
            | "google_maps"
            | "google_play"
            | "google_search"
            | "google_shopping"
            | "youtube";
          /**
           * @description Ad format to search for.
           * @example video
           */
          format?: "text" | "image" | "video";
          /**
           * @description Set to true to get the ad details. Will cost 25 credits.
           * @example false
           */
          get_ad_details?: string;
          /**
           * @description Cursor to paginate through results
           * @example CgoAP7znOo9RPjf%2FEhD5utgx8m75NrTTbU0AAAAAGgn8%2BJyW%2BJQK40A%3D
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/google/ad": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Details
     * @description Retrieves detailed information about a specific Google ad including advertiserId, creativeId, format, firstShown, lastShown, and overallImpressions. When Google publishes political-ad transparency data, spend contains the currency and amount bounds, while targeting contains included and excluded age, gender, and location criteria. Targeted locations include their Google criterion ID, display name, full name, and country codes. Optional fields are null when Google does not publish them. regionStats and platformImpressions use lower and upper impression bounds. Variations are best-effort, omit unparseable entries, and have creative-type-dependent fields; image creatives can expose an images array. Text extraction uses OCR, so accuracy may vary.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The url of the ad
           * @example https://adstransparency.google.com/advertiser/AR01614014350098432001/creative/CR10449491775734153217
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/google/adLibrary/advertisers/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Advertiser Search
     * @description Searches the Google Ad Transparency Library for advertisers by name. Returns a list of matching advertisers with their name, advertiser_id, and region, plus a list of associated website domains. Use the returned advertiser_id to look up a company's ads. Defaults to US when region is not passed, so pass a 2-letter country code like AU or CA when searching for advertisers in another region.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The query to search for
           * @example lululemon
           */
          query: string;
          /**
           * @description 2-letter country code to search in. Defaults to US when omitted.
           * @example AU
           */
          region?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/ads/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Ads
     * @description Searches the LinkedIn Ad Library by company name, keyword, or companyId with optional country and date filters. Custom date filtering requires both startDate and endDate. LinkedIn accepts dates from the date one year ago through yesterday. Each ad includes id, description, headline, adType, advertiser, targeting details, image or video URLs, totalImpressions, and impressionsByCountry. Date and impression fields are nullable when LinkedIn does not expose them on the public ad page. Supports pagination via paginationToken.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description The company name to search for. 'Microsoft' for example
           * @example microsoft
           */
          company?: string;
          /**
           * @description The keyword to search for
           * @example scraping
           */
          keyword?: string;
          /**
           * @description The company id to search for
           * @example 157238
           */
          companyId?: string;
          /**
           * @description Comma separated list of countries. Example: US,CA,MX
           * @example US,CA,MX
           */
          countries?: string;
          /**
           * @description Start date in YYYY-MM-DD format. Must be used with endDate and cannot be earlier than the date one year ago.
           * @example 2026-01-01
           */
          startDate?: string;
          /**
           * @description End date in YYYY-MM-DD format. Must be used with startDate and cannot be today or a future date.
           * @example 2026-09-01
           */
          endDate?: string;
          /**
           * @description Pagination token to paginate through results
           * @example 640547184-1743616612000
           */
          paginationToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkedin/ad": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Ad Details
     * @description Retrieves detailed information about a specific LinkedIn ad by URL. Returns id, description, headline, adType, advertiser, and targeting with language, location, and audience criteria. Also includes totalImpressions, impressionsByCountry, adDuration, startDate, and endDate. Date and impression fields are nullable when LinkedIn does not expose them on the public ad page.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The url of the ad
           * @example https://www.linkedin.com/ad-library/detail/666281156
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/search/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Posts
     * @description Finds public X/Twitter post URLs through Google Search, then returns their details using the same public post scraper as /v1/twitter/tweet. This is Google-indexed discovery, not native X search: coverage is incomplete, recent posts can be missing, and results are ranked by Google rather than newest first. Deleted, protected, or inaccessible posts are omitted. Each post uses the existing tweet response fields, including rest_id, legacy.full_text, legacy.created_at, engagement counts, author and media when available, plus a canonical url. Pass the returned cursor for the next Google page; cursors range from 1 through 11 and null means pagination has ended. The same post may appear on different pages. Each successful page costs 1 credit, including empty results; validation errors and upstream failures are not charged. Replaying cursor=null is uncharged. Allow at least 30 seconds for your client timeout.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword or phrase to search for in Google-indexed public X/Twitter posts
           * @example ai agents
           */
          query: string;
          /**
           * @description Pass the cursor returned by the previous response. Supported page cursors are 1 through 11. A null response cursor means there are no more pages.
           * @example 2
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Twitter user's profile by handle, including account metadata and statistics. Returns name, screen_name, description, followers_count, friends_count, statuses_count, favourites_count, location, profile_image_url_https, and is_blue_verified. Also includes verification_info, tipjar_settings, highlights_info, and creator_subscriptions_count.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitter handle
           * @example Austen
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/user-tweets": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Tweets
     * @description Fetches tweets from a Twitter user's profile by handle. Note: Twitter publicly returns only ~100 of the user's most popular tweets, not chronological or latest. Each tweet includes rest_id, full_text, views count, favorite_count, retweet_count, reply_count, bookmark_count, quote_count, created_at, media entities, and url. Supports a trim parameter for a lighter response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitter handle
           * @example levelsio
           */
          handle: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/tweet": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Tweet Details
     * @description Retrieves detailed information about a specific tweet by URL, including the author's profile and engagement metrics. Returns rest_id, full_text, views count, favorite_count, retweet_count, reply_count, bookmark_count, quote_count, created_at, source, and media entities. Supports a trim parameter for a lighter response.
     */
    get: {
      parameters: {
        query: {
          /** @description Tweet URL */
          url: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/tweet/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Transcript
     * @description Extracts an AI transcript from a Twitter video tweet. This route uses AI transcription, not native captions. Returns a success flag and transcript text. No transcript costs 0 credits. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /**
           * @description Tweet URL
           * @example https://x.com/TheoVon/status/1916982720317821050
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (Returned native captions cost 1 credit, even for long videos with the paid flag. By default, successful AI up to 120 seconds costs a flat 1 credit per request; over 120 seconds requires allow_long_transcription=true, which bills ALL successful AI at 10 credits per started minute, including short videos; empty AI results and errors cost 0 credits; no transcript: 0 credits). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/community": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Community
     * @description Retrieves details about a Twitter/X Community by URL. Returns the community name, description, rest_id, join_policy, created_at, member_count, rules, and creator_results with the creator's profile. Also includes members_facepile_results with avatar images of recent members.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Community URL
           * @example https://x.com/i/communities/1926186499399139650
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitter/community/tweets": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Community Tweets
     * @description Fetches tweets posted within a Twitter/X Community by URL. Returns an array of tweets, each with id, full_text, view_count, favorite_count, retweet_count, reply_count, bookmark_count, quote_count, created_at, and source. Each tweet includes a user object with the author's name, screen_name, avatar, followers_count, and is_blue_verified status.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Community URL
           * @example https://x.com/i/communities/1926186499399139650
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/subreddit/details": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Subreddit Details
     * @description Retrieves metadata about a subreddit by name or URL. The subreddit name must be case-sensitive. Returns display_name, description, subscribers, weekly_active_users, weekly_contributions, rules, icon_img, header_img, advertiser_category, submit_text, and created_at.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Subreddit name. MUST be case sensitive. So 'AskReddit' not 'askreddit'.
           * @example AskReddit
           */
          subreddit?: string;
          /**
           * @description Subreddit URL
           * @example https://www.reddit.com/r/AbsoluteUnits/
           */
          url?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/subreddit": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Subreddit Posts
     * @description Fetches posts from a subreddit with sorting and filtering options. Each post includes title, author, link_flair_text when Reddit exposes it, selftext, score, ups, upvote_ratio, num_comments, created_utc, url, permalink, subreddit_subscribers, and is_video. Supports sort (best, hot, new, top, rising), timeframe filtering, pagination via the after token, and a trim parameter for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /** @description Subreddit name */
          subreddit: string;
          /** @description Timeframe to get posts from */
          timeframe?: "all" | "day" | "week" | "month" | "year";
          /** @description Sort order */
          sort?: "best" | "hot" | "new" | "top" | "rising";
          /**
           * @description After to get more posts. Get 'after' from previous response.
           * @example t3_1234567890
           */
          after?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/subreddit/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Subreddit Search
     * @description Searches within a specific subreddit for posts, comments, and media matching a query. Returns posts with title, votes, num_comments, url, and created_at; comments with author, body, votes, and parent post info; and media with title, media_type, image dimensions, and gallery_count. Supports sort, timeframe filtering, and cursor-based pagination.
     */
    get: {
      parameters: {
        query: {
          /** @description Subreddit name (e.g. 'Fitness', not 'r/Fitness' or a full URL) */
          subreddit: string;
          /**
           * @description Search query to find matching content
           * @example push ups
           */
          query?: string;
          /** @description Sort order. For posts/media: relevance, hot, top, new, comments. For comments: relevance, top, new */
          sort?: "relevance" | "hot" | "top" | "new" | "comments";
          /** @description Timeframe to filter results */
          timeframe?: "all" | "year" | "month" | "week" | "day" | "hour";
          /**
           * @description Cursor to get more results. Get 'cursor' from previous response.
           * @example eyJjYW5kaWRhdGVzX3JldHVybmVkIjoi...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Retrieves public Reddit post details by URL without fetching or returning comments. Returns the text post body in selftext when present, plus the title, author, subreddit, score, upvote ratio, comment count, timestamps, permalink, and post flags. Accepts canonical Reddit post URLs and Reddit mobile share URLs.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Reddit post URL
           * @example https://www.reddit.com/r/webscraping/comments/1q6pxwn/just_started_web_scraping_is_this_a_good_start/
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/post/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post Comments
     * @description Retrieves comments and post details from a Reddit post by URL. Returns the post with title, author, score, ups, upvote_ratio, num_comments, and created_utc, plus a comments array where each comment includes author, body, body_html, score, created_utc, parent_id, permalink, and nested replies. Both GET and POST are supported. Use GET for normal requests. Pass one opaque cursor exactly as returned by more.cursor or replies.more.cursor to load the next page. Cursor batching and comma-separated cursor values are not supported. If an opaque cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body. Supports cursor-based pagination for loading more comments and a trim parameter for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Reddit post URL
           * @example https://www.reddit.com/r/AskReddit/comments/ablzuq/people_who_havent_pooped_in_2019_yet_why_are_you/
           */
          url: string;
          /**
           * @description One opaque cursor returned by the previous response to get more comments or replies. Do not combine multiple cursors.
           * @example opaque_cursor_returned_by_previous_response
           */
          cursor?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    /**
     * Post Comments
     * @description Retrieves comments and post details from a Reddit post by URL. Returns the post with title, author, score, ups, upvote_ratio, num_comments, and created_utc, plus a comments array where each comment includes author, body, body_html, score, created_utc, parent_id, permalink, and nested replies. Both GET and POST are supported. Use GET for normal requests. Pass one opaque cursor exactly as returned by more.cursor or replies.more.cursor to load the next page. Cursor batching and comma-separated cursor values are not supported. If an opaque cursor becomes too large after extensive pagination, use POST and send the same parameters in the JSON body. Supports cursor-based pagination for loading more comments and a trim parameter for lighter responses.
     */
    post: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody: {
        content: {
          "application/json": {
            /** @description Reddit post URL */
            url: string;
            /** @description One opaque cursor returned by the previous response to get more comments or replies. Do not combine multiple cursors. */
            cursor?: string;
            /** @description Set to true for a trimmed down version of the response */
            trim?: boolean;
          };
        };
      };
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/post/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post Transcript
     * @description Gets the transcript from a Reddit video post or direct v.redd.it URL when Reddit exposes a VTT caption file. Returns the raw WebVTT in raw_vtt plus a parsed plain-text transcript. If Reddit does not expose captions for the video, transcript is null and transcriptNotAvailable is true. Returned native captions cost 1 credit; empty transcripts and errors cost 0 credits. This endpoint does not use AI transcription.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Reddit post URL or direct v.redd.it video URL
           * @example https://www.reddit.com/r/youseeingthisshit/comments/1oiu9xm/football_nostalgiasaints_punter_head_coach_cant/
           */
          url: string;
          /**
           * @description 2 letter language code. Defaults to en.
           * @example en
           */
          language?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/reddit/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches across all of Reddit for posts or comments matching a query. Set filter to posts (the default) or comments. Post results include title, author, selftext, subreddit, score, ups, upvote_ratio, num_comments, created_utc, url, permalink, and is_video. Comment results include the matching body, author, votes, timestamps, comment URL, parent relationship, and post/subreddit context. Comment searches support relevance, new, and top sorting. Timeframe filtering applies to post searches. Pagination uses the after token, and trim returns a lighter response.
     */
    get: {
      parameters: {
        query: {
          /** @description Search query */
          query: string;
          /**
           * @description Search posts or comments
           * @example posts
           */
          filter?: "posts" | "comments";
          /**
           * @description Sort by. Comment search supports relevance, new, and top; comment_count is for post search only.
           * @example relevance
           */
          sort?: "relevance" | "new" | "top" | "comment_count";
          /**
           * @description Post search timeframe
           * @example all
           */
          timeframe?: "all" | "day" | "week" | "month" | "year";
          /**
           * @description Used to paginate to next page
           * @example t3_1i8z28z
           */
          after?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/truthsocial/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Truth Social user's public profile including display_name, username, avatar, header, followers_count, following_count, statuses_count, verified status, website, and created_at. Only prominent public figures (e.g., Trump, Vance) are accessible without authentication; most other accounts will not work.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Truth Social username
           * @example realDonaldTrump
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/truthsocial/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Posts
     * @description Fetches a paginated list of posts from a Truth Social user, returning text, id, created_at, url, content, account info, media_attachments, card link previews, replies_count, reblogs_count, and favourites_count. Supports pagination via next_max_id and a trim option for lighter responses. Only prominent public figures (e.g., Trump, Vance) are accessible without authentication.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Truth Social username
           * @example realDonaldTrump
           */
          handle?: string;
          /**
           * @description Truth Social user id. Use this for faster response times. Trumps is 107780257626128497. It is the 'id' field in the profile endpoint.
           * @example 107780257626128497
           */
          user_id?: string;
          /**
           * @description Used to paginate to next page
           * @example 107780257626128497
           */
          next_max_id?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/truthsocial/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Fetches a single Truth Social post by URL, returning text, id, created_at, url, content, account details, media_attachments, card link previews, replies_count, reblogs_count, and favourites_count. Set download_media=true to download attached images or video and return permanent Supabase URLs. Only posts from prominent public figures (e.g., Trump, Vance) are accessible without authentication.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Truth Social post URL
           * @example https://truthsocial.com/@realDonaldTrump/posts/114315219437063160
           */
          url: string;
          /** @description Set to true to download the attached video/images and get back permanent Supabase URLs. Costs 10 credits if media is found, 1 credit otherwise. */
          download_media?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/threads/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Threads user's public profile including username, full_name, biography, profile_pic_url, follower_count, is_verified, bio_links, and hd_profile_pic_versions. Also indicates whether the account is a threads-only user via is_threads_only_user.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Threads username
           * @example trendspider
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/threads/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Posts
     * @description Fetches the most recent posts from a Threads user, returning id, caption text, code, like_count, reshare_count, direct_reply_count, repost_count, image_versions2, video_versions, and taken_at. Only the last 20-30 posts are publicly visible. Supports a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Threads username
           * @example trendspider
           */
          handle: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/threads/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Fetches a single Threads post by URL, returning the post's caption, like_count, view_counts, reshare_count, direct_reply_count, image_versions2, text_post_app_info, and taken_at. Also includes comments, threadItems, and relatedPosts arrays. threadItems contains public continuation posts by the original author and stays separate from comments. Supports a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the post to get
           * @example https://www.threads.com/@trendspider/post/DIU8naHS6q_
           */
          url: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/threads/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search by Keyword
     * @description Searches Threads for posts matching a keyword, returning up to 10 results with caption text, like_count, reshare_count, direct_reply_count, user info, and image_versions2. Supports optional start_date and end_date filters plus a trim option. Only 10 results are returned per request due to public API limitations.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Keyword to search for
           * @example basketball
           */
          query: string;
          /**
           * @description Start date to search for
           * @example 2026-01-01
           */
          start_date?: string;
          /**
           * @description End date to search for
           * @example 2026-01-01
           */
          end_date?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/threads/search/users": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search Users
     * @description Searches for Threads users by username, returning matching profiles with username, full_name, profile_pic_url, is_verified, and pk. Useful for finding user accounts before fetching their profile or posts.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Username to search for
           * @example shams
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/bluesky/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Bluesky user's public profile including handle, displayName, avatar, description, followersCount, followsCount, postsCount, createdAt, and verification status. The associated field shows counts for lists, feed generators, and starter packs.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Bluesky handle
           * @example espn.com
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/bluesky/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Posts
     * @description Fetches a paginated feed of posts from a Bluesky user, returning each post's uri, record text, author info, embed content, replyCount, repostCount, likeCount, quoteCount, and indexedAt. Supports pagination via cursor. Use user_id (the 'did') instead of handle for faster response times.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Bluesky handle
           * @example espn.com
           */
          handle?: string;
          /**
           * @description Bluesky 'did'. (For some reason Bluesky calls their user ids, 'did' for whatever reason)
           * @example did:plc:x7d6j54pm22ufehkes6jo4jf
           */
          user_id?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/bluesky/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Fetches a single Bluesky post by URL, returning the post's record text, author info, embed content, replyCount, repostCount, likeCount, and quoteCount. Also includes a replies array with threaded reply posts.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Bluesky post URL
           * @example https://bsky.app/profile/espn.com/post/3lqdfq7fkvm2g
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/pinterest/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches Pinterest for pins matching a query, returning results with id, url, title, description, images, link, domain, board info, and pinner details. Supports pagination via cursor and a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query
           * @example Italian Pot Roast
           */
          query: string;
          /**
           * @description Cursor
           * @example Y2JVSG81V2sxcmNHRlpWM1J...
           */
          cursor?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/pinterest/pin": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Pin
     * @description Fetches detailed information about a single Pinterest pin by URL, returning title, description, link, dominantColor, originPinner, pinner, images at multiple resolutions (imageSpec_236x through imageSpec_orig), and pinJoin with visual annotations. Supports a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Pinterest pin URL
           * @example https://www.pinterest.com/pin/1124351863225567517/
           */
          url: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/pinterest/user/boards": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Boards
     * @description Fetches a paginated list of boards for a Pinterest user, returning each board's name, url, description, pin_count, follower_count, owner info, cover_images, and created_at. Supports pagination via cursor and a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The username of the user to get boards for. (e.g. broadstbullycom from https://www.pinterest.com/broadstbullycom/)
           * @example broadstbullycom
           */
          handle: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/pinterest/board": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Board
     * @description Fetches a paginated list of pins from a Pinterest board by URL, returning each pin's id, description, title, images, board info, pin_join annotations, and aggregated_pin_data. Supports pagination via cursor and a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description The URL of the board to get
           * @example https://www.pinterest.com/lizmrodgers/moms-night/
           */
          url: string;
          /**
           * @description The cursor to get the next page of results
           * @example Y2JURlEwTWsxNlp6Vk9SR2MwV....
           */
          cursor?: string;
          /**
           * @description Set to true for a trimmed down version of the response
           * @example false
           */
          trim?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/google/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Performs a Google search and returns organic results with url, title, and description for each result. Supports an optional region parameter (2-letter country code) to get localized results from a specific country. Pages 1 through 11 are supported; requests for page 12 or greater return a 400 response.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query
           * @example news
           */
          query: string;
          /**
           * @description 2 letter country code, ie US, UK, CA, etc This will show results from that country
           * @example US
           */
          region?: string;
          /**
           * @description Date posted
           * @example last-hour
           */
          date_posted?:
            "last-hour" | "last-day" | "last-week" | "last-month" | "last-year";
          /**
           * @description Page number to retrieve. Must be between 1 and 11; page 12 or greater returns a 400 response.
           * @example 1
           */
          page?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitch/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Twitch user's public profile by handle, including identity, social links, and content. Returns id, handle, displayName, description, followers count, and linked social accounts (instagram, x, tiktok). Also includes allVideos with game info, duration, and view counts, featuredClips with clip metadata and thumbnails, and similarStreamers.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitch handle
           * @example ishowspeed
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitch/user/videos": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Videos
     * @description Fetches a list of videos (100 max) for a Twitch user, returning each video's id, slug, url, embedURL, title, viewCount, language, durationSeconds, game info, broadcaster details with follower count, thumbnailURL, and videoQualities at multiple resolutions with a signed videoURL for playback. Supports pagination via cursor and a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitch handle
           * @example ishowspeed
           */
          handle: string;
          /** @description Filter by */
          filter_by?: "HIGHLIGHT" | "ARCHIVE" | "UPLOAD";
          /** @description Sort by */
          sort_by?: "TIME" | "VIEWS";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitch/user/schedule": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Schedule
     * @description Fetches a user's schedule by handle, returning a list of scheduled events with start time, end time, title, description, and thumbnail URL. Supports pagination via cursor and a trim option for lighter responses.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitch handle
           * @example emongg
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitch/clip/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Clip Transcript
     * @description Gets a transcript from a public Twitch clip. Checks native captions first; returned native captions cost 1 credit. Set use_ai_as_fallback=true to opt into paid AI only when captions are unavailable. No transcript costs 0 credits. transcript_source is native, ai, or null. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /**
           * @description Twitch clip URL
           * @example https://clips.twitch.tv/WrongMagnificentTomatoCorgiDerp-C720OEMqocSPbrqA
           */
          url: string;
          /** @description Use paid AI only when native captions are unavailable. Defaults to false. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          use_ai_as_fallback?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/twitch/clip": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Clip
     * @description Fetches detailed data for a Twitch clip by URL, including metadata and direct video URLs. Returns clip id, slug, url, embedURL, title, viewCount, language, durationSeconds, game info, broadcaster details with follower count, thumbnailURL, and videoQualities at multiple resolutions with a signed videoURL for playback. Also includes additional clips from the same broadcaster.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Twitch clip URL
           * @example https://www.twitch.tv/staryuuki/clip/CloudySavageMarjoramRuleFive--ErzsYbE7UWvgCMQ?filter=clips&range=all&sort=time
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/apple-music/artist": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Artist
     * @description Retrieves public Apple Music artist details, including artwork, editorial notes, top songs, albums, music videos, playlists, and related sections.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Apple Music artist id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 159260351
           */
          id?: string;
          /**
           * @description Apple Music artist URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://music.apple.com/us/artist/taylor-swift/159260351
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/apple-music/album": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Album
     * @description Retrieves public Apple Music album details, including title, artist, artwork, release info, tracks, and more by the artist.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Apple Music album id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 1468058165
           */
          id?: string;
          /**
           * @description Apple Music album URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://music.apple.com/us/album/lover/1468058165
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/apple-music/track": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Track
     * @description Retrieves public Apple Music song details by id or URL. Album track URLs with an i= song id are supported.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Apple Music song id. Some songs have standalone song URLs; for album tracks, use the url parameter.
           * @example 1833328840
           */
          id?: string;
          /**
           * @description Apple Music song URL or album track URL.
           * @example https://music.apple.com/us/album/lover/1468058165?i=1468058169
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/apple-music/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Searches Apple Music and returns public result sections for artists, albums, songs, playlists, stations, and music videos. Use type=song, album, artist, playlist, or all.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query
           * @example taylor swift
           */
          query: string;
          /**
           * @description Result type to return. Use all, song, album, artist, playlist, station, music_video, or radio_episode.
           * @example song
           */
          type?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/artist": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Artist
     * @description Retrieves detailed information about a Spotify artist by their handle, including name, followers count, genres, and related artists. Accepts a handle as input and returns artist metadata such as id, name, followers, genres, and related artists.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify artist id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 0cGUm45nv7Z6M6qdXYQGTX
           */
          id?: string;
          /**
           * @description Spotify artist URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/artist/0cGUm45nv7Z6M6qdXYQGTX
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/track": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Track
     * @description Retrieves detailed information about a Spotify track by its id or URL, including track metadata, artists, album info, duration, playability, and sharing details.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify track id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 1ITJflybJsfarsUtiBvkfK
           */
          id?: string;
          /**
           * @description Spotify song URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/track/1ITJflybJsfarsUtiBvkfK
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/album": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Album
     * @description Retrieves detailed information about a Spotify album by its id or URL, including album metadata, artists, release date, cover art, copyright info, tracks, and sharing details.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify album id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 0pgrg7phBbnwGJ2HBEl9EG
           */
          id?: string;
          /**
           * @description Spotify album URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/album/0pgrg7phBbnwGJ2HBEl9EG
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/playlist": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Playlist
     * @description Retrieves public Spotify playlist metadata and up to 50 tracks by playlist id or URL. For playlists with more tracks, pass the returned cursor into the next request until cursor is null.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify playlist id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 37i9dQZF1DX4UtSsGT1Sbe
           */
          id?: string;
          /**
           * @description Spotify playlist URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/playlist/37i9dQZF1DX4UtSsGT1Sbe
           */
          url?: string;
          /**
           * @description Cursor returned by the previous response. Omit it for the first page.
           * @example 50
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Search Spotify for tracks, artists, albums, episodes, podcasts, and audiobooks. Use type=podcasts when you need podcast ids for the podcast endpoints.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search query
           * @example my first million
           */
          query: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/podcast": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Podcast
     * @description Retrieves detailed information about a Spotify podcast by its id or URL. Spotify calls podcasts shows internally, so Spotify podcast URLs use /show/.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify podcast id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 3mliji9352UAk3XnWElnDV
           */
          id?: string;
          /**
           * @description Spotify podcast URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/show/3mliji9352UAk3XnWElnDV
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/spotify/podcast/episodes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Podcast Episodes
     * @description Returns episodes for a Spotify podcast. Pass the cursor returned by a response to get the next page.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Spotify podcast id. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example 4rOoJ6Egrf8K2IrywzwOMk
           */
          id?: string;
          /**
           * @description Spotify podcast URL. If you'd prefer to use the id instead, you can use the id parameter instead.
           * @example https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk
           */
          url?: string;
          /**
           * @description Cursor returned by the previous response. Omit for the first page.
           * @example 50
           */
          cursor?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/soundcloud/artist": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Artist
     * @description Fetches detailed information about a SoundCloud artist by its handle or URL. Returns artist metadata including id, name, followers, etc
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description SoundCloud artist handle. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example kehlanimusic
           */
          handle?: string;
          /**
           * @description SoundCloud artist URL. If you'd prefer to use the handle instead, you can use the handle parameter instead.
           * @example https://soundcloud.com/kehlanimusic
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/soundcloud/artist/tracks": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Artist Tracks
     * @description Fetches tracks/songs for a SoundCloud artist by handle or URL. Returns the artist profile, track list, and pagination info from SoundCloud.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description SoundCloud artist handle. If you'd prefer to use the URL instead, you can use the url parameter instead.
           * @example kehlanimusic
           */
          handle?: string;
          /**
           * @description SoundCloud artist tracks URL. If you'd prefer to use the handle instead, you can use the handle parameter instead.
           * @example https://soundcloud.com/kehlanimusic
           */
          url?: string;
          /**
           * @description Cursor to get more tracks. Get 'cursor' from previous response.
           * @example 2026-04-23T00:00:00.000Z,tracks,00000000002319251642
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/soundcloud/track": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Track
     * @description Fetches detailed information about a SoundCloud track/song by URL. Returns track title, plays, likes, reposts, comments, artwork, artist, and other SoundCloud metadata.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description SoundCloud track URL.
           * @example https://soundcloud.com/kehlanimusic/lights-on-feat-big-sean
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/kwai/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Fetches public Kwai profile data including username, bio, avatar, verification status, gender, and public counts. Uses Kwai's public web API endpoint, not HTML scraping.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Kwai profile handle. Use this or url.
           * @example KwaiBrasilOficial
           */
          handle?: string;
          /**
           * @description Kwai profile URL. Use this or handle.
           * @example https://www.kwai.com/@KwaiBrasilOficial
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/kwai/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Posts
     * @description Fetches a paginated list of public Kwai posts for a user, including captions, media URLs, covers, counts, author info, and the next cursor when more results are available. Uses Kwai's public web API endpoint, not HTML scraping.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Kwai profile handle. Use this or url.
           * @example KwaiBrasilOficial
           */
          handle?: string;
          /**
           * @description Kwai profile URL. Use this or handle.
           * @example https://www.kwai.com/@KwaiBrasilOficial
           */
          url?: string;
          /**
           * @description Cursor from the previous response for the next page
           * @example 1780704000032
           */
          cursor?: string;
          /**
           * @description Number of posts to return, max 50
           * @example 20
           */
          count?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/kwai/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Fetches public Kwai post details including caption, media URLs, cover images, counts, author info, and music metadata. Uses Kwai's public web API endpoint, not HTML scraping.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Kwai post URL
           * @example https://www.kwai.com/@KwaiBrasilOficial/photo/5193363430624671876
           */
          url?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/kick/clip/transcript": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Clip Transcript
     * @description Gets a transcript from a public Kick clip. Checks native captions first; returned native captions cost 1 credit. Set use_ai_as_fallback=true to opt into paid AI only when captions are unavailable. No transcript costs 0 credits. transcript_source is native, ai, or null. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed.
     */
    get: {
      parameters: {
        query: {
          /** @description Paid opt-in, enabled only by the literal query value 'true' (allow_long_transcription=true). Defaults to false when omitted; other values do not enable paid mode. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. This flag does not force AI and does not enable transcription or AI fallback by itself. Keep get_transcript=true or use_ai_as_fallback=true where required by the endpoint. Returned native captions still cost 1 credit on dedicated transcript routes, even for long videos with this flag; on detail routes they leave the base price unchanged. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          allow_long_transcription?: boolean;
          /**
           * @description Kick clip URL
           * @example https://kick.com/fuzzyzvr/clips/clip_01M35J4DGERS1WE12H82WW0JBB
           */
          url: string;
          /** @description Use paid AI only when native captions are unavailable. Defaults to false. By default, successful AI transcription of videos up to 120 seconds (two minutes, inclusive) costs a flat 1 credit per request. Over 120 seconds, videos cannot be AI-transcribed by default. Set allow_long_transcription=true to opt into paid AI with no fixed duration cap: ALL successful AI transcriptions in this mode cost 10 credits per started minute, including short videos: 10 * ceil(duration_seconds / 60). For example, 177 seconds costs 30 credits and an opted-in 60 seconds costs 10 credits. Empty AI results and errors cost 0 credits for AI transcription. These routes remain synchronous. Allow at least 30 seconds on your client. Paid long transcription can exceed resource limits or timeouts, so successful transcription of long videos is not guaranteed. */
          use_ai_as_fallback?: boolean;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/kick/clip": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Clip
     * @description Fetches detailed data for a Kick clip by URL, including video, metadata, and channel info. Returns clip id, title, clip_url, thumbnail_url, video_url, view_count, likes_count, duration, privacy status, and is_mature flag. Also includes category details (name, slug), creator info (username), and channel info (username, profile_picture).
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Kick clip URL
           * @example https://kick.com/xqc/clips/clip_01JGJHB6CEVFCQRYTVPM8DW892
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/snapchat/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Profile
     * @description Retrieves a Snapchat user's public profile by handle, including identity, stories, and spotlight content. Returns userProfile with username, title, snapcodeImageUrl, subscriberCount, bio, and profilePictureUrl. Also includes highlightStoryMetadata with individual story snaps (mediaUrl, mediaType, thumbnailUrl) and spotlightStoryMetadata with video details and engagement stats (viewCount, shareCount, commentCount).
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Snapchat username
           * @example zane
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/snapchat/spotlight": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Spotlight by Link
     * @description Fetches public data for a Snapchat Spotlight video by URL. Returns the snap id, description, creator, engagement counts, thumbnail, and content URL when Snapchat exposes them publicly.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Snapchat Spotlight URL.
           * @example https://www.snapchat.com/@jack.scalise/spotlight/W7_EDlXWTBiXAEEniNoMPwAAYb3djZ3FqY2VhAZXDhShdAZXDhPWfAAAAAQ
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/snapchat/spotlight/comments": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Spotlight Comments by Link
     * @description Fetches public comments from Snapchat's Spotlight comments API by URL. Returns the snap id, comments, a cursor for the next page, and hasMore. Pass the returned cursor back as the cursor param to load more comments.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Snapchat Spotlight URL.
           * @example https://www.snapchat.com/@lilah4823/spotlight/W7_EDlXWTBiXAEEniNoMPwAAYY2pvZnd0ZXVmAZ8fgG8pAZ8ff-_IAAAAAQ
           */
          url: string;
          /**
           * @description Pagination cursor from the previous response.
           * @example CpMCEpACQ3NjQkNnZ0tBbkp6RWdJSUJBb05DZ0owY3hJSENLZjA1TW55...
           */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/telegram/channel": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Details
     * @description Retrieves public Telegram channel or group metadata including its name, description, avatar, verification status, subscriber or member count, and public media counters. This endpoint uses Telegram's public web preview and does not use a logged-in Telegram account. Private channels, invite-only groups, numeric IDs, and channels with no public web preview are not supported.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Telegram handle, @handle, or t.me channel URL.
           * @example telegram
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/telegram/channel/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Channel Posts
     * @description Retrieves one public web-preview page of Telegram posts with text, publish date, views, reactions when exposed, forwards, media previews, and link previews. Pass the returned cursor to fetch the previous page. Empty and terminal pages are not charged. Telegram does not expose every field on every public post, so reactions and downloadable media URLs can be absent. This endpoint does not support private or invite-only channels and groups.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Telegram handle, @handle, or t.me channel URL.
           * @example durov
           */
          handle: string;
          /**
           * @description Numeric cursor returned by the previous page. Omit it for the latest posts.
           * @example 523
           */
          cursor?: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/telegram/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post Details
     * @description Retrieves one public Telegram post with its text, publish date, views, reactions when exposed, forward source, media previews, and link preview. This endpoint uses Telegram's public post widget without a logged-in account. Private and invite-only posts are not supported.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Telegram post URL.
           * @example https://t.me/durov/543
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/profile": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Get a public Cosmos profile with bio, links, and follower counts. Public data only. One credit per successful request, including successful empty results.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Cosmos username without a profile URL.
           * @example design
           */
          handle: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/user/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Posts
     * @description Get the public posts saved to a Cosmos user profile. Public data only. One credit per successful request, including successful empty results. Keep the cursor unchanged and stop when has_more is false. Sending cursor=null returns end_of_pagination: true and costs zero credits.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Cosmos username without a profile URL.
           * @example design
           */
          handle: string;
          /** @description Pass the previous response cursor unchanged. Stop when it is null; sending the literal string "null" returns an empty terminal page without fetching or charging. */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/user/clusters": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * User Collections
     * @description Get the public collections owned by a Cosmos user. Public data only. One credit per successful request, including successful empty results. Keep the cursor unchanged and stop when has_more is false. Sending cursor=null returns end_of_pagination: true and costs zero credits.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Cosmos username without a profile URL.
           * @example design
           */
          handle: string;
          /** @description Pass the previous response cursor unchanged. Stop when it is null; sending the literal string "null" returns an empty terminal page without fetching or charging. */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/post": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Post
     * @description Get a public Cosmos post with media URLs, captions, source links, and save count. Uses public Cosmos data. Private or login-restricted content is not available. Costs 1 credit per successful request, including native empty results. Scraper failures are not charged.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Cosmos post URL.
           * @example https://www.cosmos.so/e/2107587668
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/cluster": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Collection
     * @description Get a public Cosmos collection with its owner, description, cover, counts, and public subcollections. Uses public Cosmos data. Private or login-restricted content is not available. Costs 1 credit per successful request, including native empty results. Scraper failures are not charged.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Cosmos collection URL.
           * @example https://www.cosmos.so/design/the-best-band-posters
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/cluster/posts": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Collection Posts
     * @description Get public posts saved to a Cosmos collection. Supports cursor pagination. Uses public Cosmos data. Private or login-restricted content is not available. Costs 1 credit per successful request, including native empty results. Scraper failures are not charged. Sending cursor=null returns end_of_pagination: true and costs zero credits.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Public Cosmos collection URL.
           * @example https://www.cosmos.so/design/the-best-band-posters
           */
          url: string;
          /** @description Pass the previous response cursor unchanged. Stop when it is null; sending the literal string "null" returns an empty terminal page without fetching or charging. */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/cosmos/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Search
     * @description Search public Cosmos posts by keyword. Cosmos may return related posts even when there is no exact keyword match. Public data only. One credit per successful request, including successful empty results. Keep the cursor unchanged and stop when has_more is false. result_count is Cosmos’s search retrieval-window count, not the total number of matching posts. Sending cursor=null returns end_of_pagination: true and costs zero credits.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Search text.
           * @example architecture
           */
          query: string;
          /** @description Pass the previous response cursor unchanged. Stop when it is null; sending the literal string "null" returns an empty terminal page without fetching or charging. */
          cursor?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/find-social-profiles": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Find Social Profiles
     * @description Accepts a supported platform and creator handle, validates both using platform-specific rules, and constructs the canonical source profile URL internally. URLs are not accepted as handles. Supported platforms are Instagram, TikTok, YouTube, X/Twitter, and Facebook; X is accepted as an alias for Twitter. YouTube accepts handles and 24-character channel IDs. The endpoint returns social profiles explicitly linked from the source profile and expands recognized link-in-bio pages. It also re-scrapes up to three supported profiles explicitly linked by the source and follows up to three unique public website URLs declared by the source or those trusted profiles for one page, while preserving each declared path and query. Generic service-provider landing pages reached through parked or unconfigured branded-domain redirects are ignored so the provider's own footer links are not attributed to the creator. It also checks whether the same handle exists on the other supported platforms. All attempted same-handle URLs are returned in same_handle_candidate_urls even when they cannot be verified strongly enough for profiles. Same-handle accounts are included in profiles only when corroborated by a shared owner-controlled website or a reciprocal profile link; matching handles and display names alone are not identity proof. same_handle_match records supporting name evidence at 0.75 confidence, while shared_website and website_link use 0.9. A bounded Google search discovers alternate handles, but Google results are never returned without verification. At most two candidates per other supported platform, up to four total, are re-scraped through that platform's profile scraper. The endpoint may also follow up to two unique recognized link-in-bio URLs declared by the re-scraped Google candidates. The global two-page cap is applied after candidates whose returned handles do not match their Google URLs are rejected. Optional profile probes and page fetches make one attempt and receive the shared enrichment abort signal. A reciprocal source-profile link found there verifies the candidate, and the page's explicit cross-platform profiles can then expand the verified identity graph. Google URLs that re-scrape to the same returned platform handle are deduplicated. A different-handle candidate is accepted only when it links back to the source profile, or when its normalized display name matches and it declares the same owner-controlled public website; common multi-tenant profile and storefront hosts are excluded from shared-website identity evidence. Google discovery uses google_search_match at 0.6, exact names use display_name_match at 0.75, reciprocal links use 0.95, and cross-platform social links explicitly declared by a verified candidate use verified_profile_link at 0.95. Source-linked URLs and failures are returned in source_linked_profile_urls and failed_source_linked_profile_urls. Google candidate URLs, candidate-declared link-in-bio URLs, verified URLs, and failures are returned in google_candidate_urls, google_candidate_link_in_bio_urls, verified_google_candidate_urls, failed_google_candidate_urls, and failed_google_candidate_link_in_bio_urls. Results are deterministic and do not use AI. Mixed or unreachable enrichment results are reported through partial and the matching failure fields. If every declared link-in-bio page fails and no other enrichment finds a profile, the request returns an uncharged 503. A successful live lookup costs 10 credits.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Source social platform
           * @example instagram
           */
          platform:
            "instagram" | "tiktok" | "youtube" | "x" | "twitter" | "facebook";
          /**
           * @description Creator handle without a profile URL. A leading @ is optional.
           * @example creator
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (10 credits). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/find-creator-emails": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Find Creator Emails
     * @description Accepts a supported platform and creator handle, using the same verified social-profile discovery flow as Find Social Profiles. Supported starting platforms are Instagram, TikTok, YouTube, X/Twitter, and Facebook. A leading @ is optional; YouTube also accepts channel IDs. Scans publicly listed profile bios and contact links, recognized link-in-bio pages, and a bounded set of creator-declared public website pages. Other accounts are scanned only when explicitly linked or verified through reciprocal profile links or shared owner-controlled websites. Returns deduplicated email addresses with available public source URLs and source types. URLs from internal-only sources are omitted from email provenance and scan diagnostics; an email found only through those sources has an empty sources array. Partial and limited-scan flags still reflect the complete scan. Addresses may belong to the creator, their management, or a booking contact; the endpoint does not guess addresses or verify mailbox deliverability. Login-only contact details and private account data are not accessed. A successful lookup with no publicly listed email returns an empty emails array. Optional failed or timed-out scans are reported with partial results and diagnostics, so an empty partial result is not proof that no address exists. Successful live lookups cost 1 credit when emails is empty, including successful partial empty results, and 10 credits when any email is returned. Cache hits cost 0 credits. Missing or invalid inputs, missing source profiles, and failed lookups cost 0 credits. Multi-source discovery can take several seconds and may time out; retry failed requests rather than treating them as no-email results. Contact fields come from public creator pages. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Source social platform
           * @example instagram
           */
          platform:
            "instagram" | "tiktok" | "youtube" | "x" | "twitter" | "facebook";
          /**
           * @description Creator handle without a profile URL. A leading @ is optional.
           * @example miguelangeles
           */
          handle: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit with no emails; 10 credits with any email (live lookups)). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/detect-age-gender": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get Age and Gender
     * @description Uses AI to analyze a creator's profile photo and estimate their age and gender. Returns ageRange with low and high bounds, gender, and a confidence score for the gender prediction. The profile photo must contain a clear, visible face for accurate results.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to users social profile
           * @example https://twitter.com/levelsio
           */
          url: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linktree": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Linktree page
     * @description Scrapes a Linktree page by URL, extracting the creator's profile and all their links. Returns id, username, profilePictureUrl, description, verticals, timezone, and links, an array of link objects each with id, type, title, and url. Also includes detected social accounts (instagram, tiktok, spotify, youtube, soundcloud, apple_music) and email_address. Contact fields come from the submitted public Linktree page. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to Linktree page
           * @example https://linktr.ee/miguelangeles
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/komi": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Komi page
     * @description Scrapes a Komi page by URL, extracting the creator's profile, social links, and featured content. Returns id, username, avatar, displayName, bio, and social accounts (instagram, tiktok, youtube, twitter, facebook, snapchat). Also includes links, an array of link and product objects each with id, url, title, type, thumbnail, and optional price and currency for products.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to Komi page
           * @example https://kimkardashian.komi.io/
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/pillar": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Pillar page
     * @description Scrapes a Pillar page by URL, extracting the creator's profile, social links, and products. Returns id, first_name, last_name, email, location, and social accounts (tiktok, spotify, twitter, youtube, facebook, linkedin, instagram, and more). Also includes links with click counts and products with title, price, description, and image. Contact fields come from the submitted public Pillar page. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to Pillar page
           * @example https://pillar.io/angelstrife
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkbio": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Linkbio page
     * @description Scrapes a Linkbio (lnk.bio) page by URL, extracting the creator's profile and all their links. Returns handle, id, social accounts (instagram, tiktok, youtube, twitter, whatsapp), email, website, and links, an array of link objects each with url and text. Contact fields come from the submitted public Linkbio page. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to Linkbio (lnk.bio) page
           * @example https://lnk.bio/msjennafischer
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/amazon/shop": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Amazon Shop page
     * @description Scrapes a creator's Amazon Shop page by URL, returning their storefront profile and product collections. The initial request also returns videos already embedded on the storefront page without requiring a pageToken. Videos include an id, title, thumbnail, and attached ASINs. Pass each returned pageToken back unchanged with the same shop URL. A paginated page can contain lists, videos, or both. Tokens are opaque: known values can begin with amzn1.ideas, amzn1.vse.video, or amzn1.shoppablemedia, but clients should not infer the response type from the prefix.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description URL to Amazon Shop page
           * @example https://www.amazon.com/shop/sydneydelrey
           */
          url: string;
          /**
           * @description Opaque page token returned by a previous response for the same shop URL. Pass it back unchanged and do not infer the response type from its prefix. A page can contain lists, videos, or both.
           * @example amzn1.vse.video...
           */
          pageToken?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/account/credit-balance": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get credit balance
     * @description Returns the number of API credits remaining on your Scrape Creators account. The response contains a single creditCount field with your current balance.
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/account/get-api-usage": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get request history
     * @description Returns a paginated list of your API requests, including the endpoint called, status code, credits used, and timestamp. Useful for debugging and monitoring your API usage. Supports filtering by endpoint name and status code.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Page number for pagination (max 100)
           * @example 1
           */
          page?: string;
          /**
           * @description Filter by endpoint name (partial match)
           * @example /v1/tiktok/profile
           */
          endpoint?: string;
          /**
           * @description Filter by HTTP status code
           * @example 200
           */
          statusCode?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/account/get-daily-usage-count": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get daily usage
     * @description Returns aggregated daily usage statistics for the last 30 days, including total credits consumed and number of requests per day.
     */
    get: {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/account/get-most-used-routes": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Get most used routes
     * @description Returns your top 20 most called API endpoints ranked by call count, along with total credits consumed per endpoint. Defaults to the last 24 hours. Supports custom time ranges up to 1 year.
     */
    get: {
      parameters: {
        query?: {
          /**
           * @description Start of time range (ISO 8601 format)
           * @example 2025-04-01T00:00:00.000Z
           */
          start_time?: string;
          /**
           * @description End of time range (ISO 8601 format)
           * @example 2025-04-15T23:59:59.000Z
           */
          end_time?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/v1/linkme": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /**
     * Profile
     * @description Retrieves a Linkme profile by URL, including identity, social links, and contact details. Returns profile with id, firstName, username, bio, profileVisitCount, profileImage, verifiedAccount, and isAmbassador flag. Also includes infoLinks (email addresses) and webLinks, an array of categorized social platform links (Spotify, Instagram, YouTube, Twitter, Facebook, and more) each with linkValue and faceValue. Contact fields come from the submitted public Linkme profile. To request removal of your own information from Scrape Creators results, email support@scrapecreators.com with the profile URL.
     */
    get: {
      parameters: {
        query: {
          /**
           * @description Linkme profile URL
           * @example https://link.me/danucd
           */
          url: string;
          /**
           * @description If we have a response in the cache that is this many days old or newer, return the cached response (0 credits, with "cached": true and a "cached_at" timestamp). Otherwise, scrape a live result (1 credit). [See the Caching page for details.](https://docs.scrapecreators.com/caching)
           * @example 7d
           */
          cache_max_age?: "1d" | "3d" | "7d" | "14d" | "30d";
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description Successful response */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            "application/json": unknown;
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
