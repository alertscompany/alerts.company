
import { CheckCircle, Clock, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertAction, Priority } from "@/pages/Inbox";
import { cn } from "@/lib/utils";

interface AlertDetailProps {
  alert: Alert;
  onAction: (action: AlertAction) => void;
}

const AlertDetail = ({ alert, onAction }: AlertDetailProps) => {
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

  const renderTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold">{alert.title}</h2>
        <div className={cn("px-3 py-1 rounded-full text-xs font-semibold", 
          alert.priority === "high" ? "bg-red-500/20 text-red-500" :
          alert.priority === "medium" ? "bg-amber-500/20 text-amber-500" :
          "bg-green-500/20 text-green-500"
        )}>
          {alert.priority.toUpperCase()} PRIORITY
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div>
          <p className="text-muted-foreground">Service</p>
          <p className="font-medium">{alert.service}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Time</p>
          <p className="font-medium">{renderTimestamp(alert.timestamp)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Status</p>
          <p className="font-medium capitalize">{alert.status}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <div className="bg-secondary p-4 rounded-lg text-sm whitespace-pre-line">
          {alert.description}
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          <Button 
            onClick={() => onAction("do")} 
            className="flex flex-col gap-1 h-auto py-3"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Do</span>
          </Button>
          <Button 
            onClick={() => onAction("defer")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="secondary"
          >
            <Clock className="h-5 w-5" />
            <span>Defer</span>
          </Button>
          <Button 
            onClick={() => onAction("delegate")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="secondary"
          >
            <UserPlus className="h-5 w-5" />
            <span>Delegate</span>
          </Button>
          <Button 
            onClick={() => onAction("delete")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="destructive"
          >
            <Trash2 className="h-5 w-5" />
            <span>Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
