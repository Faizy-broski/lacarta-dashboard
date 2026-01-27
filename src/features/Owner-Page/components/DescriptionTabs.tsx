import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function DescriptionTabs() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Description & Story</h3>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="rules">House Rules</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Textarea className="min-h-[160px]" />
          </TabsContent>
          <TabsContent value="details"><Textarea /></TabsContent>
          <TabsContent value="rules"><Textarea /></TabsContent>
          <TabsContent value="nearby"><Textarea /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
