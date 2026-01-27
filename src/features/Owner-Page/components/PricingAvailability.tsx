import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PricingAvailability() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Pricing & Availability</h3>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Weekday Price" />
        <Input placeholder="Weekend Price" />
        <Input placeholder="Minimum Stay" />
        <div className="h-40 rounded-lg bg-muted" />
      </CardContent>
    </Card>
  );
}