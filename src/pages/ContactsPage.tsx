import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Phone, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const PAGE_SIZE = 5;

export default function ContactsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", company: "", job_title: "" });

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addContact = useMutation({
    mutationFn: async () => {
      if (!form.first_name.trim()) throw new Error("First name is required");
      const { error } = await supabase.from("contacts").insert({
        user_id: user!.id,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        job_title: form.job_title.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setForm({ first_name: "", last_name: "", email: "", phone: "", company: "", job_title: "" });
      setOpen(false);
      toast.success("Contact added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = contacts.filter((c) =>
    `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Phone className="h-3.5 w-3.5" /> Call</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Contact</DialogTitle></DialogHeader>
              <form onSubmit={(e) => { e.preventDefault(); addContact.mutate(); }} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>First name *</Label><Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Last name</Label><Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></div>
                </div>
                <div className="space-y-1"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div className="space-y-1"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
                  <div className="space-y-1"><Label>Job title</Label><Input value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} /></div>
                </div>
                <Button type="submit" className="w-full" disabled={addContact.isPending}>
                  {addContact.isPending ? "Adding..." : "Add Contact"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><SlidersHorizontal className="h-3.5 w-3.5" /> Columns</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading contacts...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First name</TableHead>
                  <TableHead>Last name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Company</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No contacts yet. Add your first contact!</TableCell></TableRow>
                ) : paged.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.first_name}</TableCell>
                    <TableCell>{c.last_name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-muted-foreground">{c.company}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setPage(i + 1)}>{i + 1}</Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
