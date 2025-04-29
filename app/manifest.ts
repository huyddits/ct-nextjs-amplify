import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cheer Trainer",
    short_name: "Cheer Trainer",
    description: "Cheer Trainer PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
