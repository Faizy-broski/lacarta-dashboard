import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function CountrySelect() {
  const countries = [
    "Pakistan",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "United Arab Emirates",
    "Saudi Arabia",
    "China",
    "Japan",
    "India",
    "Turkey",
  ];

  return (
    <div className="space-y-2">
      <Label>Country</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>

        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country} value={country.toLowerCase()}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
