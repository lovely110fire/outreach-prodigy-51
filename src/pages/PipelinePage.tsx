import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";

const initialStages = [
  { id: 1, name: "Interested", deals: [] },
  { id: 2, name: "Demo scheduled", deals: [] },
  { id: 3, name: "Won", deals: [] },
  { id: 4, name: "Lost", deals: [] },
];

export default function PipelinePage() {
  const [stages, setStages] = useState(initialStages);

  const addStage = () => {
    const name = prompt("Stage name:");
    if (name) setStages([...stages, { id: Date.now(), name, deals: [] }]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Pipeline</h1>
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            Default Pipeline <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
        <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Deal</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((s) => (
          <div key={s.id} className="min-w-[260px] w-[260px] shrink-0">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {s.name}
                  <span className="text-xs text-muted-foreground font-normal">({s.deals.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <p className="text-xs text-muted-foreground">No deals yet</p>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="min-w-[260px] w-[260px] shrink-0">
          <button
            onClick={addStage}
            className="w-full h-full min-h-[380px] border border-dashed border-border rounded-lg flex items-center justify-center text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Stage
          </button>
        </div>
      </div>
    </div>
  );
}
