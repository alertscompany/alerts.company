
import { useState } from "react";
import { Archive, ArrowLeft, Check, Clock, Search, UserPlus, Trash2, MoreVertical, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
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
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(alerts[0] || null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredAlerts = alerts.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: AlertAction) => {
    if (!selectedAlert) return;

    let actionMessage = "";
    let updatedAlerts = [...alerts];
    
    switch (action) {
      case "do":
        actionMessage = "Marked as done";
        updatedAlerts = updatedAlerts.map(alert => 
          alert.id === selectedAlert.id ? { ...alert, status: "acknowledged" as Status } : alert
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
        updatedAlerts = updatedAlerts.filter(alert => alert.id !== selectedAlert.id);
        // Select the next alert if available
        if (updatedAlerts.length > 0) {
          const index = alerts.findIndex(a => a.id === selectedAlert.id);
          const nextIndex = index < updatedAlerts.length ? index : updatedAlerts.length - 1;
          setSelectedAlert(updatedAlerts[nextIndex]);
        } else {
          setSelectedAlert(null);
        }
        break;
    }

    setAlerts(updatedAlerts);
    toast({
      title: actionMessage,
      description: selectedAlert.title
    });
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Inbox</h1>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border border-gray-200"
          />
        </div>
      </header>

      <div className="flex h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white py-6 px-4 hidden md:block">
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Apps</h2>
            <Button 
              variant="ghost" 
              className="flex items-center justify-start text-[#1A1A1A] font-medium w-full py-2 px-3 mb-1 rounded-lg hover:bg-gray-100"
            >
              <span>Inbox</span>
              <span className="ml-auto bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">
                {filteredAlerts.length}
              </span>
            </Button>
          </div>
        </aside>

        <div className="flex flex-1">
          {/* Message List */}
          <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 border-r border-gray-200 overflow-auto">
            <div className="border-b border-gray-200 py-4 px-6">
              <h2 className="text-lg font-medium text-gray-800">Messages</h2>
            </div>
            
            {filteredAlerts.map(alert => (
              <div 
                key={alert.id}
                className={cn(
                  "border-b border-gray-100 py-6 px-6 cursor-pointer hover:bg-gray-50 transition-colors",
                  selectedAlert?.id === alert.id ? "bg-gray-50" : "bg-white"
                )}
                onClick={() => setSelectedAlert(alert)}
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-xs bg-transparent hover:bg-gray-100 px-3 py-1 h-auto rounded-md"
                  >
                    Discuss
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          {selectedAlert ? (
            <div className="hidden md:block flex-1 bg-white overflow-auto p-8">
              <div className="max-w-3xl">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium">
                    {selectedAlert.service.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{selectedAlert.service}</div>
                    <div className="text-sm text-gray-500">Status: <span className="capitalize">{selectedAlert.status}</span></div>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                <h1 className="text-2xl font-semibold mb-4">{selectedAlert.title}</h1>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
                    onClick={() => handleAction("do")}
                  >
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>Do</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
                    onClick={() => handleAction("defer")}
                  >
                    <Clock className="h-5 w-5 mr-2 text-amber-500" />
                    <span>Defer</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
                    onClick={() => handleAction("delegate")}
                  >
                    <UserPlus className="h-5 w-5 mr-2 text-blue-500" />
                    <span>Delegate</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 rounded-lg shadow-sm"
                    onClick={() => handleAction("delete")}
                  >
                    <Trash2 className="h-5 w-5 mr-2 text-rose-500" />
                    <span>Delete</span>
                  </Button>
                </div>

                <div className="flex items-center mb-4">
                  <Tag className="h-4 w-4 mr-2 text-gray-400" />
                  <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:bg-gray-50 px-2 py-1 h-auto">
                    Labels
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-gray-700 mb-6">
                  {selectedAlert.description}
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">No message selected</p>
                <p className="text-sm">Select a message from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
