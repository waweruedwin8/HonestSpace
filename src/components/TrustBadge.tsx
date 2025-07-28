import { Shield, CheckCircle, Wifi, Droplets, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  type: "verified" | "safe-night" | "good-internet" | "water-24-7" | "scout-verified";
  className?: string;
}

const badgeConfig = {
  "verified": {
    icon: CheckCircle,
    label: "Verified Listing",
    bgColor: "bg-verified",
    textColor: "text-verified-foreground"
  },
  "safe-night": {
    icon: Eye,
    label: "Safe at Night",
    bgColor: "bg-trust",
    textColor: "text-trust-foreground"
  },
  "good-internet": {
    icon: Wifi,
    label: "Good Internet",
    bgColor: "bg-accent",
    textColor: "text-accent-foreground"
  },
  "water-24-7": {
    icon: Droplets,
    label: "24/7 Water",
    bgColor: "bg-primary",
    textColor: "text-primary-foreground"
  },
  "scout-verified": {
    icon: Shield,
    label: "Scout Verified",
    bgColor: "bg-secondary",
    textColor: "text-secondary-foreground"
  }
};

export const TrustBadge = ({ type, className }: TrustBadgeProps) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-soft",
      config.bgColor,
      config.textColor,
      className
    )}>
      <Icon className="w-3 h-3" />
      {config.label}
    </div>
  );
};