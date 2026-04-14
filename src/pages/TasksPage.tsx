import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";

const tabs = ["All Tasks", "Open", "Completed", "Overdue"];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("All Tasks");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tasks</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-full py-16">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
              <CheckSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No tasks found</p>
            <p className="text-xs text-muted-foreground mt-1">Tasks will appear here when created</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-full py-16">
            <p className="text-sm text-muted-foreground">Select a task to view details</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
