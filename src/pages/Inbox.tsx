
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mockAlerts } from "@/data/mockAlerts";
import AlertItem from "@/components/AlertItem";
import AlertDetail from "@/components/AlertDetail";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

type FilterType = "all" | "active" | "acknowledged" | "resolved";

const Inbox = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(alerts[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { toast } = useToast();
  
  const filteredAlerts = alerts.filter(alert => {
    // First apply text search
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Then apply status filter
    const matchesFilter = 
      activeFilter === "all" || 
      alert.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAction = (alertId: string, action: "do" | "defer" | "delegate" | "delete") => {
    if (!selectedAlert) return;

    let actionMessage = "";
    let updatedAlerts = [...alerts];
    
    switch (action) {
      case "do":
        actionMessage = "Marked as done";
        updatedAlerts = updatedAlerts.map(alert => 
          alert.id === alertId ? { ...alert, status: "acknowledged" as Status } : alert
        );
        break;
      case "defer":
        actionMessage = "Deferred for later";
        break;
      case "delegate":
        actionMessage = "Delegated to team";
        break;
      case "delete":
        actionMessage = "Deleted";
        updatedAlerts = updatedAlerts.filter(alert => alert.id !== alertId);
        // Select the next alert if available
        if (updatedAlerts.length > 0) {
          const index = alerts.findIndex(a => a.id === alertId);
          const nextIndex = index < updatedAlerts.length ? index : updatedAlerts.length - 1;
          setSelectedAlert(updatedAlerts[nextIndex]);
        } else {
          setSelectedAlert(null);
        }
        break;
    }

    setAlerts(updatedAlerts);
    
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
    setSelectedAlert(alert);
  };

  const handleDetailAction = (action: "do" | "defer" | "delegate" | "delete") => {
    if (selectedAlert) {
      handleAction(selectedAlert.id, action);
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

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <ToggleGroup type="single" value={activeFilter} onValueChange={(value) => value && setActiveFilter(value as FilterType)}>
          <ToggleGroupItem value="all" className="rounded-lg text-sm px-5">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="active" className="rounded-lg text-sm px-5">
            Active
          </ToggleGroupItem>
          <ToggleGroupItem value="acknowledged" className="rounded-lg text-sm px-5">
            In Progress
          </ToggleGroupItem>
          <ToggleGroupItem value="resolved" className="rounded-lg text-sm px-5">
            Resolved
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex">
        {/* Main content */}
        <div className="flex-1">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map(alert => (
              <AlertItem 
                key={alert.id} 
                alert={alert} 
                isSelected={selectedAlert?.id === alert.id}
                onClick={() => handleAlertClick(alert)}
                formatTimeAgo={formatTimeAgo}
                onAction={handleAction}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>No messages match your criteria</p>
            </div>
          )}
        </div>

        {/* Detail panel - only shown on larger screens */}
        {selectedAlert && (
          <div className="w-1/2 border-l border-gray-200 bg-white hidden lg:block h-[calc(100vh-140px)] overflow-auto">
            <AlertDetail 
              alert={selectedAlert}
              onAction={handleDetailAction}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
