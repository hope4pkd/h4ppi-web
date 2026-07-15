"use client";

import React from "react";
import {
  Accordion,
  Box,
  Container,
  Heading,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Faq {
  value: string;
  question: string;
  answer: string;
}

interface FaqGroup {
  category: string;
  faqs: Faq[];
}

const faqGroups: FaqGroup[] = [
  {
    category: "About PKD",
    faqs: [
      {
        value: "what-is-pkd",
        question: "What is Polycystic Kidney Disease (PKD)?",
        answer:
          "PKD is a chronic genetic condition in which clusters of fluid-filled cysts develop in the kidneys, causing them to enlarge and gradually lose function over time. It is one of the most common inherited kidney disorders and can eventually lead to kidney failure requiring dialysis or a transplant.",
      },
      {
        value: "pkd-symptoms",
        question: "What are the symptoms, and how does PKD progress?",
        answer:
          "Common symptoms include high blood pressure, back or side pain, blood in the urine, frequent kidney infections, and a feeling of fullness in the abdomen. PKD usually progresses slowly over many years, which is why early diagnosis and consistent monitoring matter so much. This information is general education only — always consult a qualified medical professional about your specific situation.",
      },
      {
        value: "pkd-hereditary",
        question: "Is PKD hereditary?",
        answer:
          "Yes. The most common form (autosomal dominant PKD) has a 50% chance of being passed from an affected parent to each child. If PKD runs in your family, speak with a healthcare provider about screening — early awareness helps you manage the condition better.",
      },
    ],
  },
  {
    category: "For Patients",
    faqs: [
      {
        value: "who-is-eligible",
        question: "Who is eligible for Hope4PKD support?",
        answer:
          "Hope4PKD supports individuals living with PKD in Nigeria, along with their families. If you have a PKD diagnosis — or strong indications of one and need help getting properly diagnosed — you can reach out to us.",
      },
      {
        value: "how-to-register",
        question: "How do I register as a patient?",
        answer:
          "Start from the “For Patients” page and submit your details through the intake process. Our team will follow up to gather the information needed to understand your situation and begin verification.",
      },
      {
        value: "after-intake",
        question: "What happens after I register?",
        answer:
          "Every case moves through our five-step model: Patient Intake, Medical Verification, Case Assessment, Support Coordination, and Follow-Up & Impact Monitoring. After intake, your case is verified with our healthcare partners, assessed to determine the right support, matched with resources, and followed up over time.",
      },
      {
        value: "what-verification-involves",
        question: "What does medical verification involve?",
        answer:
          "Verification means confirming your diagnosis and medical needs with verified healthcare institutions and professionals we partner with. It protects patients and supporters alike — it ensures support goes to genuine, well-understood cases and that the help you receive actually fits your medical situation.",
      },
      {
        value: "is-support-free",
        question: "Does it cost anything to receive support?",
        answer:
          "No. Hope4PKD does not charge patients for navigation, verification, or support coordination. Our goal is to remove barriers between you and the care you need, not add new ones.",
      },
    ],
  },
  {
    category: "How Support Works",
    faqs: [
      {
        value: "where-funding-goes",
        question: "Where does funding go?",
        answer:
          "Funding is coordinated toward verified patient cases — treatment costs, diagnostics, and care access — and the programme operations that make patient navigation, verification, and community support possible.",
      },
      {
        value: "transparency",
        question: "How is transparency ensured?",
        answer:
          "Transparency is central to our model. Support is only directed to medically verified cases, coordination is structured rather than ad-hoc, and we monitor and report on the impact of every case through our follow-up process.",
      },
      {
        value: "kinds-of-support",
        question: "What kinds of support does Hope4PKD provide?",
        answer:
          "Our ecosystem covers six pillars: patient care and navigation, medical verification and trust, financial access and support, community and emotional support, awareness and education, and advocacy for better healthcare access.",
      },
    ],
  },
  {
    category: "Giving Support",
    faqs: [
      {
        value: "how-to-support",
        question: "How can I support a patient?",
        answer:
          "Visit the “Support a Patient” page to contribute to verified patient cases, or explore our campaigns. Every contribution goes through our coordinated, transparent support process.",
      },
      {
        value: "org-partnerships",
        question: "Can my organisation partner with Hope4PKD?",
        answer:
          "Yes. We welcome corporate partnerships, grants and institutional funding, community events like the Hope4PKD Walk/Run, and social enterprise collaborations. Reach out through our Contact page to start the conversation.",
      },
      {
        value: "support-accountability",
        question: "How do I know my support is used properly?",
        answer:
          "Every patient case is medically verified before support is coordinated, and our Follow-Up & Impact Monitoring step tracks outcomes after support is delivered. We are a support infrastructure, not an open fundraising platform — accountability is built into how we operate.",
      },
    ],
  },
];

export function FaqSection() {
  return (
    <Box py={{ base: 16, md: 20 }} width="100%">
      <Container maxW="4xl">
        <VStack gap={12} align="stretch">
          {faqGroups.map((group) => (
            <Box key={group.category}>
              <Heading
                as="h2"
                fontSize={{ base: "xl", md: "2xl" }}
                color="brand.500"
                mb={5}
              >
                {group.category}
              </Heading>
              <Accordion.Root collapsible multiple>
                {group.faqs.map((faq) => (
                  <Accordion.Item
                    key={faq.value}
                    value={faq.value}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor="gray.200"
                    mb={4}
                    px={5}
                  >
                    <Accordion.ItemTrigger py={4} cursor="pointer">
                      <Span
                        flex="1"
                        textAlign="left"
                        fontWeight="semibold"
                        color="gray.900"
                      >
                        {faq.question}
                      </Span>
                      <Accordion.ItemIndicator color="brand.500" />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody pb={4}>
                        <Text
                          fontSize="md"
                          color="gray.700"
                          lineHeight="1.8"
                        >
                          {faq.answer}
                        </Text>
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
