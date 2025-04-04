import { BreadCrumb, ExcelCard } from "@/components";
import { grey600 } from "@/theme/colors";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";

export default function Page() {
  return (
    <VStack w="full" gap={6} minH="100vh" pb={180}>
      <BreadCrumb crumbs={[{ path: "Excel import", href: "" }]} mb={-2} />
      <VStack w="full" align="flex-start">
        <Text variant="h5">Таны excel файлын үр дүн</Text>
        <Text variant="body1" color={grey600}>
          Жагсаалтад нэмэхийг хүсч буй зүйлсээ сонгоно уу.
        </Text>
      </VStack>

      <VStack w="full" gap={6} align="flex-start">
        <Text variant="h7">1862O0009P OEM дугаартай 4 бараа оллоо</Text>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <ExcelCard key={item} />
        ))}
        <HStack w="full">
          <Button flex={1} variant="outline">
            Skip
          </Button>
          <Button flex={1} rightIcon={<IconArrowRight />}>
            Add to list
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
