
import { Card, CardContent } from "@/components/ui/card";
import { FilterType } from "@/pages/Inbox";

interface HeroCardProps {
  activeFilter: FilterType;
}

const HeroCard = ({ activeFilter }: HeroCardProps) => {
  // Map each category to its corresponding image
  const getImageForCategory = () => {
    switch (activeFilter) {
      case "active":
        return "/lovable-uploads/f42c0ab6-fa81-4375-bd39-c9eedede9f19.png"; // Decide image
      case "deferred":
        return "/lovable-uploads/834b8209-13da-48db-b46c-cf3a2129475a.png"; // Defer image
      case "delegated":
        return "/lovable-uploads/a2fa4bb5-0fab-40d8-8960-c9fc3830dd2e.png"; // Delegate image
      case "deleted":
        return "/lovable-uploads/96b851a8-2c28-4f70-b1bb-4bce405db533.png"; // Delete image
      case "acknowledged":
        return "/lovable-uploads/d9219b25-dceb-4dcb-ae3a-0aeb969dd7c9.png"; // Do image
      case "done":
        return "/lovable-uploads/04578862-3aaa-4c39-b176-dd269eaca17f.png"; // Done image
      default:
        return "/lovable-uploads/f42c0ab6-fa81-4375-bd39-c9eedede9f19.png"; // Default to Decide image
    }
  };

  // Get category title for display
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

  return (
    <Card className="mb-6 overflow-hidden border-none shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-center justify-center">
          <img
            src={getImageForCategory()}
            alt={`${getCategoryTitle()} category icon`}
            className="w-full max-w-[220px] h-auto"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCard;
