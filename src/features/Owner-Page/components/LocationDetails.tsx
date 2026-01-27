import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LocationDetails() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Location Details</h3>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label>Street Address</Label>
          <Input />
        </div>
        <div className="space-y-1"><Label>City</Label><Input /></div>
        <div className="space-y-1"><Label>Region</Label><Input /></div>
        <div className="sm:col-span-2 h-40 rounded-lg bg-muted" />
      </CardContent>
    </Card>
  );
}
