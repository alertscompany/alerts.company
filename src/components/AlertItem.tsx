
import { cn } from "@/lib/utils";
import { Alert } from "@/pages/Inbox";
import { MoreHorizontal, Check, Clock, UserPlus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onClick: () => void;
  formatTimeAgo: (timestamp: string) => string;
  onAction: (alertId: string, action: "do" | "defer" | "delegate" | "delete") => void;
}

const AlertItem = ({ alert, isSelected, onClick, formatTimeAgo, onAction }: AlertItemProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden",
        isSelected ? "border-blue-300 ring-1 ring-blue-300" : ""
      )}
      onClick={onClick}
    >
      {/* Slack-like message header */}
      <div className="border-l-4 border-blue-500 pl-4 pr-6 py-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="font-medium text-gray-900">{alert.service}</div>
            <div className="text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</div>
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
        
        {/* Message title */}
        <h3 className="text-base font-bold mb-2">{alert.title}</h3>
        
        {/* Message content */}
        <div className="text-sm text-gray-700 mb-4">
          {alert.description}
        </div>
        
        {/* Status tags at bottom */}
        <div className="flex items-center gap-2 mt-2">
          <span className={cn(
            "text-xs px-2.5 py-1 rounded-full font-medium",
            alert.status === "active" ? "bg-amber-100 text-amber-800" : 
            alert.status === "acknowledged" ? "bg-blue-100 text-blue-800" : 
            "bg-green-100 text-green-800"
          )}>
            {alert.status === "active" ? "Needs Decision" : 
             alert.status === "acknowledged" ? "In Progress" : 
             "Resolved"}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
            MTTR
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
            MTTA
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
