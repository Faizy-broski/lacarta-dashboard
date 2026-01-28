import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Plus,Image,Star} from 'lucide-react'
export function ImageGallery() {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  ];

  return (
    <Card className="my-7">
      <CardHeader>
         <div className="flex items-center gap-3">
                  <div>
                    <Image size={50} className="p-2 text-500 rounded bg-yellow-50" />
                  </div>
                  <div>
                <h3 className="font-bold">Description & Stories</h3>
                  </div>
                </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Image */}
        <div className="text-yellow-600 flex gap-2">
          <Star size={20}/>
        <p className="font-bold text-black">Cover Image</p>
        </div>
        <div className="aspect-video rounded-xl overflow-hidden bg-muted">
          <img
            src={images[0]}
            alt="Main"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer"
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}

          {/* Add Button */}
          <div className="aspect-square rounded-lg border-5 border-dashed flex items-center justify-center text-xl font-semibold cursor-pointer hover:bg-muted">
            <div className="text-center">
            <Plus size={50} className="p-2 m-auto"/>
                    <h4 className="font-semibold text-muted-foreground">Add More</h4>
                    </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
