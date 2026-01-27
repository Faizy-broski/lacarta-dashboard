import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BasicInformation() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Basic Information</h3>
        <p className="text-sm text-muted-foreground">Core details about your listing</p>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label>Listing Title</Label>
          <Input placeholder="A compelling title that captures attention" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Short Tagline</Label>
          <Input placeholder="A brief subtitle for quick impressions" />
        </div>
        <div className="space-y-1">
          <Label>Property Type</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>City / Area</Label>
          <Input />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>URL Slug</Label>
          <Input placeholder="yoursite.com/listing" disabled />
        </div>
      </CardContent>
    </Card>
  );
}
