"use client"

import { useState } from "react"
import { Bell, Plus, Search, Menu, X, ChevronRight,NotebookPen, Edit, Eye, MoreVertical } from "lucide-react"
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

const drafts = [
  { title: "Weekend Getaways from Cartagena", status: "Needs Review", author: "María Santos", time: "2 hours ago" },
  { title: "The Complete Guide to Islas del Rosario", status: "In Progress", author: "Carlos Mendoza", time: "Yesterday" },
  { title: "Street Art Walking Tour", status: "Needs Review", author: "Ana Lucia Reyes", time: "3 days ago" },
  { title: "Best Coffee Shops for Digital Nomads", status: "In Progress", author: "Diego Herrera", time: "1 week ago" },
]

export default function DraftCard(){
  return (
    <Card className="my-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Drafts</CardTitle>
              <Button variant="link" className="text-amber-400">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {drafts.map((draft, i) => (
                  <Card key={i}>
                    <CardHeader>

                        <div className="flex justify-between items-center">
                           <div>
                            <NotebookPen className="bg-yellow-50 text-yellow-600 p-2 rounded" size={40} />
                            </div> 
                           <div>    
                        <Badge variant="outline" className="bg-red-50 text-red-600 font-bold p-2">
                          {draft.status}
                        </Badge>
                            </div> 
                        </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-start ">
                        <div>
                          <h3 className="font-medium line-clamp-2">{draft.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{draft.author} • {draft.time}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-green-700 hover:bg-green-800 mt-3">
                        Continue Editing
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
            )
}

