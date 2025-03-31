import { BreadCrumb, PaymentPay } from "@/components";
import { VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack w="full" pb={110} minH="100vh">
      <BreadCrumb
        crumbs={[
          { path: "Cart", href: "/cart" },
          { path: "Payment", href: "" },
        ]}
      />
      <PaymentPay />
    </VStack>
  );
}
