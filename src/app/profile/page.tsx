"use client";
import {
  BreadCrumb,
  Orders,
  PersonalInfo,
  SideBar,
  UserAddresses,
} from "@/components";
import { HStack, VStack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const sidebar = searchParams?.get("tag");

  return (
    <VStack w="100%" minH="100vh">
      <BreadCrumb crumbs={[{ path: "Хэрэглэгчийн хэсэг", href: "/profile" }]} />
      <HStack w="full" gap={6} align="flex-start">
        <VStack flex={2}>
          <SideBar />
        </VStack>
        <VStack flex={6}>
          {sidebar === "Хэрэглэгчийн тохиргоо" ? (
            <PersonalInfo />
          ) : sidebar === "Хүргэлтийн хаяг" ? (
            <UserAddresses />
          ) : (
            <Orders />
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}
