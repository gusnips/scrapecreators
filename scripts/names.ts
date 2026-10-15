// How an endpoint's path and tag become `group.method`. No file or network access, so the tests
// can run it.

// ScrapeCreators' tag for its account endpoints is the product name. The paths say `account`.
const RENAMED_TAGS: Record<string, string> = { "Scrape Creators": "account" };

function words(name: string): string[] {
  return name.split(/[^a-zA-Z0-9]+/).filter(Boolean);
}

export function pascalCase(name: string): string {
  return words(name)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}

export function camelCase(name: string): string {
  const pascal = pascalCase(name);
  return pascal[0].toLowerCase() + pascal.slice(1);
}

// "TikTok Shop" is `tiktokShop` and "GitHub" is `github`: a brand is one word, in lower case.
export function groupName(tag: string): string {
  const renamed = RENAMED_TAGS[tag];
  if (renamed) return renamed;
  const [first, ...rest] = words(tag);
  return (
    first.toLowerCase() +
    rest.map((word) => pascalCase(word.toLowerCase())).join("")
  );
}

function squash(name: string): string {
  return name.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function version(path: string): number {
  return Number(/^\/v(\d+)\//.exec(path)?.[1] ?? 1);
}

// "/v1/tiktok/profile/region" in the tiktok group is `profileRegion`: the version and the
// segments that only repeat the group's name go. The last segment always stays. A path that is
// only the group's name, like "/v1/linktree", is `get`, as in ScrapeCreators' own CLI.
function baseName(path: string, group: string): string {
  const segments = path.split("/").slice(2);
  const key = squash(group);
  if (segments.length === 1 && squash(segments[0]) === key) return "get";
  let skip = 0;
  let seen = "";
  while (
    skip < segments.length - 1 &&
    key.startsWith(seen + squash(segments[skip]))
  ) {
    seen += squash(segments[skip]);
    skip += 1;
  }
  return camelCase(segments.slice(skip).join("/"));
}

// One name per path, in the order given. When two paths differ only by version, the oldest keeps
// the plain name and the others add their version: `profile`, `profileV2`.
export function methodNames(group: string, paths: string[]): string[] {
  const bases = paths.map((path) => baseName(path, group));
  const names = paths.map((path, index) => {
    const older = paths.filter(
      (other, i) => bases[i] === bases[index] && version(other) < version(path),
    );
    return older.length ? `${bases[index]}V${version(path)}` : bases[index];
  });
  const clash = names.find((name, index) => names.indexOf(name) !== index);
  if (clash)
    throw new Error(
      `Two paths in "${group}" are named "${clash}". Rename one in baseName.`,
    );
  return names;
}
