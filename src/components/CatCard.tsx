
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
        "overflow-hidden border-4 relative rounded-xl transition-all duration-300 transform hover:scale-105", 
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
        <div className={cn(
          "absolute bottom-4 left-0 right-0 text-center uppercase tracking-wider font-bold text-lg",
          {
            "text-orange-500": type === "decide",
            "text-purple-500": type === "defer",
            "text-pink-500": type === "delegate",
            "text-blue-500": type === "do",
            "text-green-500": type === "done",
          }
        )}>
          {type}
        </div>
      </CardContent>
    </Card>
  );
};

export default CatCard;
