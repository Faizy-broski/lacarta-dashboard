// components/dashboard/PendingApprovals.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {Star} from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"



export function NewAccounts() {
  return (
    <>
    <Card className="p-0 border-none shadow-none">
      <CardContent className="space-y-4 p-0">
        <Card>
            <CardContent>
<CardHeader className="p-0">

        <div className="flex justify-between">
            <div>
                <h3 className="text-md font-bold">New Accounts</h3>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Last 30 Days</p>
            </div>
        </div>
</CardHeader>
            <div className="flex items-center gap-3">
                <div><Star size={50} className="bg-yellow-50 p-2 rounded text-yellow-500"/></div>
                <div>
                    <div className="flex gap-2"><h2 className="text-md font-bold text-black">447</h2><p className="text-yellow-600 font-semibold">12.5%</p></div>
                    <p className="text-sm text-muted-foreground">New Registered Users</p>
                </div>
            </div>
            </CardContent>
                <div className="my-2 grid grid-cols-3 text-center border-t pt-3">
                    <div>
                        <h3 className="text-sm font-bold">678</h3>
                    <p className="text-sm text-muted-foreground font-semibold">FaceBook</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold">498</h3>
                        <p className="text-sm text-muted-foreground font-semibold">Google</p>
                        </div>
                    <div>
                        <h3 className="text-sm font-bold">218</h3>
                        <p className="text-sm text-muted-foreground font-semibold">Email</p>
                        </div>
                    </div>
</Card>

  <Card>
            <CardContent>
<CardHeader className="p-0">

        <div className="flex justify-between">
            <div>
                <h3 className="text-md font-bold">Total Clients</h3>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Last 30 Days</p>
            </div>
        </div>
</CardHeader>
            <div className="flex items-center gap-3">
                <div><Star size={50} className="bg-yellow-50 p-2 rounded text-yellow-500"/></div>
                <div>
                    <div className="flex gap-2"><h2 className="text-md font-bold text-black">447</h2><p className="text-yellow-600 font-semibold">12.5%</p></div>
                    <p className="text-sm text-muted-foreground">New Registered Users</p>
                </div>
            </div>
            </CardContent>
                <div className="my-2 grid grid-cols-5 text-center border-t px-1 gap-2 pt-3">
                    <div>
                        <h3 className="text-sm font-bold">678</h3>
                    <p className="text-xs text-muted-foreground font-semibold">FaceBook</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold">678</h3>
                    <p className="text-xs text-muted-foreground font-semibold">FaceBook</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold">678</h3>
                    <p className="text-xs text-muted-foreground font-semibold">FaceBook</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold">498</h3>
                        <p className="text-xs text-muted-foreground font-semibold">Google</p>
                        </div>
                    <div>
                        <h3 className="text-sm font-bold">218</h3>
                        <p className="text-xs text-muted-foreground font-semibold">Email</p>
                        </div>
                    </div>
</Card>


      </CardContent>
    </Card>

    
    </>
  )
}
