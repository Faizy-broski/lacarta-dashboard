import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {Calendar} from "lucide-react"

export function DescriptionTabs() {
  return (
    <Card className="my-7">
      <CardHeader>
       <div className="flex items-center gap-3">
          <div>
            <Calendar size={50} className="p-2 text-yellow-500 rounded bg-yellow-50" />
          </div>
          <div>
        <h3 className="font-bold">Description & Stories</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview" className="p-4">Overview</TabsTrigger>
            <TabsTrigger value="details"className="p-4">Details</TabsTrigger>
            <TabsTrigger value="rules"className="p-4">House Rules</TabsTrigger>
            <TabsTrigger value="nearby"className="p-4">Nearby</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Textarea className="min-h-[160px] bg-yellow-50 border"/>
          </TabsContent>
          <TabsContent value="details"><Textarea className="min-h-[160px]  bg-yellow-50 border" /></TabsContent>
          <TabsContent value="rules"><Textarea className="min-h-[160px]  bg-yellow-50 border" /></TabsContent>
          <TabsContent value="nearby"><Textarea className="min-h-[160px]  bg-yellow-50 border" /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
