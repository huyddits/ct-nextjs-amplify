"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShareIcon, PlusIcon } from "lucide-react";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  const handleInstallClick = async () => {
    if (!deferredPrompt || !(deferredPrompt as any).prompt) return;

    (deferredPrompt as any).prompt();

    const result = await (deferredPrompt as any).userChoice;
    console.log("User response to install prompt:", result);
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  useEffect(() => {
    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  useEffect(() => {
    console.log({ isIOS, isStandalone, navigator });
  }, [isIOS, isStandalone]);

  if (isStandalone) {
    return null; // hide install button if already installed
  }

  return (
    <div>
      <h3 className="font-bold mb-2">Install App</h3>
      {showInstall && (
        <Button className="mb-2" onClick={handleInstallClick}>
          Install App
        </Button>
      )}
      {isIOS && (
        <p className="mb-2">
          To install this app on your iOS device, tap the share button
          <ShareIcon className="inline mx-2" size={20} />
          and then "Add to Home Screen"
          <PlusIcon className="inline mx-2" size={20} />.
        </p>
      )}
    </div>
  );
}
