import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LOAH — Built for ADHD Minds",
    short_name: "LOAH",
    description:
      "Zero-activation brain dump tool designed specifically for ADHD working memory and executive dysfunction.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F17",
    theme_color: "#0B0F17",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
