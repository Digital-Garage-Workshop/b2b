import {
  ContactUs,
  Faq,
  MainSearch,
  PartBrands,
  PartCategories,
  Statistics,
  SuggestedParts,
} from "@/components";
import { VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <VStack w="100%" gap={32} pb={108}>
      <MainSearch />
      <PartCategories mt={-16} />
      <SuggestedParts />
      <PartBrands />
      <Statistics />
      <Faq />
      <ContactUs />
    </VStack>
  );
}
