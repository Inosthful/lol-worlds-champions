import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/utils/assets";
import Image from "next/image";

interface RoleIconProps {
  role: "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";
  className?: string;
}

export function RoleIcon({ role, className }: RoleIconProps) {
  // ✅ Utiliser seulement les noms de fichiers, pas les chemins complets
  const roleImages: Record<string, string> = {
    TOP: "top.svg",
    JUNGLE: "jungle.svg",
    MID: "mid.svg",
    ADC: "adc.svg",
    SUPPORT: "support.svg",
  };

  const roleNames = {
    TOP: "Top Lane",
    JUNGLE: "Jungle",
    MID: "Mid Lane",
    ADC: "ADC",
    SUPPORT: "Support",
  };

  return (
    <div className={cn("relative", className)}>
      <Image
        src={getImagePath(roleImages[role], "roles")}
        alt={roleNames[role]}
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
