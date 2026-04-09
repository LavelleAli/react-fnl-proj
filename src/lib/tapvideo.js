const TAPVIDEO_FEED_BASE_URL =
  "https://tapvideo.blogspot.com/feeds/posts/default?alt=json-in-script";

const STRIP_HTML_PATTERN = /<[^>]+>/g;
const URL_PATTERN = /https?:\/\/[^\s]+/gi;
const YOUTUBE_URL_PATTERN =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[^<\s"']+|youtube\.com\/shorts\/[^<\s"']+|youtu\.be\/[^<\s"']+|youtube\.com\/embed\/[^<\s"']+)/i;
const VIMEO_URL_PATTERN =
  /https?:\/\/(?:www\.)?(?:vimeo\.com\/\d+|player\.vimeo\.com\/video\/\d+)/i;

let tapVideoFeedPromise = null;
let tapVideoFeedCache = null;

function decodeHtml(value = "") {
  if (typeof document === "undefined") {
    return value;
  }

  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function stripHtml(value = "") {
  return decodeHtml(value.replace(STRIP_HTML_PATTERN, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function getYouTubeId(url = "") {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
}

function getVimeoId(url = "") {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/i)?.[1] || "";
}

function cleanDescription(value = "") {
  return value
    .replace(URL_PATTERN, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAlternateLink(entry) {
  return entry.link?.find((link) => link.rel === "alternate")?.href || "";
}

function getVideoUrl(html = "") {
  return html.match(YOUTUBE_URL_PATTERN)?.[0] || html.match(VIMEO_URL_PATTERN)?.[0] || "";
}

function getThumbnail(entry) {
  return entry["media$thumbnail"]?.url || "";
}

function mapEntry(entry) {
  const html = entry.content?.$t || entry.summary?.$t || "";
  const videoUrl = getVideoUrl(html);
  const plainText = cleanDescription(stripHtml(html));
  const title = entry.title?.$t?.trim() || "TapVideo archive entry";
  const alternateLink = getAlternateLink(entry);
  const publishedAt = entry.published?.$t || "";
  const youtubeId = getYouTubeId(videoUrl);
  const vimeoId = getVimeoId(videoUrl);
  const thumbnail =
    getThumbnail(entry) ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "") ||
    (vimeoId ? `https://vumbnail.com/${vimeoId}.jpg` : "");

  return {
    id: entry.id?.$t || alternateLink || title,
    title,
    speaker: entry.author?.[0]?.name?.$t || "TapVideo",
    description:
      plainText.slice(0, 220) ||
      "TapVideo archive item imported from the Blogger feed.",
    category: publishedAt ? new Date(publishedAt).toLocaleDateString() : "Archive",
    videoUrl,
    thumbnail,
    tapVideoPageUrl: alternateLink,
    publishedAt,
  };
}

export function fetchTapVideoFeed() {
  if (tapVideoFeedCache) {
    return Promise.resolve(tapVideoFeedCache);
  }

  if (tapVideoFeedPromise) {
    return tapVideoFeedPromise;
  }

  tapVideoFeedPromise = new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      tapVideoFeedPromise = null;
      reject(new Error("TapVideo feed loading is only available in the browser."));
      return;
    }

    const callbackName = "__tapVideoFeedCallback__";
    const existingScript = document.getElementById("tapvideo-feed-script");

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "tapvideo-feed-script";
    const timeoutId = window.setTimeout(() => {
      cleanup();
      tapVideoFeedPromise = null;
      reject(new Error("TapVideo feed request timed out."));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeoutId);
      script.remove();
    }

    window[callbackName] = (payload) => {
      const entries = (payload?.feed?.entry || [])
        .map(mapEntry)
        .filter((entry) => entry.tapVideoPageUrl);

      tapVideoFeedCache = entries;
      tapVideoFeedPromise = null;
      cleanup();
      window.setTimeout(() => {
        delete window[callbackName];
      }, 0);
      resolve(entries);
    };

    script.onerror = () => {
      cleanup();
      tapVideoFeedPromise = null;
      reject(new Error("Unable to load the TapVideo feed."));
    };

    script.src = `${TAPVIDEO_FEED_BASE_URL}&max-results=100&callback=${callbackName}`;
    script.async = true;
    document.body.appendChild(script);
  });

  return tapVideoFeedPromise;
}

export function searchTapVideoEntries(entries, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return entries.filter((entry) => {
    const haystack = [
      entry.title,
      entry.speaker,
      entry.description,
      entry.category,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
