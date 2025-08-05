import React from "react"
import { 
  Box, 
  VStack, 
  HStack, 
  Textas Chakra
  Input,
  BoxProps,
  Buttonas Chakraas Chakra} from "@chakra-ui/react"
import { HiExclamationTriangle, HiInformationCircle, HiCheckCircle, HiXCircle } from "react-icons/hi2"

//replacement
interfaceProps extends BoxProps {
  name?: string
  src?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function({ name = "", src, size = "md", ...props }:Props) {
  const sizeMap = {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 16
  }
  
  const sizeValue = sizeMap[size]
  
  return (
    <Box
      w={sizeValue}
      h={sizeValue}
      bg="brand.500"
      rounded="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontSize={size === "sm" ? "sm" : "md"}
      fontWeight="bold"
      overflow="hidden"
      {...props}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </Box>
  )
}

//Group replacement
interfaceGroupProps extends BoxProps {
  children: React.ReactNode
  max?: number
}

export functionGroup({ children, max, ...props }:GroupProps) {
  const childArray = React.Children.toArray(children)
  const displayedChildren = max ? childArray.slice(0, max) : childArray
  const remainingCount = max && childArray.length > max ? childArray.length - max : 0
  
  return (
    <HStack spacing={-2} {...props}>
      {displayedChildren}
      {remainingCount > 0 && (
        <name={`+${remainingCount}`} bg="gray.500" />
      )}
    </HStack>
  )
}

//replacement
interfaceProps {
  value?: number
  max?: number
  colorScheme?: string
  size?: "sm" | "md" | "lg"
}

export function({ value = 0, max = 100, colorScheme = "brand", size = "md" }:Props) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const heightMap = {
    sm: 2,
    md: 3,
    lg: 4
  }
  
  const height = heightMap[size]
  const bgColor = colorScheme === "brand" ? "brand.500" : `${colorScheme}.500`
  
  return (
    <Box
      w="full"
      h={height}
      bg="gray.200"
      rounded="full"
      overflow="hidden"
    >
      <Box
        h="full"
        bg={bgColor}
        rounded="full"
        style={{ width: `${percentage}%` }}
        transition="width 0.3s ease"
      />
    </Box>
  )
}

//replacement
interfaceProps extends BoxProps {
  status?: "info" | "warning" | "success" | "error"
  children: React.ReactNode
}

export function({ status = "info", children, ...props }:Props) {
  const statusConfig = {
    info: { bg: "blue.50", borderColor: "blue.200", icon: HiInformationCircle, iconColor: "blue.500" },
    warning: { bg: "orange.50", borderColor: "orange.200", icon: HiExclamationTriangle, iconColor: "orange.500" },
    success: { bg: "green.50", borderColor: "green.200", icon: HiCheckCircle, iconColor: "green.500" },
    error: { bg: "red.50", borderColor: "red.200", icon: HiXCircle, iconColor: "red.500" }
  }
  
  const config = statusConfig[status]
  const IconComponent = config.icon
  
  return (
    <Box
      p={4}
      bg={config.bg}
      border="1px solid"
      borderColor={config.borderColor}
      rounded="md"
      {...props}
    >
      <HStack gap={3} align="start">
        <IconComponent size={20} color={config.iconColor} />
        <Box flex={1}>
          {children}
        </Box>
      </HStack>
    </Box>
  )
}

//replacement
interfaceProps extends BoxProps {
  children: React.ReactNode
  spacing?: number
}

interfaceItemProps extends BoxProps {
  children: React.ReactNode
}

export function({ children, spacing = 2, ...props }:Props) {
  return (
    <VStack gap={spacing} align="stretch" {...props}>
      {children}
    </VStack>
  )
}

export functionItem({ children, ...props }:ItemProps) {
  return (
    <Box {...props}>
      {children}
    </Box>
  )
}

//replacement
interfaceProps {
  value: string
  children: React.ReactNode
  isChecked?: boolean
  onChange?: (value: string) => void
}

interfaceGroupProps extends BoxProps {
  value?: string
  onChange?: (value: string) => void
  children: React.ReactNode
}

export function({ value, children, isChecked, onChange }:Props) {
  return (
    <HStack
      gap={3}
      cursor="pointer"
      onClick={() => onChange?.(value)}
    >
      <Box
        w={4}
        h={4}
        rounded="full"
        border="2px solid"
        borderColor={isChecked ? "brand.500" : "gray.300"}
        bg={isChecked ? "brand.500" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isChecked && (
          <Box w={2} h={2} bg="white" rounded="full" />
        )}
      </Box>
      <Text fontSize="sm">{children}</Text>
    </HStack>
  )
}

export functionGroup({ value, onChange, children, ...props }:GroupProps) {
  return (
    <VStack gap={3} align="start" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type ===) {
          return React.cloneElement(child, {
            isChecked: child.props.value === value,
            onChange
          })
        }
        return child
      })}
    </VStack>
  )
}

//replacement
interfaceProps {
  value?: string
  children: React.ReactNode
  isChecked?: boolean
  onChange?: (checked: boolean, value?: string) => void
}

export function({ value, children, isChecked, onChange }:Props) {
  return (
    <HStack
      gap={3}
      cursor="pointer"
      onClick={() => onChange?.(!isChecked, value)}
    >
      <Box
        w={4}
        h={4}
        rounded="sm"
        border="2px solid"
        borderColor={isChecked ? "brand.500" : "gray.300"}
        bg={isChecked ? "brand.500" : "transparent"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isChecked && (
          <HiCheckCircle size={12} color="white" />
        )}
      </Box>
      <Text fontSize="sm">{children}</Text>
    </HStack>
  )
}

//replacement (enhanced)
interfaceProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  children: React.ReactNode
}

export function({ placeholder, value, onChange, children }:Props) {
  return (
    <Chakraplaceholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      _hover={{ borderColor: "gray.400" }}
      _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px brand.500" }}
    >
      {children}
    </Chakra>
  )
}