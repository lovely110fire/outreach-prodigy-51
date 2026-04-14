import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const metrics = [
  { label: "Total Lists", value: 2 },
  { label: "Contacts", value: 357 },
  { label: "Verified", value: 98 },
  { label: "Valid", value: 58 },
];

const lists = [
  { name: "c", contacts: 350, status: "unvalidated", valid: 0, invalid: 0, unknown: 350, progress: 0 },
  { name: "test", contacts: 7, status: "out of credit", valid: 5, invalid: 1, unknown: 1, progress: 71 },
];

export default function ListsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lists</h1>

      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-2xl font-bold mt-1">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid</TableHead>
                <TableHead>Invalid</TableHead>
                <TableHead>Unknown</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((l) => (
                <TableRow key={l.name}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.contacts}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px]">{l.status}</Badge>
                  </TableCell>
                  <TableCell className="text-success">{l.valid}</TableCell>
                  <TableCell className="text-destructive">{l.invalid}</TableCell>
                  <TableCell>{l.unknown}</TableCell>
                  <TableCell className="w-32">
                    <Progress value={l.progress} className="h-1.5" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
