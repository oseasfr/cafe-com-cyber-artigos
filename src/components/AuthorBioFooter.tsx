import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorBioFooterProps {
  author: string;
  authorFirstName?: string;
  authorLastName?: string;
  authorAvatar?: string;
  authorBio?: string;
  authorSocialLink?: string;
}

export function AuthorBioFooter({
  author,
  authorFirstName,
  authorLastName,
  authorAvatar,
  authorBio,
  authorSocialLink,
}: AuthorBioFooterProps) {
  if (!authorBio && !author) return null;

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
    <>
      <hr className="border-border my-8" />
      <div className="flex items-start space-x-4 mb-8">
        <Avatar className="h-16 w-16 border-2 border-border flex-shrink-0">
          <AvatarImage src={getAvatarUrl()} alt={displayName} />
          <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {authorSocialLink ? (
            <a
              href={authorSocialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors inline-block mb-2"
            >
              {displayName}
            </a>
          ) : (
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {displayName}
            </h3>
          )}
          {authorBio && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {authorBio}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
