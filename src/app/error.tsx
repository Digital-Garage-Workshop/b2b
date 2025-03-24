"use client"; // Required for error boundaries

import { Button, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4 gap-4">
      <h1 className="text-4xl font-bold">500 - Something went wrong!</h1>
      <p className="mt-2 text-lg">We encountered an unexpected error.</p>
      <VStack gap={4}>
        <Button variant="outline" w="fit-content" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href={"/"}>
          <Button maxW={200}>Go home</Button>
        </Link>
      </VStack>
    </div>
  );
}
