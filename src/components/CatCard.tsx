
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

export type CatType = "decide" | "defer" | "delegate" | "do" | "done";

interface CatCardProps {
  type: CatType;
  imagePath: string;
  className?: string;
}

const CatCard: FC<CatCardProps> = ({ type, imagePath, className }) => {
  const typeClasses = {
    decide: "cat-decide border-orange-500",
    defer: "cat-defer border-purple-500",
    delegate: "cat-delegate border-pink-500",
    do: "cat-do border-blue-500",
    done: "cat-done border-green-500",
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden border-4 relative rounded-xl transition-all duration-300 transform hover:scale-[1.02]", 
        typeClasses[type],
        className
      )}
    >
      <CardContent className="p-0">
        <img 
          src={imagePath} 
          alt={`${type} cat`}
          className="w-full h-full object-cover"
        />
      </CardContent>
    </Card>
  );
};

export default CatCard;
