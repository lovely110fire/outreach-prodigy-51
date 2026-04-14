import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Phone, Search, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const allContacts = [
  { first: "Lovely", last: "Fire", email: "lovely110fire@gmail.com" },
  { first: "Talha", last: "Anwar", email: "talhaanwar@gmail.com" },
  { first: "Sarah", last: "Johnson", email: "sarah.j@company.com" },
  { first: "Michael", last: "Chen", email: "m.chen@enterprise.io" },
  { first: "Emily", last: "Davis", email: "emily.d@startup.co" },
  { first: "James", last: "Wilson", email: "jwilson@corp.net" },
  { first: "Anna", last: "Martinez", email: "anna.m@business.com" },
  { first: "David", last: "Brown", email: "d.brown@agency.io" },
  { first: "Lisa", last: "Taylor", email: "lisa.t@venture.co" },
  { first: "Robert", last: "Lee", email: "r.lee@solutions.com" },
  { first: "Maria", last: "Garcia", email: "m.garcia@tech.io" },
  { first: "John", last: "Smith", email: "j.smith@firm.net" },
];

const PAGE_SIZE = 5;

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allContacts.filter((c) =>
    `${c.first} ${c.last} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Phone className="h-3.5 w-3.5" /> Call</Button>
          <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add contact</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contacts..." className="pl-9" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <Button variant="outline" size="sm" className="gap-2"><SlidersHorizontal className="h-3.5 w-3.5" /> Columns</Button>
        <Button variant="outline" size="sm">Advanced Search</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c.first}</TableCell>
                  <TableCell>{c.last}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setPage(i + 1)}>
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
