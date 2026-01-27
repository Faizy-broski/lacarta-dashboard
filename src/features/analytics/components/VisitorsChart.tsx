import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", visitors: 4200, engagement: 2600 },
  { day: "Tue", visitors: 3900, engagement: 2400 },
  { day: "Wed", visitors: 4800, engagement: 3100 },
  { day: "Thu", visitors: 4500, engagement: 2900 },
  { day: "Fri", visitors: 5200, engagement: 3600 },
  { day: "Sat", visitors: 5600, engagement: 3900 },
  { day: "Sun", visitors: 5100, engagement: 3700 },
];

export function VisitorsChart() {
  return (
    <Card className="my-10">
      <CardHeader>
        <h3 className="font-semibold">Visitors vs Engagement</h3>
        <p className="text-sm text-muted-foreground">Last 7 days performance</p>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="visitors" fillOpacity={0.2} strokeWidth={2} />
            <Area type="monotone" dataKey="engagement" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}