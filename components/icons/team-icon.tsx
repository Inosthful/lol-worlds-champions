import { cn } from "@/lib/utils";
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
  const teamLogos: Record<string, string> = {
    fnatic: "/images/teams/fnatic.png",
    tpa: "/images/teams/taipei.png",
    ssw: "/images/teams/ssw.webp",
    skt: "/images/teams/t1.png",
    ssg: "/images/teams/ssg.png",
    ig: "/images/teams/ig.webp",
    fpx: "/images/teams/fpx.png",
    dwg: "/images/teams/dwg.webp",
    edg: "/images/teams/edg.png",
    drx: "/images/teams/drx.png",
  };

  const logoPath = teamLogos[teamId];

  if (logoPath) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src={logoPath}
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
