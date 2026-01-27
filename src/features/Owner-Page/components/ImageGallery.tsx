import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ImageGallery() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold">Image Gallery</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video rounded-xl bg-muted" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted" />
          ))}
          <div className="aspect-square rounded-lg border border-dashed flex items-center justify-center">+</div>
        </div>
      </CardContent>
    </Card>
  );
}
