"use client";

import { Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
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
