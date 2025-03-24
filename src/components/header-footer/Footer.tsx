"use client";
import { grey100 } from "@/theme/colors";
import { HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

const infos = [
  {
    name: "Services",
    links: [
      { name: "Postural correction", link: "Postural correction" },
      { name: "Postural correction", link: "Postural correction" },
      { name: "Postural correction", link: "Postural correction" },
    ],
  },
  {
    name: "About us",
    links: [
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
    ],
  },
  {
    name: "About",
    links: [
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
      { name: "Experts", link: "Postural correction" },
    ],
  },
];

export const Footer = () => {
  const pathname = usePathname();
  return (
    <div
      className="trapezium-container"
      style={{ display: pathname?.includes("sign-up") ? "none" : "flex" }}
    >
      <div className="trapezium">
        <VStack w="full" px={144} h="full">
          <HStack w="full" justify="space-between" align={"flex-start"}>
            {infos.map((item, index) => (
              <VStack gap={1} align="flex-start" key={index}>
                <Text color={grey100} fontSize={10} fontWeight={500} pb={3}>
                  {item.name}
                </Text>
                {item.links.map((links, linbkindex) => (
                  <Text color="white" fontSize={14} key={linbkindex}>
                    {links.name}
                  </Text>
                ))}
              </VStack>
            ))}
            <VStack justify="flex-end" gap={4} w={175} align="flex-end">
              <Image src="whitelogo.svg" />
              <Text color="white" fontSize={14}>
                +976 7200 3003
              </Text>
              <Text color="white" fontSize={14}>
                info@garage.mn
              </Text>
              <Text color="white" fontSize={14} textAlign={"end"}>
                Business Tower 18 давхарт, 2 тоот, Улаанбаатар, Монгол
              </Text>
            </VStack>
          </HStack>
          <HStack w="full" justify="space-between" mt="auto" pb={8}>
            <Text color="white" fontSize={12}>
              © 2023 — Copyright
            </Text>
            <HStack p="8px 16px" bg="#272725" borderRadius={12} gap={6}>
              <HStack gap={4}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.4067 13.6873C16.1952 13.5819 15.1554 13.0727 14.9615 13.0025C14.7676 12.9323 14.6267 12.8971 14.4857 13.1078C14.3447 13.3186 13.9394 13.7927 13.816 13.9332C13.6926 14.0736 13.5692 14.0912 13.3577 13.9858C13.1462 13.8805 12.4648 13.6582 11.657 12.9411C11.0282 12.383 10.6038 11.6937 10.4804 11.4829C10.357 11.2722 10.4672 11.1583 10.5731 11.0534C10.6682 10.9591 10.7846 10.8076 10.8904 10.6846C10.9961 10.5617 11.0314 10.4739 11.1019 10.3335C11.1724 10.193 11.1371 10.0701 11.0842 9.96469C11.0314 9.85933 10.6084 8.82331 10.4321 8.40188C10.2605 7.99145 10.0861 8.04699 9.95628 8.04055C9.83305 8.03444 9.69193 8.03314 9.55093 8.03314C9.40992 8.03314 9.18082 8.08584 8.98692 8.29652C8.79307 8.50724 8.24671 9.01651 8.24671 10.0525C8.24671 11.0885 9.00457 12.0894 9.11032 12.2299C9.21607 12.3704 10.6017 14.4964 12.7233 15.4081C13.2279 15.625 13.6219 15.7545 13.929 15.8515C14.4357 16.0117 14.8967 15.9891 15.2611 15.9349C15.6675 15.8745 16.5125 15.4257 16.6887 14.934C16.8649 14.4424 16.8649 14.0209 16.8121 13.9332C16.7592 13.8454 16.6182 13.7927 16.4067 13.6873ZM12.5478 18.9312H12.5449C11.2825 18.9307 10.0443 18.5932 8.96415 17.9552L8.70724 17.8035L6.04452 18.4986L6.75526 15.9149L6.58795 15.6501C5.88372 14.5353 5.51179 13.2468 5.51231 11.9238C5.51386 8.06341 8.66991 4.92269 12.5506 4.92269C14.4297 4.92342 16.1961 5.65267 17.5244 6.97607C18.8527 8.29951 19.5838 10.0587 19.583 11.9295C19.5815 15.7902 16.4255 18.9312 12.5478 18.9312ZM18.5353 5.97049C16.9372 4.37821 14.812 3.50089 12.5477 3.5C7.88221 3.5 4.08507 7.27871 4.0832 11.9234C4.08259 13.4081 4.47233 14.8573 5.21303 16.1348L4.01221 20.5L8.49935 19.3286C9.73567 19.9997 11.1276 20.3534 12.5443 20.354H12.5478C17.2128 20.354 21.0103 16.5748 21.0122 11.9301C21.0131 9.67921 20.1335 7.56273 18.5353 5.97049Z"
                    fill="white"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.74961 11.4574C9.58144 9.34056 12.8034 7.945 14.4155 7.27074C19.0185 5.34558 19.9749 5.01116 20.5983 5.00012C20.7354 4.99769 21.042 5.03186 21.2406 5.19389C21.4083 5.33071 21.4544 5.51553 21.4765 5.64524C21.4986 5.77496 21.5261 6.07046 21.5042 6.30136C21.2548 8.93675 20.1755 15.3322 19.6264 18.2838C19.394 19.5328 18.9366 19.9516 18.4937 19.9926C17.5311 20.0816 16.8003 19.3529 15.868 18.7384C14.4092 17.7769 13.5851 17.1783 12.1691 16.24C10.5327 15.1556 11.5935 14.5596 12.5261 13.5856C12.7702 13.3307 17.011 9.45188 17.0931 9.10001C17.1034 9.05601 17.1129 8.89197 17.016 8.80535C16.9191 8.71873 16.7761 8.74835 16.6728 8.77191C16.5265 8.8053 14.1961 10.3542 9.68158 13.4185C9.0201 13.8753 8.42095 14.0978 7.88414 14.0862C7.29234 14.0733 6.15396 13.7497 5.30769 13.4731C4.2697 13.1338 3.44473 12.9544 3.51657 12.3782C3.55398 12.0781 3.965 11.7712 4.74961 11.4574Z"
                    fill="white"
                  />
                </svg>
              </HStack>
              <Stack w="1px" height={5} bg="#565551" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.3264 5.41682C21.1886 5.64909 21.8663 6.32682 22.0954 7.18591C22.5122 8.745 22.5122 12 22.5122 12C22.5122 12 22.5122 15.255 22.0954 16.8141C21.8631 17.6764 21.1854 18.3541 20.3264 18.5832C18.7674 19 12.5122 19 12.5122 19C12.5122 19 6.26022 19 4.69802 18.5832C3.83578 18.3509 3.15809 17.6732 2.92901 16.8141C2.51221 15.255 2.51221 12 2.51221 12C2.51221 12 2.51221 8.745 2.92901 7.18591C3.16127 6.32364 3.83896 5.64591 4.69802 5.41682C6.26022 5 12.5122 5 12.5122 5C12.5122 5 18.7674 5 20.3264 5.41682ZM15.7098 12L10.5141 15.0005V8.99955L15.7098 12Z"
                  fill="white"
                />
              </svg>
            </HStack>
            <Text fontSize={12} color="#8F8E8A">
              Privacy
            </Text>
          </HStack>
        </VStack>
      </div>
      <div className="rounded-top"></div>
    </div>
  );
};
