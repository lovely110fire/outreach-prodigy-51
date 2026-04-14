import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Send, Eye, MousePointerClick, MessageSquare, Users, Target,
  ChevronDown, Mail, Clock, Play, Pause, CalendarClock
} from "lucide-react";

const metrics = [
  { label: "Total Sent", value: "7", icon: Send, color: "text-primary" },
  { label: "Opens", value: "5", pct: "71.4%", icon: Eye, color: "text-success" },
  { label: "Clicks", value: "0", pct: "0%", icon: MousePointerClick, color: "text-warning" },
  { label: "Replies", value: "0", pct: "0%", icon: MessageSquare, color: "text-muted-foreground" },
  { label: "Contacted", value: "7", icon: Users, color: "text-info" },
  { label: "Total Prospects", value: "357", icon: Target, color: "text-foreground" },
];

const activities = [
  { text: "New Campaign copy scheduled", time: "2 hours ago", icon: CalendarClock, color: "text-primary" },
  { text: "New Campaign paused", time: "5 hours ago", icon: Pause, color: "text-warning" },
  { text: "New Campaign copy running fine", time: "1 day ago", icon: Play, color: "text-success" },
  { text: "New Campaign started", time: "2 days ago", icon: Play, color: "text-success" },
  { text: "New Campaign copy created", time: "3 days ago", icon: Clock, color: "text-muted-foreground" },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Home</h1>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> New campaign
        </Button>
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Campaign Performance</CardTitle>
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              All Campaigns (2) <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-secondary/50 rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <m.icon className={`h-3.5 w-3.5 ${m.color}`} />
                  <span className="text-[11px] text-muted-foreground">{m.label}</span>
                </div>
                <p className="text-xl font-bold">{m.value}</p>
                {m.pct && <p className={`text-xs ${m.color}`}>{m.pct}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Activity Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <a.icon className={`h-3.5 w-3.5 ${a.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No conversations yet</p>
              <p className="text-xs text-muted-foreground mt-1">Replies will show up here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
