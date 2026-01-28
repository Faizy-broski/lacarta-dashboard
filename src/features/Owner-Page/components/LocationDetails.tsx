import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountrySelect} from "@/components/ui/countrySelect";
import {MapPin,Send} from "lucide-react"

export function LocationDetails() {
  return (
    <Card className="my-7">
      <CardHeader>
         <div className="flex items-center gap-3">
          <div>
            <MapPin size={50} className="p-2 text-yellow-500 rounded bg-yellow-50" />
          </div>
          <div>
        <h3 className="font-bold">Location Details</h3>
        <p className="font-bold">Where is your property Located?</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div>
        <div className="space-y-1 sm:col-span-2">
          <Label>Street Address</Label>
          <Input className="bg-gray-100 my-2"/>
        </div>
        <div className="flex my-5 gap-2">
        <div className="space-y-1"><Label>City</Label><Input className="bg-gray-100 my-2"/></div>
        <div className="space-y-1"><Label>Region</Label><Input className="bg-gray-100 my-2"/></div>
        </div>
        <CountrySelect />
        </div>
        <div>
        <div className="flex items-center gap-3">
          <div>
            <Send size={18} className="text-black" />
          </div>
          <div>
        <h4 className="font-bold">Map Preview</h4>
          </div>
        </div>
        <div className="mt-3 h-[230px] w-full overflow-hidden rounded-xl border">
     <iframe
          title="Map Preview"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Pakistan&output=embed"
  />
</div>
        </div>
      </CardContent>
    </Card>
  );
}
