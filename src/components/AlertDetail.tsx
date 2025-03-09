
import { CheckCircle, Clock, Trash2, UserPlus, Archive, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertAction, Priority } from "@/pages/Inbox";
import { cn } from "@/lib/utils";

interface AlertDetailProps {
  alert: Alert;
  onAction: (action: AlertAction) => void;
}

const AlertDetail = ({ alert, onAction }: AlertDetailProps) => {
  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
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
    <div className="p-6 max-w-3xl mx-auto">
      {/* Alert header */}
      <div className="flex items-center mb-1">
        {getPriorityIcon(alert.priority)}
        <span className={cn("text-xs font-medium ml-2 px-2 py-0.5 rounded-full", 
          alert.priority === "high" ? "bg-red-500/20 text-red-500" : 
          alert.priority === "medium" ? "bg-amber-500/20 text-amber-500" : 
          "bg-green-500/20 text-green-500"
        )}>
          {alert.priority.toUpperCase()} PRIORITY
        </span>
        <span className="text-xs text-muted-foreground ml-auto">
          {renderTimestamp(alert.timestamp)}
        </span>
      </div>

      {/* Alert title */}
      <h1 className="text-2xl font-semibold mb-4">{alert.title}</h1>
      
      {/* Service info */}
      <div className="mb-6 flex items-center">
        <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-xs font-medium">
          {alert.service.slice(0, 2).toUpperCase()}
        </div>
        <div className="ml-3">
          <p className="font-medium">{alert.service}</p>
          <p className="text-xs text-muted-foreground">Status: <span className="capitalize">{alert.status}</span></p>
        </div>
      </div>

      {/* Alert description */}
      <div className="rounded-lg mb-8 whitespace-pre-line text-sm">
        {alert.description}
      </div>

      {/* Action toolbar */}
      <div className="border-t border-white/10 pt-4 flex justify-between">
        <div className="grid grid-cols-4 gap-3 w-full">
          <Button 
            onClick={() => onAction("do")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="ghost"
            size="sm"
          >
            <CheckCircle className="h-5 w-5" />
            <span className="text-xs">Do (E)</span>
          </Button>
          <Button 
            onClick={() => onAction("defer")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="ghost"
            size="sm"
          >
            <Clock className="h-5 w-5" />
            <span className="text-xs">Defer (S)</span>
          </Button>
          <Button 
            onClick={() => onAction("delegate")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="ghost"
            size="sm"
          >
            <UserPlus className="h-5 w-5" />
            <span className="text-xs">Delegate (D)</span>
          </Button>
          <Button 
            onClick={() => onAction("delete")} 
            className="flex flex-col gap-1 h-auto py-3"
            variant="ghost"
            size="sm"
          >
            <Trash2 className="h-5 w-5" />
            <span className="text-xs">Delete (#)</span>
          </Button>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">Press <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">?</kbd> to view all keyboard shortcuts</p>
      </div>
    </div>
  );
};

export default AlertDetail;
