/**
 * Videos the site embeds. They are hosted on the Hope4PKD YouTube channel rather than in `public/`:
 * YouTube adjusts quality to each viewer's connection, carries the captions, and lets a video be
 * replaced without a redeploy.
 *
 * `title` is the video's title on YouTube, copied exactly; it is the player's accessible name.
 */

export const supportVideo = {
  youtubeId: "aD-wS6jyAsM",
  title: "How to get support from Hope4PKD if you have PKD in Nigeria",
  length: "two-minute",
} as const;
