import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/utils/assets";
import { Trophy } from "lucide-react";
import Image from "next/image";

interface TeamIconProps {
  teamId: string;
  teamName: string;
  className?: string;
  fallbackIcon?: boolean;
}

export function TeamIcon({
  teamId,
  teamName,
  className,
  fallbackIcon = true,
}: TeamIconProps) {
  // ✅ Utiliser seulement les noms de fichiers, pas les chemins complets
  const teamLogos: Record<string, string> = {
    fnatic: "fnatic.png",
    tpa: "taipei.png",
    ssw: "ssw.webp",
    skt: "t1.png",
    ssg: "ssg.png",
    ig: "ig.webp",
    fpx: "fpx.png",
    dwg: "dwg.webp",
    edg: "edg.png",
    drx: "drx.png",
  };

  const logoFileName = teamLogos[teamId];

  if (logoFileName) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src={getImagePath(logoFileName, "teams")}
          alt={`Logo ${teamName}`}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Fallback vers l'icône Trophy si pas de logo et fallbackIcon = true
  if (fallbackIcon) {
    return <Trophy className={cn("text-amber-500", className)} />;
  }

  return null;
}
