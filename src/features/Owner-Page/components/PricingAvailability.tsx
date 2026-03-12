import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {DollarSign} from 'lucide-react'

export function PricingAvailability() {
  return (
    <Card className="my-7">
      <CardHeader>
         <div className="flex items-center gap-3">
                  <div>
                    <DollarSign size={50} className="p-2 text-yellow-500 rounded bg-yellow-50" />
                  </div>
                  <div>
                        <h3 className="font-semibold">Pricing & Availability</h3>
                <p className="font-bold">Set your rates and avaibility</p>
                  </div>
                </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div>
        <div className="flex my-5 gap-2">
          <div><Label>Month To Month Rent</Label><Input placeholder="$" className="bg-gray-100"/></div>
        <div><Label>For Sale</Label><Input placeholder="$" className="bg-gray-100"/></div>
        </div>
        <Input placeholder="Minimum Stay" className="bg-gray-100"/>
         <div className="my-4"><Label>Seasonal Notes</Label><Textarea className="bg-gray-100 my-3"/></div>
        </div>
         <div>
                        <p className="font-semibold">Availability Calendar</p>
          <div>
            <Calendar className="m-auto border"/>
          </div>
         </div>
      </CardContent>
    </Card>
  );
}