import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function OwnerInformation() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Owner Information</h3>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <Input placeholder="Owner Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone" />
        <Input placeholder="WhatsApp" />
      </CardContent>
    </Card>
  );
}