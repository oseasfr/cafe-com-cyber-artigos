import {
  Shield,
  Lock,
  Eye,
  Key,
  Bug,
  Network,
  Cloud,
  Search,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const categoryIcons: Record<
  string,
  { Icon: LucideIcon; color: string }
> = {
  "Web Security": { Icon: Shield, color: "text-blue-500" },
  Architecture: { Icon: Shield, color: "text-purple-500" },
  Intelligence: { Icon: Eye, color: "text-green-500" },
  "Network Security": { Icon: Network, color: "text-orange-500" },
  Cryptography: { Icon: Key, color: "text-yellow-500" },
  Malware: { Icon: Bug, color: "text-red-500" },
  "Cloud Security": { Icon: Cloud, color: "text-sky-500" },
  Forensics: { Icon: Search, color: "text-cyan-500" },
  "Troubleshooting Linux": { Icon: Terminal, color: "text-blue-500" },
  kubernetes: { Icon: Shield, color: "text-blue-500" },
  monitoring: { Icon: Eye, color: "text-sky-500" },
};

const iconMap: Record<string, { Icon: LucideIcon; color: string }> = {
  Shield: { Icon: Shield, color: "text-blue-500" },
  Lock: { Icon: Lock, color: "text-purple-500" },
  Eye: { Icon: Eye, color: "text-green-500" },
  Key: { Icon: Key, color: "text-yellow-500" },
  Bug: { Icon: Bug, color: "text-red-500" },
  Network: { Icon: Network, color: "text-orange-500" },
  Cloud: { Icon: Cloud, color: "text-sky-500" },
  Search: { Icon: Search, color: "text-cyan-500" },
};

export function getArticleIcon(
  category: string,
  iconName?: string
): { Icon: LucideIcon; color: string } {
  if (categoryIcons[category]) return categoryIcons[category];
  if (iconName && iconMap[iconName]) return iconMap[iconName];
  return { Icon: Shield, color: "text-primary" };
}
