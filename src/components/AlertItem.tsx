
import { cn } from "@/lib/utils";
import { Alert } from "@/pages/Inbox";
import { MoreHorizontal, Check, Clock, UserPlus, Trash2, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onClick: () => void;
  formatTimeAgo: (timestamp: string) => string;
  onAction: (alertId: string, action: "do" | "defer" | "delegate" | "delete" | "discuss") => void;
}

const AlertItem = ({ alert, isSelected, onClick, formatTimeAgo, onAction }: AlertItemProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-3",
        isSelected ? "border-blue-300 ring-1 ring-blue-300" : ""
      )}
      onClick={onClick}
    >
      <div className="pl-4 pr-6 py-4">
        {/* Slack-style header with app name and timestamp */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{alert.service}</span>
            <span className="text-xs text-slate-500">{formatTimeAgo(alert.timestamp)}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="p-1.5 rounded-full hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
              <DropdownMenuItem onClick={() => onAction(alert.id, "do")}>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Decide</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(alert.id, "defer")}>
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                <span>Defer</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(alert.id, "delegate")}>
                <UserPlus className="mr-2 h-4 w-4 text-blue-500" />
                <span>Delegate</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(alert.id, "delete")}>
                <Trash2 className="mr-2 h-4 w-4 text-rose-500" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Message title - more prominent like in Slack */}
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{alert.title}</h3>
        
        {/* Message content - with Slack-like styling */}
        <div className="text-base text-slate-700 mb-3 font-normal leading-relaxed">
          {alert.description}
        </div>
        
        {/* Bottom row with tags and discuss button - Slack style */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded font-medium",
              alert.status === "active" ? "bg-amber-100 text-amber-800" : 
              alert.status === "acknowledged" ? "bg-blue-100 text-blue-800" : 
              "bg-green-100 text-green-800"
            )}>
              {alert.status === "active" ? "Needs Decision" : 
              alert.status === "acknowledged" ? "In Progress" : 
              "Resolved"}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              MTTR: 2h 15m
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              MTTA: 45m
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
            onClick={(e) => {
              e.stopPropagation();
              onAction(alert.id, "discuss");
            }}
          >
            <MessageCircle className="h-3.5 w-3.5 text-blue-600" />
            Discuss
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
