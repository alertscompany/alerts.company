
import { CheckCircle, Clock, Trash2, UserPlus, MoreVertical, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertAction, Priority } from "@/pages/Inbox";
import { cn } from "@/lib/utils";

interface AlertDetailProps {
  alert: Alert;
  onAction: (action: AlertAction) => void;
}

const AlertDetail = ({ alert, onAction }: AlertDetailProps) => {
  const formatTimestamp = (timestamp: string) => {
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
    <div className="p-8 max-w-3xl mx-auto">
      {/* Alert header */}
      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
          {alert.service.slice(0, 2).toUpperCase()}
        </div>
        <div className="ml-3">
          <div className="font-medium">{alert.service}</div>
          <div className="text-sm text-gray-500">Status: <span className="capitalize">{alert.status}</span></div>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Alert title */}
      <h1 className="text-2xl font-semibold mb-4">{alert.title}</h1>
      
      <div className="text-sm text-gray-500 mb-6">
        {formatTimestamp(alert.timestamp)}
      </div>

      {/* Alert actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          onClick={() => onAction("do")} 
          className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
          variant="outline"
        >
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          <span>Do</span>
        </Button>
        <Button 
          onClick={() => onAction("defer")} 
          className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
          variant="outline"
        >
          <Clock className="h-5 w-5 mr-2 text-amber-500" />
          <span>Defer</span>
        </Button>
        <Button 
          onClick={() => onAction("delegate")} 
          className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
          variant="outline"
        >
          <UserPlus className="h-5 w-5 mr-2 text-blue-500" />
          <span>Delegate</span>
        </Button>
        <Button 
          onClick={() => onAction("delete")} 
          className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
          variant="outline"
        >
          <Trash2 className="h-5 w-5 mr-2 text-rose-500" />
          <span>Delete</span>
        </Button>
      </div>

      {/* Labels */}
      <div className="flex items-center mb-4">
        <Tag className="h-4 w-4 mr-2 text-gray-400" />
        <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:bg-gray-50 px-2 py-1 h-auto">
          Labels
        </Button>
      </div>

      {/* Alert description */}
      <div className="bg-gray-50 rounded-xl p-6 text-gray-700">
        {alert.description}
      </div>
    </div>
  );
};

export default AlertDetail;
