import { Box } from "@chakra-ui/react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100dvh" display="flex" flexDirection="column" bg="canvas.50">
      <Header />
      <Box as="main" id="main-content" flex="1">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}
