import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const amenities = ["Wifi", "Parking", "Air Conditioning", "Pool", "Garden", "Smart TV"];

export function Amenities() {
  return (
    <Card className="my-7">
      <CardHeader>
        <h3 className="font-semibold">Amenities & Features</h3>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {amenities.map(a => (
          <Badge key={a} variant="outline">{a}</Badge>
        ))}
      </CardContent>
    </Card>
  );
}
