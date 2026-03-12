"use client"

import { useState } from "react"
import { Bell, Plus, Search, Menu, X, ChevronRight,ArrowRight, Calendar,Edit, Eye, MoreVertical } from "lucide-react"
import {FileText , PencilLine,FolderClosed,Star,Wrench} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"


const quickAction = [
  { title: "Create Article", type: "Write new content", icon:<PencilLine size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Review Drafts", type: "18 awaiting reviews", icon:<FileText size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Manage Categories", type: "Organize content",  icon:<FolderClosed size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Update Features", type: "Homepage stories",  icon:<Star size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Beach Day Planner", type: "Guide & Planners",  icon:<Wrench size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
]

export default function QuickActionCard(){
  return (
          <Card className="my-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Travel Tools</CardTitle>
              <Button variant="link" className="text-amber-400">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {quickAction.map((tool, i) => (
                  <Card key={i} className="transition-colors py-2">
                    <CardContent className="px-2">
                      <div >
                          {tool.icon}
                          <p className="font-semibold text-md">{tool.title}</p>
                          <p className={`text-sm mt-1`}>{tool.type}</p>
                          <Button className="bg-white text-black"><ArrowRight size={30} /></Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
  )
}

