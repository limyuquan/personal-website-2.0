import type { ImageLoaderProps } from "next/image";
import manifest from "./project-image-manifest.json";

type ProjectImage = {
  width: number;
  height: number;
  variants: { width: number; src: string }[];
};

export function getProjectImage(src: string): ProjectImage {
  const image = (manifest as Record<string, ProjectImage>)[src];
  if (!image) throw new Error(`Run npm run images:projects for ${src}`);
  return image;
}

// These files are prepared once rather than resized on the first CDN request.
export function projectImageLoader({ src, width }: ImageLoaderProps): string {
  const image = getProjectImage(src);
  return image.variants.find((variant) => variant.width >= width)?.src ?? src;
}
