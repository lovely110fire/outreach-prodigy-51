import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot, Globe, CheckCircle, Workflow, Search, Linkedin, Zap,
  UserCheck, PenLine, Copy, Users, Sparkles
} from "lucide-react";

const topMetrics = [
  { label: "Templates", value: "8+", icon: Sparkles },
  { label: "Integrations Ready", value: "190", icon: Zap },
  { label: "Workspace Agents", value: "0", icon: Bot },
];

const features = [
  { title: "Scrape internet for leads", icon: Globe },
  { title: "Validate & enrich contacts", icon: CheckCircle },
  { title: "Source leads from LinkedIn", icon: Linkedin },
  { title: "Run monitored workflows", icon: Workflow },
  { title: "Prioritize accounts", icon: UserCheck },
  { title: "Auto-generate personalized outreach", icon: PenLine },
  { title: "Detect duplicates", icon: Copy },
  { title: "Find decision-makers", icon: Search },
  { title: "Enrich missing attributes", icon: Users },
];

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dit Agents</h1>
        <Button variant="outline" size="icon"><Bot className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {topMetrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-xl font-bold">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">What you'll be able to do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((f) => (
            <Card key={f.title} className="hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <f.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">{f.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Ready to start building agents?</h3>
            <p className="text-sm text-muted-foreground mt-1">Get early access to AI-powered sales automation</p>
          </div>
          <Button>Request Access</Button>
        </CardContent>
      </Card>
    </div>
  );
}
