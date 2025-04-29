"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("[Service Worker] Registered:", registration);
          })
          .catch((registrationError) => {
            console.error(
              "[Service Worker] Registration failed:",
              registrationError
            );
          });
      });
    }
  }, []);

  return null;
}
