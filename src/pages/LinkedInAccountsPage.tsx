import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Plus, Users, Zap, MessageSquare, ShoppingCart } from "lucide-react";

const metrics = [
  { label: "Total Accounts", value: 0, icon: Linkedin },
  { label: "Active", value: 0, icon: Zap },
  { label: "Connections Today", value: 0, icon: Users },
  { label: "Messages Today", value: 0, icon: MessageSquare },
];

export default function LinkedInAccountsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">LinkedIn Accounts</h1>

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
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Linkedin className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium mb-1">No LinkedIn accounts connected</p>
          <p className="text-xs text-muted-foreground mb-4">Connect your account to start automating</p>
          <Button className="gap-2"><Plus className="h-4 w-4" /> Connect Your First Account</Button>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Need pre-warmed LinkedIn accounts?</p>
              <p className="text-xs text-muted-foreground">Buy ready-to-use accounts for outreach</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Browse Accounts</Button>
        </CardContent>
      </Card>
    </div>
  );
}
