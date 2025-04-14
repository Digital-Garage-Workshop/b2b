"use client";
import { Footer, Header } from "@/components";
import theme from "@/theme";
import {
  ChakraBaseProvider,
  ChakraProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import { ReactNode, Suspense, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux/store";

export const Providers = ({
  children,
}: // session
{
  children: ReactNode;
}) => {
  useEffect(() => {
    import("@userback/widget")
      .then((Userback) => {
        Userback.default("A-LWKm0zEYefPcVUVFojPXOxHwm").then((ub: any) => {
          ub.identify("123456", {
            name: "someone",
            email: "someone@example.com",
          });
        });
      })
      .catch((error) => {
        console.error("Failed to load Userback widget:", error);
      });
  }, []);

  return (
    <>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <PageTransition> */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraBaseProvider>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <SessionProvider>
              <Header />
              <div className="w-full flex justify-center mt-[72px]">
                <div className="w-[82%]">{children}</div>
              </div>
              <Footer />
            </SessionProvider>
          </Provider>
        </ChakraProvider>
      </ChakraBaseProvider>
      {/* </Suspense> */}
      {/* </PageTransition> */}
    </>
  );
};
