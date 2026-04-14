import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Send, Eye, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function CampaignsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createCampaign = useMutation({
    mutationFn: async () => {
      if (!name.trim()) throw new Error("Campaign name is required");
      const { error } = await supabase.from("campaigns").insert({
        user_id: user!.id,
        name: name.trim(),
        status: "draft",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      setName("");
      setOpen(false);
      toast.success("Campaign created");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase.from("campaigns").update({ active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["campaigns"] }),
  });

  const filtered = campaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const totalSent = campaigns.reduce((s, c) => s + (c.sent ?? 0), 0);
  const activeCount = campaigns.filter((c) => c.status === "active").length;
  const completedCount = campaigns.filter((c) => c.status === "completed").length;

  const topMetrics = [
    { label: "Total", value: campaigns.length },
    { label: "Active", value: activeCount },
    { label: "Completed", value: completedCount },
    { label: "Total Sent", value: totalSent },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> New campaign</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Campaign</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); createCampaign.mutate(); }} className="space-y-4">
              <div className="space-y-2"><Label>Campaign Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Q1 Outreach" /></div>
              <Button type="submit" className="w-full" disabled={createCampaign.isPending}>
                {createCampaign.isPending ? "Creating..." : "Create Campaign"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {topMetrics.map((m) => (
          <Card key={m.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{m.label}</p><p className="text-2xl font-bold mt-1">{m.value}</p></CardContent></Card>
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
        {isLoading ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">Loading campaigns...</CardContent></Card>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No campaigns yet. Create your first!</CardContent></Card>
        ) : filtered.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{c.name}</h3>
                  <Badge variant={c.status === "completed" ? "default" : "secondary"} className="text-[10px]">{c.status}</Badge>
                </div>
                <Switch checked={c.active ?? false} onCheckedChange={(checked) => toggleActive.mutate({ id: c.id, active: checked })} />
              </div>
              <Progress value={c.progress ?? 0} className="h-1.5 mb-3" />
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Send className="h-3 w-3" /> {c.sent ?? 0} Sent</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {c.opens ?? 0} Opens</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {c.replies ?? 0} Replies</span>
                <span className="ml-auto text-[11px]">{c.progress ?? 0}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
