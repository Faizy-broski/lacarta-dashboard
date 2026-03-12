import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar,MapPin, Link} from "lucide-react";

export function BasicInformation() {
  return (
    <Card className="my-7">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div>
            <Calendar size={50} className="p-2 text-yellow-500 rounded bg-yellow-50" />
          </div>
          <div>
        <h3 className="font-bold">Basic Information</h3>
        <p className="text-sm text-muted-foreground">Core details about your listing</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <Label>Listing Title</Label>
          <Input className="bg-gray-100" />
        <p className="text-sm font-semibold text-muted-foreground">A compelling title that captures attention</p>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Short Tagline</Label>
          <Input className="bg-gray-100"  />
        <p className="text-sm font-semibold text-muted-foreground">A brief subtitle for quick impressions</p>
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
          <div className="flex gap-2">
          <MapPin size={20}/>
          <Label>City / Area</Label>
          </div>
          <Input  className="bg-gray-100" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <div className="flex gap-2">
          <Link size={20}/>
          <Label>URL Slug</Label>
          </div>
          <Input  className="bg-gray-100" placeholder="yoursite.com/listing" disabled />
                  <p className="text-sm font-semibold text-muted-foreground">Auto-generated with title, editable</p>

        </div>
      </CardContent>
    </Card>
  );
}
