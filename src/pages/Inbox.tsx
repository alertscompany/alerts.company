
import { useState, useEffect } from "react";
import { Archive, ArrowLeft, Bell, Clock, Search, Inbox as InboxIcon, Star, Trash2, UserPlus, CheckCircle, AlertCircle, X, Filter, ChevronDown, ChevronUp, AlertTriangle, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import AlertItem from "@/components/AlertItem";
import AlertDetail from "@/components/AlertDetail";
import { mockAlerts } from "@/data/mockAlerts";

export type Priority = "high" | "medium" | "low";
export type Status = "active" | "acknowledged" | "resolved";
export type AlertAction = "do" | "defer" | "delegate" | "delete";

export interface Alert {
  id: string;
  title: string;
  service: string;
  timestamp: string;
  priority: Priority;
  status: Status;
  description: string;
}

const Inbox = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Priority | "all">("all");
  const [showHelp, setShowHelp] = useState(false);
  const { toast } = useToast();

  // Select first alert by default
  useEffect(() => {
    if (!selectedAlert && alerts.length > 0) {
      setSelectedAlert(alerts[0]);
    }
  }, [alerts, selectedAlert]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
      
      // Show/hide keyboard shortcuts
      if (e.key === "?") {
        setShowHelp(prev => !prev);
      }
      
      if (selectedAlert) {
        // Navigation shortcuts
        if (e.key === "j" || e.key === "ArrowDown") {
          e.preventDefault();
          const currentIndex = alerts.findIndex(a => a.id === selectedAlert.id);
          if (currentIndex < alerts.length - 1) {
            setSelectedAlert(alerts[currentIndex + 1]);
          }
        }
        
        if (e.key === "k" || e.key === "ArrowUp") {
          e.preventDefault();
          const currentIndex = alerts.findIndex(a => a.id === selectedAlert.id);
          if (currentIndex > 0) {
            setSelectedAlert(alerts[currentIndex - 1]);
          }
        }
        
        // Action shortcuts
        if (e.key === "e") {
          handleAction(selectedAlert.id, "do");
        }
        if (e.key === "s") {
          handleAction(selectedAlert.id, "defer");
        }
        if (e.key === "d") {
          handleAction(selectedAlert.id, "delegate");
        }
        if (e.key === "#") {
          handleAction(selectedAlert.id, "delete");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [alerts, selectedAlert]);

  const filteredAlerts = alerts.filter(
    (alert) => {
      const matchesSearch = 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "all" || alert.priority === activeFilter;
      
      return matchesSearch && matchesFilter;
    }
  );

  const handleAction = (alertId: string, action: AlertAction) => {
    const currentAlert = alerts.find((a) => a.id === alertId);
    if (!currentAlert) return;

    let newAlerts = [...alerts];
    let actionTaken = "";
    let nextStatus: Status = "active";

    switch (action) {
      case "do":
        actionTaken = "marked as being worked on";
        nextStatus = "acknowledged";
        break;
      case "defer":
        actionTaken = "deferred for later";
        break;
      case "delegate":
        actionTaken = "delegated to another team member";
        break;
      case "delete":
        actionTaken = "deleted";
        newAlerts = alerts.filter((a) => a.id !== alertId);
        
        // Select next alert if available
        const currentIndex = alerts.findIndex(a => a.id === alertId);
        if (newAlerts.length > 0) {
          if (currentIndex < newAlerts.length) {
            setSelectedAlert(newAlerts[currentIndex]);
          } else {
            setSelectedAlert(newAlerts[newAlerts.length - 1]);
          }
        } else {
          setSelectedAlert(null);
        }
        break;
    }

    if (action !== "delete") {
      newAlerts = newAlerts.map((a) => 
        a.id === alertId ? { ...a, status: nextStatus } : a
      );
    }

    setAlerts(newAlerts);
    
    toast({
      title: `Alert ${actionTaken}`,
      description: currentAlert.title
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="font-medium tracking-wide">Incident Inbox</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-input"
                placeholder="Search (Ctrl+K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 pt-16">
        {/* Left sidebar */}
        <div className="w-48 border-r border-white/10 p-4 h-[calc(100vh-64px)]">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className="w-full justify-start font-normal" 
              onClick={() => setActiveFilter("all")}
            >
              <InboxIcon className="h-4 w-4 mr-2" />
              <span>All</span>
              <span className="ml-auto">{alerts.length}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start font-normal",
                activeFilter === "high" && "bg-red-500/10 text-red-400"
              )}
              onClick={() => setActiveFilter("high")}
            >
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              <span>High Priority</span>
              <span className="ml-auto">{alerts.filter(a => a.priority === "high").length}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start font-normal",
                activeFilter === "medium" && "bg-amber-500/10 text-amber-400"
              )}
              onClick={() => setActiveFilter("medium")}
            >
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              <span>Medium</span>
              <span className="ml-auto">{alerts.filter(a => a.priority === "medium").length}</span>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start font-normal",
                activeFilter === "low" && "bg-green-500/10 text-green-400"
              )}
              onClick={() => setActiveFilter("low")}
            >
              <Circle className="h-4 w-4 mr-2 text-green-500" />
              <span>Low Priority</span>
              <span className="ml-auto">{alerts.filter(a => a.priority === "low").length}</span>
            </Button>
          </div>
        </div>

        {/* Alert list */}
        <div className="w-1/3 border-r border-white/10 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-2 border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-md flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Filter className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Filter</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground ml-2">
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground p-6">
              <Bell className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No alerts found</p>
              <p className="text-sm">Any new incidents will appear here</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                isSelected={selectedAlert?.id === alert.id}
                onClick={() => setSelectedAlert(alert)}
              />
            ))
          )}
        </div>

        {/* Alert details */}
        {selectedAlert ? (
          <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto">
            <AlertDetail
              alert={selectedAlert}
              onAction={(action) => handleAction(selectedAlert.id, action)}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Bell className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium">No alert selected</p>
              <p className="text-sm">Select an alert from the list to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Keyboard shortcut help */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-secondary p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowHelp(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>⬆ / k</div>
              <div>Previous alert</div>
              <div>⬇ / j</div>
              <div>Next alert</div>
              <div>e</div>
              <div>Do (Acknowledge)</div>
              <div>s</div>
              <div>Defer alert</div>
              <div>d</div>
              <div>Delegate alert</div>
              <div>#</div>
              <div>Delete alert</div>
              <div>Ctrl+K</div>
              <div>Focus search</div>
              <div>?</div>
              <div>Show/hide shortcuts</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
