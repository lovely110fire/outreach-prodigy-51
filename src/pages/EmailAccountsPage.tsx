import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Mail, Flame, Send, BarChart3 } from "lucide-react";

const metrics = [
  { label: "Total Accounts", value: 1, icon: Mail },
  { label: "Active Warming", value: 0, icon: Flame },
  { label: "Today's Warmup", value: "0/30", icon: BarChart3 },
  { label: "Campaign Emails", value: "7/50", icon: Send },
];

export default function EmailAccountsPage() {
  const [warming, setWarming] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Email Accounts</h1>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <m.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-lg font-bold">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">ceo@tegency.site</p>
                <p className="text-xs text-muted-foreground">{warming ? "Warming" : "Not Warming"}</p>
              </div>
            </div>
            <Switch checked={warming} onCheckedChange={setWarming} />
          </div>

          <div className="space-y-3 pl-12">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Warmup Activity</span>
                <span>0/30</span>
              </div>
              <Progress value={0} className="h-1.5" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Campaign Emails</span>
                <span>7/50</span>
              </div>
              <Progress value={14} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
