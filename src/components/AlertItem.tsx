
import { cn } from "@/lib/utils";
import { Alert } from "@/pages/Inbox";

interface AlertItemProps {
  alert: Alert;
  isSelected: boolean;
  onClick: () => void;
  formatTimeAgo: (timestamp: string) => string;
}

const AlertItem = ({ alert, isSelected, onClick, formatTimeAgo }: AlertItemProps) => {
  return (
    <div 
      className={cn(
        "border-b border-gray-100 py-6 px-6 cursor-pointer hover:bg-gray-50 transition-colors",
        isSelected ? "bg-gray-50" : "bg-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-gray-500">{alert.service}</div>
        <div className="text-xs text-gray-400">{formatTimeAgo(alert.timestamp)}</div>
      </div>
      <h3 className="font-medium text-base mb-1.5">{alert.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {alert.description}
      </p>
      <div className="flex mt-3">
        <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 mr-2">
          MTTR
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
          MTTA
        </span>
        <button 
          className="ml-auto text-xs bg-transparent hover:bg-gray-100 px-3 py-1 rounded-md"
        >
          Discuss
        </button>
      </div>
    </div>
  );
};

export default AlertItem;
