
import { useState } from "react";
import { ArrowLeft, Bell, Clock, Trash2, UserPlus, CheckCircle, AlertCircle, Search } from "lucide-react";
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
  const { toast } = useToast();

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        setSelectedAlert(null);
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
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="font-light tracking-[0.25em] text-base uppercase">Incident Inbox</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 pt-24">
        {/* Alert list */}
        <div className={cn(
          "w-1/3 border-r border-white/10 h-[calc(100vh-96px)] overflow-y-auto",
          !selectedAlert && "w-full"
        )}>
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6">
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
        {selectedAlert && (
          <div className="w-2/3 h-[calc(100vh-96px)] overflow-y-auto">
            <AlertDetail
              alert={selectedAlert}
              onAction={(action) => handleAction(selectedAlert.id, action)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
