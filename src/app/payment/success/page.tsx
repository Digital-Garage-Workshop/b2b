"use client";
import { GetPuchaseDetail } from "@/_services/user";
import { CartProductCard, OrderTrack } from "@/components";
import GoogleMapComponent from "@/components/payment/success/GoogleMap";
import { UseApi } from "@/hooks";
import { ExelIcon } from "@/icons";
import { grey200, grey500 } from "@/theme/colors";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const purchaseid = searchParams?.get("purchase");
  const [{ data: purchaseDetail, isLoading }, getPurchaseDetail] = UseApi({
    service: GetPuchaseDetail,
    useAuth: true,
  });

  useEffect(() => {
    getPurchaseDetail({ purchaseid: purchaseid });
  }, []);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const markers = [
    {
      id: "1",
      position: { lat: 47.92105826636121, lng: 106.91567848154885 },
      title: "New York City",
      content: "The Big Apple",
    },
    {
      id: "2",
      position: { lat: 47.91450317754723, lng: 106.91617603682525 },
      title: "Empire State Building",
      content: "Famous skyscraper in NYC",
    },
  ];

  const pathOptions = {
    polylineOptions: {
      strokeColor: "#FF5722",
      strokeWeight: 5,
      strokeOpacity: 0.8,
    },
  };

  return (
    <HStack w="full" pb={110} pt={6} align="flex-start" minH="100vh">
      <VStack flex={1} gap={6}>
        <OrderTrack orderDetail={purchaseDetail} />
        <VStack
          w="full"
          gap={6}
          align="flex-start"
          p={6}
          borderRadius={8}
          border={`1px solid ${grey200}`}
          flex={4}
        >
          <HStack w="full" justify="space-between">
            <HStack gap={4}>
              <Text variant="h8">Сагс</Text>
              <Text variant="subtitle2" color={grey500}>
                {purchaseDetail?.inventories?.length} items
              </Text>
            </HStack>
          </HStack>
          <Button w="full" variant="outline" leftIcon={<ExelIcon />}>
            Excel файлаар татах
          </Button>
          {purchaseDetail?.inventories?.map((product: any, index: number) => (
            <CartProductCard
              key={index}
              setLocalProducts={() => {}}
              isStatic={true}
              data={product}
              setAllTotal={() => {}}
            />
          ))}
        </VStack>
      </VStack>
      <VStack flex={1} borderRadius={8} overflow="hidden" p={0}>
        <GoogleMapComponent
          apiKey={GOOGLE_MAPS_API_KEY}
          markers={markers}
          pathOptions={pathOptions}
          center={{ lat: 47.92105826636121, lng: 106.91567848154885 }}
          // The road will automatically show between points 1 and 2
        />
      </VStack>
    </HStack>
  );
}
