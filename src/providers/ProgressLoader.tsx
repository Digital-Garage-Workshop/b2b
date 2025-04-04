"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ProgressLoader() {
  const [progress, setProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const routeChangeStartedRef = useRef<boolean>(false);
  const currentUrl = pathname + (searchParams?.toString() || "");
  const prevUrlRef = useRef<string>(currentUrl);
  const isFirstRenderRef = useRef<boolean>(true);
  // Add a ref to track the last progress value to prevent backward movement
  const lastProgressRef = useRef<number>(0);

  // Reset all timers
  const clearAllTimers = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };

  // Add a timeout and track it for cleanup
  const addTimeout = (callback: () => void, delay: number): NodeJS.Timeout => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Update progress with smooth transitions
  const updateProgress = (newValue: number): void => {
    // Only update if the new value is greater than the last value (prevent backward movement)
    if (newValue >= lastProgressRef.current) {
      setProgress(newValue);
      lastProgressRef.current = newValue;
    }
  };

  // Start loading animation
  const startLoading = (): void => {
    // Clear any existing animations
    clearAllTimers();
    routeChangeStartedRef.current = true;

    // Reset and show loader
    lastProgressRef.current = 0;
    setProgress(0);
    setIsVisible(true);

    // Fast initial progress to 20%
    addTimeout(() => updateProgress(20), 10);

    // Then progress more gradually to 80%
    // Use smaller increments and more frequent updates for smoother animation
    intervalRef.current = setInterval(() => {
      if (lastProgressRef.current >= 80) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Slow and steady progress from 80% to 90%
        intervalRef.current = setInterval(() => {
          updateProgress(Math.min(90, lastProgressRef.current + 0.1));
        }, 200);
      } else {
        const remaining = 80 - lastProgressRef.current;
        // Use a smoother curve with smaller increments
        const increment = Math.max(0.2, remaining / 25);
        updateProgress(Math.min(80, lastProgressRef.current + increment));
      }
    }, 50); // More frequent updates for smoother animation

    // Safety timeout - if navigation takes too long, complete anyway
    addTimeout(() => {
      if (routeChangeStartedRef.current) {
        completeLoading();
      }
    }, 8000);
  };

  // Complete loading animation
  const completeLoading = (): void => {
    clearAllTimers();
    routeChangeStartedRef.current = false;

    // Smooth transition to 100%
    // Add intermediary step to 95% first for smoother visual
    if (lastProgressRef.current < 95) {
      updateProgress(95);
      addTimeout(() => updateProgress(100), 100);
    } else {
      updateProgress(100);
    }

    // Hide after animation completes with a slightly longer delay
    addTimeout(() => {
      setIsVisible(false);
      // Reset progress only after fade-out is complete
      addTimeout(() => {
        setProgress(0);
        lastProgressRef.current = 0;
      }, 400);
    }, 400);
  };

  // Handle the URL change
  useEffect(() => {
    // Skip initial render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevUrlRef.current = currentUrl;
      return;
    }

    // If URL has changed, start loading animation
    if (currentUrl !== prevUrlRef.current) {
      // Only start if we're not already loading
      if (!routeChangeStartedRef.current) {
        startLoading();
      }

      // Update the stored URL
      prevUrlRef.current = currentUrl;

      // Simulate navigation completion
      addTimeout(completeLoading, 800);
    }

    // Cleanup function
    return () => {
      clearAllTimers();
    };
  }, [currentUrl]);

  // Additional navigation monitoring
  useEffect(() => {
    // Keep track of ongoing navigation requests to prevent multiple overlapping animations
    let pendingNavigations = 0;

    // Add click listener for link detection
    const handleClick = (e: MouseEvent): void => {
      // Look for link clicks
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (
        link &&
        link.href &&
        link.href.startsWith(window.location.origin) &&
        !link.target &&
        !link.download &&
        !(e.ctrlKey || e.metaKey || e.shiftKey)
      ) {
        // Only start if we're not already loading
        if (!routeChangeStartedRef.current) {
          startLoading();
        }
      }
    };

    // Monitor browser navigation events
    const handlePopState = (): void => {
      // Only start if we're not already loading
      if (!routeChangeStartedRef.current) {
        startLoading();
        // Complete after a short delay
        addTimeout(completeLoading, 700);
      }
    };

    // Register mutation observer for DOM changes that might indicate loading
    const observer = new MutationObserver(
      (mutations: MutationRecord[]): void => {
        // Only process if we're not already tracking a navigation
        if (!routeChangeStartedRef.current) {
          // Look for significant DOM changes that might indicate page transition
          const significantChanges = mutations.some(
            (mutation) =>
              mutation.type === "childList" &&
              (mutation.addedNodes.length > 3 ||
                mutation.removedNodes.length > 3)
          );

          if (significantChanges) {
            startLoading();
            addTimeout(completeLoading, 500);
          }
        }
      }
    );

    // Start observing with a configuration sensitive to DOM changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });

    // Monitor network activity
    const originalFetch = window.fetch;
    window.fetch = function (...args): Promise<Response> {
      // Check if this might be a navigation
      const url = args[0]?.toString();
      if (
        url &&
        !url.includes("/api/") &&
        !url.includes(".json") &&
        !url.includes(".js") &&
        !url.includes(".css") &&
        !url.includes(".png") &&
        !url.includes(".jpg") &&
        !url.includes(".svg")
      ) {
        pendingNavigations++;
        if (!routeChangeStartedRef.current) {
          startLoading();
        }
      }

      return originalFetch.apply(this, args).finally(() => {
        pendingNavigations--;
        // If this was a navigation-related fetch and all requests are completed
        if (routeChangeStartedRef.current && pendingNavigations === 0) {
          addTimeout(completeLoading, 200);
        }
      });
    };

    document.addEventListener("click", handleClick as EventListener);
    window.addEventListener("popstate", handlePopState);

    // Clean up
    return () => {
      document.removeEventListener("click", handleClick as EventListener);
      window.removeEventListener("popstate", handlePopState);
      observer.disconnect();
      window.fetch = originalFetch;
      clearAllTimers();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        backgroundColor: "#F75B00",
        transition:
          progress === 0
            ? "none"
            : progress === 100
            ? "width 200ms cubic-bezier(0.33, 1, 0.68, 1), opacity 200ms ease-out"
            : "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        boxShadow: "0 1px 3px rgba(247, 91, 0, 0.5)",
        pointerEvents: "none",
      }}
    />
  );
}
