
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
        return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      case "medium":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
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
      hour12: true
    });
  };

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      {/* Alert header */}
      <div className="flex items-center mb-2">
        {getPriorityIcon(alert.priority)}
        <span className={cn("text-xs font-medium ml-2 px-2.5 py-1 rounded-full", 
          alert.priority === "high" ? "bg-rose-50 text-rose-600" : 
          alert.priority === "medium" ? "bg-amber-50 text-amber-600" : 
          "bg-emerald-50 text-emerald-600"
        )}>
          {alert.priority.toUpperCase()} PRIORITY
        </span>
        <span className="text-xs text-gray-500 ml-auto">
          {renderTimestamp(alert.timestamp)}
        </span>
      </div>

      {/* Alert title */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">Piyush loves this</h1>
      
      {/* Service info */}
      <div className="mb-6 flex items-center">
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
          {alert.service.slice(0, 2).toUpperCase()}
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">{alert.service}</p>
          <p className="text-sm text-gray-500">Status: <span className="capitalize">{alert.status}</span></p>
        </div>
      </div>

      {/* Alert description */}
      <div className="rounded-2xl bg-white p-6 mb-8 shadow-sm border border-gray-100 whitespace-pre-line text-gray-700">
        {alert.description}
      </div>

      {/* Action toolbar */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <Button 
            onClick={() => onAction("do")} 
            className="flex flex-col items-center gap-1.5 h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm"
            variant="outline"
          >
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium">Do (E)</span>
          </Button>
          <Button 
            onClick={() => onAction("defer")} 
            className="flex flex-col items-center gap-1.5 h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm"
            variant="outline"
          >
            <Clock className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Defer (S)</span>
          </Button>
          <Button 
            onClick={() => onAction("delegate")} 
            className="flex flex-col items-center gap-1.5 h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm"
            variant="outline"
          >
            <UserPlus className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium">Delegate (D)</span>
          </Button>
          <Button 
            onClick={() => onAction("archive")} 
            className="flex flex-col items-center gap-1.5 h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm"
            variant="outline"
          >
            <Archive className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Archive (A)</span>
          </Button>
          <Button 
            onClick={() => onAction("delete")} 
            className="flex flex-col items-center gap-1.5 h-auto py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-xl shadow-sm"
            variant="outline"
          >
            <Trash2 className="h-5 w-5 text-rose-500" />
            <span className="text-sm font-medium">Delete (#)</span>
          </Button>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs border border-gray-200">?</kbd> to view all keyboard shortcuts</p>
      </div>
    </div>
  );
};

export default AlertDetail;
