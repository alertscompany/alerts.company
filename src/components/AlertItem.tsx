
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, Priority, Status } from "@/pages/Inbox";

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onClick: () => void;
}

const AlertItem = ({ alert, isSelected, onClick }: AlertItemProps) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "acknowledged":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Format timestamp to be more human-readable
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (diffInDays === 0) {
      // Today, show time
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // This week, show day name
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      // Older, show date
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      className={cn(
        "border-b border-white/10 p-3 cursor-pointer transition-colors",
        isSelected ? "bg-secondary" : "hover:bg-secondary/50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <div className={cn(
          "font-medium truncate pr-2", 
          alert.status === "acknowledged" ? "text-muted-foreground" : "",
          alert.status === "resolved" ? "line-through text-muted-foreground" : ""
        )}>
          {alert.title}
        </div>
        <div className="flex items-center space-x-1 shrink-0">
          {getStatusIcon(alert.status)}
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(alert.timestamp)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span className="truncate">{alert.service}</span>
        <span className={cn("text-xs px-1.5 py-0.5 rounded-full ml-2", 
          alert.priority === "high" ? "bg-red-500/20 text-red-500" : 
          alert.priority === "medium" ? "bg-amber-500/20 text-amber-500" : 
          "bg-green-500/20 text-green-500"
        )}>
          {alert.priority.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
        {alert.description.split('\n')[0]}
      </div>
    </div>
  );
};

export default AlertItem;
