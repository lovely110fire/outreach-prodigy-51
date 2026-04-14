import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function ListsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");

  // For now, lists are derived from contacts grouped by company or we create a simple "lists" concept
  // Since there's no lists table, we show contacts summary and allow adding contacts in bulk
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addBulkContacts = useMutation({
    mutationFn: async () => {
      if (!listName.trim()) throw new Error("List name is required");
      // Create a contact as a placeholder for the list concept
      const { error } = await supabase.from("contacts").insert({
        user_id: user!.id,
        first_name: listName.trim(),
        last_name: "(List)",
        status: "list",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setListName("");
      setOpen(false);
      toast.success("List created");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const totalContacts = contacts.length;
  const verified = contacts.filter((c) => c.email).length;

  const metrics = [
    { label: "Total Contacts", value: totalContacts },
    { label: "With Email", value: verified },
    { label: "With Phone", value: contacts.filter((c) => c.phone).length },
    { label: "Companies", value: new Set(contacts.filter((c) => c.company).map((c) => c.company)).size },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lists</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Create List</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New List</DialogTitle></DialogHeader>
            <form onSubmit={(e) => { e.preventDefault(); addBulkContacts.mutate(); }} className="space-y-4">
              <div className="space-y-2"><Label>List Name *</Label><Input value={listName} onChange={(e) => setListName(e.target.value)} placeholder="e.g. Q1 Leads" /></div>
              <Button type="submit" className="w-full" disabled={addBulkContacts.isPending}>
                {addBulkContacts.isPending ? "Creating..." : "Create List"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{m.label}</p><p className="text-2xl font-bold mt-1">{m.value}</p></CardContent></Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No contacts yet</TableCell></TableRow>
                ) : contacts.slice(0, 10).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.first_name} {c.last_name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{c.company ?? "—"}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{c.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
