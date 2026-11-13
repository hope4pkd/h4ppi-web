"use client";

import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { allowsVideo, setConsent, useConsent } from "@/lib/consent";

/**
 * A YouTube video that loads nothing from YouTube until the reader asks for it. Before the click the
 * frame is a button over the video's thumbnail (fetched through next/image, so the browser never
 * contacts YouTube); the click swaps in a youtube-nocookie player that starts playing.
 *
 * The player may store data on the device, so it is the one thing the cookie banner governs
 * (lib/consent.ts). A reader who allowed YouTube video gets the player on the first press. Anyone
 * else is asked in the frame first, and can open the video on YouTube instead. Allowing it here grants
 * video only, never Google measurement.
 *
 * Framed like MediaFrame so a video and a photo sit on the page as the same kind of object.
 */
export function VideoEmbed({ youtubeId, title, ratio = 16 / 9 }: { youtubeId: string; title: string; ratio?: number }) {
  const consent = useConsent();
  const [playing, setPlaying] = useState(false);
  const [asking, setAsking] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const allowRef = useRef<HTMLButtonElement>(null);

  // The button the reader pressed is gone once the player replaces it; move focus to the player so a
  // keyboard user is not dropped back at the top of the document.
  useEffect(() => {
    if (playing) playerRef.current?.focus();
  }, [playing]);

  // Same for the consent prompt: it replaces the play button, so focus goes to its first control.
  useEffect(() => {
    if (asking) allowRef.current?.focus();
  }, [asking]);

  const thumbnail = <Image src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" style={{ objectFit: "cover" }} />;

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
      ) : asking ? (
        <>
          {thumbnail}
          <Box
            position="absolute"
            inset={0}
            bg="navy.900/90"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={{ base: 3, md: 5 }}
            p={{ base: 4, md: 8 }}
          >
            <Text textStyle={{ base: "bodySm", md: "body" }} maxW="measureTight">
              This video plays from YouTube, which may store cookies or similar data on your device.
            </Text>
            <Stack direction="row" gap={3} wrap="wrap">
              <Button
                ref={allowRef}
                size="sm"
                minH="44px"
                onClick={() => {
                  setConsent(consent === "all" ? "all" : "video");
                  setAsking(false);
                  setPlaying(true);
                }}
              >
                Allow and play
              </Button>
              <Button asChild size="sm" minH="44px" variant="outline" borderColor="whiteAlpha.500" color="white" _hover={{ bg: "whiteAlpha.200", borderColor: "white" }}>
                <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            </Stack>
          </Box>
        </>
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
          <button type="button" onClick={() => (allowsVideo(consent) ? setPlaying(true) : setAsking(true))} aria-label={`Play video: ${title}`}>
            {thumbnail}
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
