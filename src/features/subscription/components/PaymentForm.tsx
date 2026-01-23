import { Input} from "@/components/ui/input"
import { Label} from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentForm() {
  return (
    <Card className="my-4">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Payment</h3>

        <Label className="ml-1 font-bold">Email</Label>
        <Input placeholder="Email address" />
        <Label className="ml-1 font-bold">Card Number</Label>
        <Input placeholder="1234 1234 1234 1234" />
        <div className="grid grid-cols-2 gap-4">
            <div>
        <Label className="ml-1 mb-3 font-bold">Expiration</Label>
          <Input placeholder="MM / YY" />
            </div>
            <div>
        <Label className="ml-1 mb-3 font-bold">CVC</Label>
          <Input placeholder="CVC" />
            </div>
        </div>

        <Label className="ml-1 font-bold">Country</Label>
        <Input placeholder="Hong Kong SAR China" />

        <div className="flex items-center gap-2 text-sm">
          <Checkbox id="save" />
          <label htmlFor="save">
            Securely save my information for one-click checkout
          </label>
        </div>

        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600">
          Done
        </Button>
      </CardContent>
    </Card>
  )
}
