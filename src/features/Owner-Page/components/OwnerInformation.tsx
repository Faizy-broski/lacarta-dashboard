import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Phone,Facebook,Instagram,Mail,MessageCircleMore,Globe,User} from "lucide-react"

export function OwnerInformation() {
  return (
    <Card className="my-7">
      <CardHeader>
         <div className="flex items-center gap-3">
          <div>
            <User size={50} className="p-2 text-yellow-500 rounded-full bg-yellow-50" />
          </div>
          <div>
        <h3 className="font-bold">Owner Information</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div>
        <div className="space-y-1 sm:col-span-2">
          <div className="flex gap-2"><User size={13}/><div><Label>Owner Name</Label></div></div>
          <Input className="bg-gray-100 my-2"/>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <div className="flex gap-2"><Mail size={13}/><div><Label>Email</Label></div></div>
          <Input className="bg-gray-100 my-2"/>
        </div>
        <div className="flex my-5 gap-2">
        <div className="space-y-1"><div className="flex gap-2"><Phone size={13}/><div><Label>Phone</Label></div></div><Input className="bg-gray-100 my-2"/></div>
        <div className="space-y-1"><div className="flex gap-2"><MessageCircleMore size={13}/><div><Label>Whatsapp</Label></div></div><Input className="bg-gray-100 my-2"/></div>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <div className="flex gap-2"><Globe size={13}/><div><Label>Website</Label></div></div>
          <Input className="bg-gray-100 my-2"/>
        </div>
        <div className="flex my-5 gap-2">
        <div className="space-y-1"><div className="flex gap-2"><Instagram size={13}/><div><Label>Instagram</Label></div></div><Input className="bg-gray-100 my-2"/></div>
        <div className="space-y-1"><div className="flex gap-2"><Facebook size={13}/><div><Label>FaceBook</Label></div></div><Input className="bg-gray-100 my-2"/></div>
        </div>

        </div>
        <div>
        <div className="flex items-center gap-3">
          <div>
            <User size={18} className="text-black" />
          </div>
          <div>
        <p className="font-bold">Profile Preview</p>
          </div>
        </div>
        <div className="mt-3 w-full rounded-xl border bg-white p-4">
  <div className="flex items-center gap-4">
    {/* Avatar */}
    <div className="h-14 w-14 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center text-lg font-semibold">
      JD
    </div>

    {/* Name + Role */}
    <div>
      <p className="font-semibold">John Doe</p>
      <p className="text-sm text-muted-foreground">Property Owner</p>
    </div>
  </div>

  {/* Divider */}
  <div className="my-4 h-px bg-border" />

  {/* Contact / Social Preview */}
  <div className="space-y-2 text-sm">
    <div className="flex items-center gap-2">
      <Facebook size={14} className="text-muted-foreground" />
      <span>facebook.com/johndoe</span>
    </div>

    <div className="flex items-center gap-2">
      <Instagram size={14} className="text-muted-foreground" />
      <span>instagram.com/johndoe</span>
    </div>

    <div className="flex items-center gap-2">
      <Globe size={14} className="text-muted-foreground" />
      <span>linkedin.com/in/johndoe</span>
    </div>
  </div>
</div>

        </div>
      </CardContent>
    </Card>
  );
}