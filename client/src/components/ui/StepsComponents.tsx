import React from "react"
import { Box, HStack, VStack, Text, Circle, Flex } from "@chakra-ui/react"
import { HiCheck } from "react-icons/hi2"

interfaceProps {
  steps: Array<{ title: string; description?: string }>
  current: number
}

interfaceProps {
  title: string
  description?: string
  isActive: boolean
  isCompleted: boolean
  stepNumber: number
  isLast: boolean
}

export function({ steps, current}:Props) {
  return (
    <Box w="full">
      <VStack gap={4} align="stretch">
        {steps.map((step, index) => (
          <key={index}
            title={step.title}
            description={step.description}
            isActive={index === current}
            isCompleted={index < current}
            stepNumber={index + 1}
            isLast={index === steps.length - 1}
          />
        ))}
      </VStack>
    </Box>
  )
}

function({ title, description, isActive, isCompleted, stepNumber, isLast }:Props) {
  return (
    <HStack gap={4} align="start">
      <VStack gap={0} align="center">
        <Circle
          size={8}
          bg={isCompleted ? "brand.500" : isActive ? "brand.500" : "gray.200"}
          color={isCompleted || isActive ? "white" : "gray.500"}
          fontSize="sm"
          fontWeight="bold"
        >
          {isCompleted ? <HiCheck size={16} /> : stepNumber}
        </Circle>
        {!isLast && (
          <Box
            w={0.5}
            h={8}
            bg={isCompleted ? "brand.500" : "gray.200"}
          />
        )}
      </VStack>
      
      <VStack align="start" gap={1} flex={1}>
        <Text
          fontSize="sm"
          fontWeight={isActive ? "semibold" : "medium"}
          color={isCompleted || isActive ? "brand.500" : "gray.700"}
        >
          {title}
        </Text>
        {description && (
          <Text fontSize="xs" color="gray.500">
            {description}
          </Text>
        )}
      </VStack>
    </HStack>
  )
}

// Hook replacement for uses
export function uses(initial= 0, maxs: number) {
  const [current setCurrent] = React.useState(initial)
  
  const next= () => {
    setCurrent((prev) => Math.min(prev + 1, maxs - 1))
  }
  
  const prev= () => {
    setCurrent((prev) => Math.max(prev - 1, 0))
  }
  
  const goTo= (step: number) => {
    setCurrent(Math.max(0, Math.min(step, maxs - 1)))
  }
  
  return {
    current
    setActive: setCurrent
    active: current
    next
    prev
    goTo
  }
}

// We need to import React at the top
import React from "react"