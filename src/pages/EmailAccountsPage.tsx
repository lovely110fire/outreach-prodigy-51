import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Flame, Send, BarChart3, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const defaultForm = {
  display_name: "",
  email_address: "",
  imap_server: "",
  imap_port: "993",
  smtp_server: "",
  smtp_port: "587",
  app_password: "",
};

export default function EmailAccountsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["email_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("email_settings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addAccount = useMutation({
    mutationFn: async () => {
      if (!form.email_address.trim() || !form.imap_server.trim() || !form.smtp_server.trim() || !form.app_password.trim()) {
        throw new Error("Please fill in all required fields");
      }
      const { error } = await supabase.from("email_settings").insert({
        user_id: user!.id,
        display_name: form.display_name.trim() || null,
        email_address: form.email_address.trim(),
        imap_server: form.imap_server.trim(),
        imap_port: parseInt(form.imap_port) || 993,
        smtp_server: form.smtp_server.trim(),
        smtp_port: parseInt(form.smtp_port) || 587,
        app_password: form.app_password,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email_settings"] });
      setForm(defaultForm);
      setOpen(false);
      toast.success("Email account added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleWarming = useMutation({
    mutationFn: async ({ id, is_warming }: { id: string; is_warming: boolean }) => {
      const { error } = await supabase.from("email_settings").update({
        is_warming,
        warming_status: is_warming ? "Warming" : "Not Warming",
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["email_settings"] }),
  });

  const deleteAccount = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("email_settings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email_settings"] });
      toast.success("Account removed");
    },
  });

  const warmingCount = accounts.filter((a) => a.is_warming).length;

  const metrics = [
    { label: "Total Accounts", value: accounts.length, icon: Mail },
    { label: "Active Warming", value: warmingCount, icon: Flame },
    { label: "Today's Warmup", value: `0/${accounts.length * 30}`, icon: BarChart3 },
    { label: "Campaign Emails", value: `0/${accounts.length * 50}`, icon: Send },
  ];

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Email Accounts</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Email Account</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Add Email Account</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); addAccount.mutate(); }} className="space-y-4">
              <div className="space-y-2"><Label>Display Name</Label><Input value={form.display_name} onChange={(e) => set("display_name", e.target.value)} placeholder="My Work Email" /></div>
              <div className="space-y-2"><Label>Email Address *</Label><Input type="email" value={form.email_address} onChange={(e) => set("email_address", e.target.value)} placeholder="you@company.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>IMAP Server *</Label><Input value={form.imap_server} onChange={(e) => set("imap_server", e.target.value)} placeholder="imap.gmail.com" /></div>
                <div className="space-y-2"><Label>IMAP Port</Label><Input type="number" value={form.imap_port} onChange={(e) => set("imap_port", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>SMTP Server *</Label><Input value={form.smtp_server} onChange={(e) => set("smtp_server", e.target.value)} placeholder="smtp.gmail.com" /></div>
                <div className="space-y-2"><Label>SMTP Port</Label><Input type="number" value={form.smtp_port} onChange={(e) => set("smtp_port", e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>App Password *</Label><Input type="password" value={form.app_password} onChange={(e) => set("app_password", e.target.value)} placeholder="••••••••" /></div>
              <p className="text-xs text-muted-foreground">Your app password is stored securely and never exposed in the UI.</p>
              <Button type="submit" className="w-full" disabled={addAccount.isPending}>
                {addAccount.isPending ? "Adding..." : "Add Account"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><m.icon className="h-4 w-4 text-muted-foreground" /></div>
              <div><p className="text-xs text-muted-foreground">{m.label}</p><p className="text-lg font-bold">{m.value}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Loading...</CardContent></Card>
      ) : accounts.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">No email accounts connected. Add your first account above.</CardContent></Card>
      ) : accounts.map((a) => (
        <Card key={a.id}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Mail className="h-4 w-4 text-primary" /></div>
                <div>
                  <p className="font-medium text-sm">{a.email_address}</p>
                  <p className="text-xs text-muted-foreground">{a.warming_status ?? "Not Warming"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={a.is_warming ?? false} onCheckedChange={(checked) => toggleWarming.mutate({ id: a.id, is_warming: checked })} />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteAccount.mutate(a.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-3 pl-12">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Warmup Activity</span><span>0/30</span></div>
                <Progress value={0} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Campaign Emails</span><span>0/50</span></div>
                <Progress value={0} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
