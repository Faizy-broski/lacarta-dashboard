// components/dashboard/LatestComments.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const comments = [
  {
    author: "Carlos M.",
    post: "Best Beaches in Cartagena",
    comment: "Great article! Very helpful for planning our trip.",
    date: "2 hours ago",
  },
  {
    author: "Sarah J.",
    post: "Street Food Guide",
    comment: "The arepa stands you recommended were amazing!",
    date: "4 hours ago",
  },
  {
    author: "Miguel R.",
    post: "Colonial Houses Tour",
    comment: "Would love more photos of the interiors.",
    date: "6 hours ago",
  },
  {
    author: "Emily W.",
    post: "Rosario Islands Day Trip",
    comment: "What’s the best time of year to visit?",
    date: "8 hours ago",
  },
]

export function LatestComments() {
  return (
    <Card className="my-10">
      <CardHeader>
        <div className="flex items-center justify-between">
        <h3 className="font-semibold">Latest Comments</h3>
        <Button className="text-xs bg-background border-none shadow-none text-red-500 font-bold">View all</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Post</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {comments.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2 font-bold">
                    
              <Avatar className="font-medium">
                <AvatarFallback >
                  {item.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              
                  {item.author}
                </TableCell>
                <TableCell className="text-red-600 font-bold">{item.post}</TableCell>
                <TableCell className="max-w-[420px] truncate">
                  {item.comment}
                </TableCell>
                <TableCell className="text-right font-bold text-muted-foreground whitespace-nowrap">
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
