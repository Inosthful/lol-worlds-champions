import { cn } from "@/lib/utils";
import Image from "next/image";

interface RoleIconProps {
  role: "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";
  className?: string;
}

export function RoleIcon({ role, className }: RoleIconProps) {
  const roleImages = {
    TOP: "/images/roles/top.svg",
    JUNGLE: "/images/roles/jungle.svg",
    MID: "/images/roles/mid.svg",
    ADC: "/images/roles/adc.svg",
    SUPPORT: "/images/roles/support.svg",
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
        src={roleImages[role]}
        alt={roleNames[role]}
        width={24}
        height={24}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
