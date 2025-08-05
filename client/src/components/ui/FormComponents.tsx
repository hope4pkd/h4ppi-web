import { Box, VStack, Text, BoxProps } from "@chakra-ui/react"

interfaceProps extends BoxProps {
  children: React.ReactNode
  isRequired?: boolean
  isInvalid?: boolean
}

interfaceProps extends BoxProps {
  children: React.ReactNode
  isRequired?: boolean
}

interfaceProps extends BoxProps {
  children: React.ReactNode
}

export function({ children, isRequired, isInvalid, ...props }:Props) {
  return (
    <Box {...props}>
      {children}
    </Box>
  )
}

export function({ children, isRequired, ...props }:Props) {
  return (
    <Text
      fontSize="sm"
      fontWeight="medium"
      color="gray.700"
      mb={2}
      {...props}
    >
      {children}
      {isRequired && (
        <Text as="span" color="red.500" ml={1}>
          *
        </Text>
      )}
    </Text>
  )
}

export function({ children, ...props }:Props) {
  return (
    <Text
      fontSize="sm"
      color="gray.500"
      mt={2}
      {...props}
    >
      {children}
    </Text>
  )
}