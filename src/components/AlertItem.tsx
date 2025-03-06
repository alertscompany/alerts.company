
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

  return (
    <div
      className={cn(
        "border-b border-white/10 p-4 cursor-pointer transition-colors",
        isSelected ? "bg-secondary" : "hover:bg-secondary/50"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <div className="font-medium truncate pr-2">{alert.title}</div>
        <div className="flex items-center space-x-1">
          {getStatusIcon(alert.status)}
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{alert.service}</span>
        <span className={cn("text-xs", getPriorityColor(alert.priority))}>
          {alert.priority.toUpperCase()}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {new Date(alert.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default AlertItem;
