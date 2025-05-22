import { useState } from "react";
import { Search, Check, Clock, UserPlus, Trash2, Cat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mockAlerts } from "@/data/mockAlerts";
import AlertItem from "@/components/AlertItem";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import HeroCard from "@/components/HeroCard";

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

type FilterType = "active" | "acknowledged" | "resolved" | "delegated" | "deferred" | "deleted" | "done";

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

      {/* Filters with icons */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value as FilterType)}>
          <ToggleGroupItem value="active" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <Cat className="h-4 w-4" />
            Decide
          </ToggleGroupItem>
          <ToggleGroupItem value="acknowledged" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <Check className="h-4 w-4" />
            Doing
          </ToggleGroupItem>
          <ToggleGroupItem value="deferred" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <Clock className="h-4 w-4" />
            Deferred
          </ToggleGroupItem>
          <ToggleGroupItem value="delegated" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <UserPlus className="h-4 w-4" />
            Delegated
          </ToggleGroupItem>
          <ToggleGroupItem value="done" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <Check className="h-4 w-4" />
            Done
          </ToggleGroupItem>
          <ToggleGroupItem value="deleted" className="rounded-lg text-sm px-5 flex gap-2 items-center">
            <Trash2 className="h-4 w-4" />
            Deleted
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Message Stream - Slack Block Kit Style */}
      <div className="container mx-auto max-w-4xl py-4">
        {/* Hero Card */}
        <HeroCard activeFilter={activeFilter} />
        
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
