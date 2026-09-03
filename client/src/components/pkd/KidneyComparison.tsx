import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Image, { type StaticImageData } from "next/image";

import healthyKidneyImage from "@public/assets/images/healthy-kidney.png";
import pkdKidneyImage from "@public/assets/images/pkd-kidney.png";

function Panel({
  label,
  note,
  image,
  imageAlt,
}: {
  label: string;
  note: string;
  image: StaticImageData;
  imageAlt: string;
}) {
  return (
    <VStack align="start" gap={5} layerStyle="card">
      <Box
        position="relative"
        w="full"
        aspectRatio={1}
        overflow="hidden"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="navy.100"
        bg="canvas.50"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </Box>
      <VStack align="start" gap={1}>
        <Text textStyle="featureTitle" color="navy.900">
          {label}
        </Text>
        <Text textStyle="bodySm" color="navy.500">
          {note}
        </Text>
      </VStack>
    </VStack>
  );
}

export function KidneyComparison() {
  return (
    <Box as="figure">
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 5, md: 6 }} alignItems="stretch">
        <Panel
          label="A healthy kidney"
          note="Smooth and bean-shaped. A healthy kidney removes waste from the blood and helps keep the body’s chemistry balanced."
          image={healthyKidneyImage}
          imageAlt="Medical-style illustration of a smooth, bean-shaped healthy kidney."
        />
        <Panel
          label="A kidney with PKD"
          note="Fluid-filled cysts can enlarge the kidney and gradually reduce how well it works."
          image={pkdKidneyImage}
          imageAlt="Medical-style illustration of an enlarged kidney with PKD, covered by fluid-filled cysts of different sizes."
        />
      </SimpleGrid>

      <Text as="figcaption" textStyle="bodySm" color="navy.400" pt={4} maxW="measureWide">
        These AI-generated illustrations compare a healthy kidney with one affected by PKD. They are
        educational images and cannot be used for diagnosis.
      </Text>
    </Box>
  );
}
