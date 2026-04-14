import { Card, CardContent } from "@/components/ui/card";
import { AppWindow } from "lucide-react";

export default function AppsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Apps</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
            <AppWindow className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No apps connected</p>
          <p className="text-xs text-muted-foreground mt-1">Integrations will appear here</p>
        </CardContent>
      </Card>
    </div>
  );
}
