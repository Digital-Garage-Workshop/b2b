"use client";

import { Footer, Header } from "@/components";
import theme from "@/theme";
import {
  ChakraBaseProvider,
  ChakraProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import PageTransition from "./PageTransition";

export const Providers = ({
  children,
}: // session
{
  children: ReactNode;
}) => {
  return (
    <>
      {/* <PageTransition> */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraBaseProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <div className="w-full flex justify-center">
            <div className="w-[82%]">{children}</div>
          </div>
          <Footer />
        </ChakraProvider>
      </ChakraBaseProvider>
      {/* </PageTransition> */}
    </>
  );
};
