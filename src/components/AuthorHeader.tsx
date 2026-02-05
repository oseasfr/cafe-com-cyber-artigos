import { formatDaysAgo } from "@/lib/dateFormatter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorHeaderProps {
  author: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorAvatar?: string;
  authorSocialLink?: string;
  publishedAt?: string;
  readTime: string;
}

export function AuthorHeader({
  author,
  authorFirstName,
  authorLastName,
  authorAvatar,
  authorSocialLink,
  publishedAt,
  readTime,
}: AuthorHeaderProps) {
  const formattedDate = formatDaysAgo(publishedAt);
  const displayName =
    authorFirstName && authorLastName
      ? `${authorFirstName} ${authorLastName}`
      : author;

  const getAvatarUrl = () => {
    const avatarPath = authorAvatar || "/images/authors/default-avatar.jpg";
    if (avatarPath.startsWith("http")) return avatarPath;
    const path = avatarPath.startsWith("/") ? avatarPath : "/" + avatarPath;
    return typeof window !== "undefined" ? window.location.origin + path : path;
  };

  return (
    <div className="text-muted-foreground mb-8 flex items-center space-x-3">
      <Avatar className="h-12 w-12 border-2 border-border">
        <AvatarImage src={getAvatarUrl()} alt={displayName} />
        <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          {authorSocialLink ? (
            <a
              href={authorSocialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {displayName}
            </a>
          ) : (
            <span className="text-sm font-medium text-foreground">
              {displayName}
            </span>
          )}
        </div>
        <div className="flex items-center text-xs space-x-2 mt-1">
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}
