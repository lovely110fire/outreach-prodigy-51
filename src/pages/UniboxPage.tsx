import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Filter } from "lucide-react";

const filters = ["Campaigns", "Mailboxes", "Threads", "Time"];

export default function UniboxPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Unibox</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 min-h-[500px]">
        {/* Left filters */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filters.map((f) => (
              <Button key={f} variant="ghost" className="w-full justify-start text-sm" size="sm">
                {f}
              </Button>
            ))}
            <div className="pt-4 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">No conversations</p>
            </div>
          </CardContent>
        </Card>

        {/* Right content */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-full py-16">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No conversations</p>
            <p className="text-xs text-muted-foreground mt-1">Conversations will appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
