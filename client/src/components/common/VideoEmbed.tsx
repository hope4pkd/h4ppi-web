"use client";

import { Box } from "@chakra-ui/react";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * A YouTube video that loads nothing from YouTube until the reader asks for it. Before the click the
 * frame is a button over the video's thumbnail (fetched through next/image, so the browser never
 * contacts YouTube); the click swaps in a youtube-nocookie player that starts playing.
 *
 * Framed like MediaFrame so a video and a photo sit on the page as the same kind of object.
 */
export function VideoEmbed({ youtubeId, title, ratio = 16 / 9 }: { youtubeId: string; title: string; ratio?: number }) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // The button the reader pressed is gone once the player replaces it; move focus to the player so a
  // keyboard user is not dropped back at the top of the document.
  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  const params = new URLSearchParams({ autoplay: "1", rel: "0", cc_load_policy: "1" });

  return (
    <Box position="relative" w="full" aspectRatio={ratio} borderRadius="2xl" overflow="hidden" boxShadow="lift" bg="navy.900">
      {playing ? (
        <iframe
          ref={playerRef}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        // asChild onto a native <button>: Box's `as` prop does not type `type="button"`.
        <Box
          asChild
          position="absolute"
          inset={0}
          w="full"
          h="full"
          cursor="pointer"
          display="flex"
          // Bottom corner rather than centre: the thumbnail carries its own title lettering, and a
          // centred badge covers it.
          alignItems="end"
          justifyContent="end"
          p={{ base: 3, md: 5 }}
          _focusVisible={{ outline: "3px solid", outlineColor: "pink.500", outlineOffset: "-6px" }}
          css={{
            "& [data-play]": { transitionProperty: "background-color", transitionDuration: "fast", transitionTimingFunction: "standard" },
            "&:hover [data-play]": { bg: "action.700" },
          }}
        >
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
            <Image src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" style={{ objectFit: "cover" }} />
            <Box
              data-play=""
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: 12, md: 16 }}
              h={{ base: 12, md: 16 }}
              borderRadius="full"
              bg="action.600"
              color="white"
              boxShadow="lift"
            >
              <Play size={24} fill="currentColor" aria-hidden="true" style={{ marginLeft: 3 }} />
            </Box>
          </button>
        </Box>
      )}
    </Box>
  );
}
