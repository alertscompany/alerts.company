
import { useState } from "react";
import { Search, Check, Clock, UserPlus, Trash2, Cat, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mockAlerts } from "@/data/mockAlerts";
import AlertItem from "@/components/AlertItem";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";

export type Priority = "high" | "medium" | "low";
export type Status = "active" | "acknowledged" | "resolved";

export interface Alert {
  id: string;
  title: string;
  service: string;
  timestamp: string;
  priority: Priority;
  status: Status;
  description: string;
}

type FilterType = "active" | "acknowledged" | "deferred" | "delegated" | "done" | "deleted";

// Create stub data for each category
const createStubData = () => {
  const baseAlerts = [...mockAlerts];
  
  // Create alerts for each category
  const acknowledgedAlerts = baseAlerts.slice(0, 2).map(alert => ({
    ...alert,
    id: `acknowledged-${alert.id}`,
    status: "acknowledged" as Status,
    title: `In Progress: ${alert.title}`,
  }));
  
  const deferredAlerts = baseAlerts.slice(2, 4).map(alert => ({
    ...alert,
    id: `deferred-${alert.id}`,
    status: "active" as Status,
    title: `Deferred: ${alert.title}`,
  }));
  
  const delegatedAlerts = baseAlerts.slice(1, 3).map(alert => ({
    ...alert,
    id: `delegated-${alert.id}`,
    status: "active" as Status,
    title: `Delegated: ${alert.title}`,
  }));
  
  const doneAlerts = baseAlerts.slice(3, 5).map(alert => ({
    ...alert,
    id: `done-${alert.id}`,
    status: "resolved" as Status,
    title: `Completed: ${alert.title}`,
  }));
  
  const deletedAlerts = baseAlerts.slice(4, 6).map(alert => ({
    ...alert,
    id: `deleted-${alert.id}`,
    status: "resolved" as Status,
    title: `Deleted: ${alert.title}`,
  }));
  
  return {
    active: baseAlerts.filter(alert => alert.status === "active"),
    acknowledged: acknowledgedAlerts,
    deferred: deferredAlerts,
    delegated: delegatedAlerts,
    done: doneAlerts,
    deleted: deletedAlerts,
  };
};

const allAlertCategories = createStubData();

// Images for each category
const categoryImages = {
  active: "/lovable-uploads/474476b2-7d7e-4afe-9a13-e540684078d0.png", // Decide
  acknowledged: "/lovable-uploads/84b9adfc-fcad-4ea8-947c-6a6a06b01d4c.png", // Do
  deferred: "/lovable-uploads/aa9ec1e0-5e87-442b-8d04-79e636bdc487.png", // Defer
  delegated: "/lovable-uploads/37001c3d-d538-47a1-a549-184c13e9af81.png", // Delegate
  done: "/lovable-uploads/6481b03c-7c82-4797-baf4-45da2dbd4f84.png", // Done
  deleted: "/lovable-uploads/ff8eefcd-5288-4b6e-a7d7-134598c98dcf.png", // Delete
};

const Inbox = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("active");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Use the appropriate alert category based on the active filter
  const alerts = allAlertCategories[activeFilter as keyof typeof allAlertCategories] || [];
  
  const filteredAlerts = alerts.filter(alert => {
    // Apply text search
    return alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAction = (alertId: string, action: "do" | "defer" | "delegate" | "delete" | "discuss") => {
    let actionMessage = "";
    
    switch (action) {
      case "do":
        actionMessage = "Decided to do";
        break;
      case "defer":
        actionMessage = "Deferred for later";
        break;
      case "delegate":
        actionMessage = "Delegated to team";
        break;
      case "delete":
        actionMessage = "Deleted";
        break;
      case "discuss":
        actionMessage = "Opening discussion";
        break;
    }
    
    const targetAlert = alerts.find(alert => alert.id === alertId);
    if (targetAlert) {
      toast({
        title: actionMessage,
        description: targetAlert.title
      });
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return `${Math.floor(diffDays / 30)} months ago`;
    }
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert.id === selectedAlert?.id ? null : alert);
  };

  const getCategoryName = (filterType: FilterType) => {
    switch (filterType) {
      case "active": return "Decide";
      case "acknowledged": return "Do";
      case "deferred": return "Defer";
      case "delegated": return "Delegate";
      case "done": return "Done";
      case "deleted": return "Delete";
      default: return filterType;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Inbox</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border border-gray-200"
            />
          </div>
        </div>
      </header>

      {/* Category Tabs with Images */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value as FilterType)}>
          {(Object.keys(categoryImages) as FilterType[]).map((filterType) => (
            <ToggleGroupItem 
              key={filterType} 
              value={filterType} 
              className="rounded-lg text-sm px-5 flex flex-col gap-1 items-center py-2"
              aria-label={getCategoryName(filterType)}
            >
              <div className="w-12 h-12 relative mb-1">
                <img 
                  src={categoryImages[filterType]} 
                  alt={getCategoryName(filterType)}
                  className="w-full h-full object-contain"
                />
              </div>
              <span>{getCategoryName(filterType)}</span>
              <Badge variant="outline" className="text-xs bg-gray-100">
                {allAlertCategories[filterType].length}
              </Badge>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Message Stream - Slack Block Kit Style */}
      <div className="container mx-auto max-w-4xl py-4">
        {filteredAlerts.length > 0 ? (
          <div className="space-y-4">
            {filteredAlerts.map(alert => (
              <AlertItem 
                key={alert.id} 
                alert={alert} 
                isSelected={selectedAlert?.id === alert.id}
                onClick={() => handleAlertClick(alert)}
                formatTimeAgo={formatTimeAgo}
                onAction={handleAction}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-gray-400">
            <p>No messages match your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
