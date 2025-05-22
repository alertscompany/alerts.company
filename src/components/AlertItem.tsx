
import { cn } from "@/lib/utils";
import { Alert } from "@/pages/Inbox";
import { MoreHorizontal } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Check, Clock, UserPlus, Trash2 } from "lucide-react";

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
        "border-b border-gray-100 py-8 px-8 cursor-pointer hover:bg-gray-50 transition-colors",
        isSelected ? "bg-gray-50" : "bg-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-base font-medium">{alert.title}</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">{formatTimeAgo(alert.timestamp)}</div>
          <ContextMenu>
            <ContextMenuTrigger>
              <button 
                className="p-1.5 rounded-full hover:bg-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500" />
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={() => onAction(alert.id, "do")}>
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Do</span>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAction(alert.id, "defer")}>
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                <span>Defer</span>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAction(alert.id, "delegate")}>
                <UserPlus className="mr-2 h-4 w-4 text-blue-500" />
                <span>Delegate</span>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => onAction(alert.id, "delete")}>
                <Trash2 className="mr-2 h-4 w-4 text-rose-500" />
                <span>Delete</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        {alert.description}
      </p>
      <div className="flex items-center">
        <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 mr-2">
          MTTR
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
          MTTA
        </span>
        <div className="ml-auto text-xs text-gray-500">
          {alert.status === "active" ? (
            <span className="text-amber-600">{alert.service}</span>
          ) : alert.status === "acknowledged" ? (
            <span className="text-blue-600">{alert.service}</span>
          ) : (
            <span className="text-green-600">{alert.service}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
