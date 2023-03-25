export function decodeRedditImageUrl(encodedUrl: string) {
  function replaceAmp(url: string): string {
    if (!url.includes("amp;")) return url;

    return replaceAmp(url.replace("amp;", ""));
  }

  return replaceAmp(encodedUrl);
}
