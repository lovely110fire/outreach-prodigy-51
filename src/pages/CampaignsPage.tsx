import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Filter, Send, Eye, MessageSquare } from "lucide-react";

const topMetrics = [
  { label: "Total", value: 2 },
  { label: "Active", value: 0 },
  { label: "Completed", value: 1 },
  { label: "Total Sent", value: 7 },
];

const initialCampaigns = [
  {
    id: 1, name: "New Campaign copy", status: "completed", progress: 100,
    sent: 5, opens: 3, replies: 0, active: true,
  },
  {
    id: 2, name: "New Campaign", status: "paused", progress: 1,
    sent: 2, opens: 2, replies: 0, active: false,
  },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [search, setSearch] = useState("");

  const toggle = (id: number) =>
    setCampaigns((c) => c.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));

  const filtered = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> New campaign</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {topMetrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-bold mt-1">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search campaigns..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="h-3.5 w-3.5" /> Filter</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{c.name}</h3>
                  <Badge variant={c.status === "completed" ? "default" : "secondary"} className="text-[10px]">
                    {c.status}
                  </Badge>
                </div>
                <Switch checked={c.active} onCheckedChange={() => toggle(c.id)} />
              </div>
              <Progress value={c.progress} className="h-1.5 mb-3" />
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Send className="h-3 w-3" /> {c.sent} Sent</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {c.opens} Opens</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {c.replies} Replies</span>
                <span className="ml-auto text-[11px]">{c.progress}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
