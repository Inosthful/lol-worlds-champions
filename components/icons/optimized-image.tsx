import { getAssetPath } from "@/lib/utils/assets";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
  return <Image src={getAssetPath(src)} alt={alt} {...props} />;
}
