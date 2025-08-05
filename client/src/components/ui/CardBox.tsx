import { Box, BoxProps } from "@chakra-ui/react"

interface CardBoxProps extends BoxProps {
  children: React.ReactNode
}

export function CardBox({ children, ...props }: CardBoxProps) {
  return (
    <Box
      bg="white"
      rounded="xl"
      shadow="md"
      border="1px solid"
      borderColor="gray.200"
      {...props}
    >
      {children}
    </Box>
  )
}