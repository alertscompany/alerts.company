
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Import the FilterType directly from the file
// Fix the TypeScript error by extracting the type from Inbox.tsx
type FilterType = "active" | "acknowledged" | "resolved" | "delegated" | "deferred" | "deleted" | "done";

interface HeroCardProps {
  activeFilter: FilterType;
}

const HeroCard = ({ activeFilter }: HeroCardProps) => {
  // Map each category to its corresponding image
  const getImageForCategory = () => {
    switch (activeFilter) {
      case "active":
        return "/lovable-uploads/c57ed06e-33f4-48f3-bc66-b411234a323f.png"; // Decide image
      case "deferred":
        return "/lovable-uploads/9dfbc446-1a59-4424-ab9c-e2985bd207dd.png"; // Defer image
      case "delegated":
        return "/lovable-uploads/9a020476-6444-4e08-9aa5-cd7012c3c5b7.png"; // Delegate image
      case "deleted":
        return "/lovable-uploads/96b851a8-2c28-4f70-b1bb-4bce405db533.png"; // Delete image
      case "acknowledged":
        return "/lovable-uploads/97448654-99c4-43b1-8d00-e8abf3942a2d.png"; // Do image
      case "done":
        return "/lovable-uploads/d558a30a-4e79-4b02-a23e-bb4d183eb0b5.png"; // Done image
      default:
        return "/lovable-uploads/c57ed06e-33f4-48f3-bc66-b411234a323f.png"; // Default to Decide image
    }
  };

  // Get category title for avatar fallback
  const getCategoryTitle = () => {
    switch (activeFilter) {
      case "active":
        return "Decide";
      case "deferred":
        return "Defer";
      case "delegated":
        return "Delegate";
      case "deleted":
        return "Delete";
      case "acknowledged":
        return "Do";
      case "done":
        return "Done";
      default:
        return "Decide";
    }
  };

  // Get border color based on category
  const getBorderColor = () => {
    switch (activeFilter) {
      case "active":
        return "border-orange-500 cat-decide";
      case "deferred":
        return "border-purple-500 cat-defer";
      case "delegated":
        return "border-pink-500 cat-delegate";
      case "deleted":
        return "border-red-500";
      case "acknowledged":
        return "border-blue-500 cat-do";
      case "done":
        return "border-green-500 cat-done";
      default:
        return "border-orange-500";
    }
  };

  return (
    <div className="fixed top-24 left-8 z-10">
      <Avatar className={`h-40 w-40 border-4 ${getBorderColor()} shadow-xl`}>
        <AvatarImage
          src={getImageForCategory()}
          alt={`${getCategoryTitle()} category icon`}
          className="object-cover"
        />
        <AvatarFallback className="bg-primary text-2xl font-bold">
          {getCategoryTitle().charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default HeroCard;
