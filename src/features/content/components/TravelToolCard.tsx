"use client"

import { useState } from "react"
import { Bell, Plus, Search, Menu, X, ChevronRight, Calendar,Edit, Eye, MoreVertical } from "lucide-react"
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


const travelTools = [
  { title: "Cartagena City Guide", type: "City Guide", updated: "Dec 28, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "5 Day Itinerary", type: "Itinerary", updated: "Dec 20, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Local Experiences", type: "Experience", updated: "Dec 15, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Weekend in Getsemani", type: "City Guide", updated: "Dec 5, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Beach Day Planner", type: "City Guide", updated: "Dec 5, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
  { title: "Food Tours Guide", type: "Experience", updated: "Nov 30, 2024", icon:<Calendar size={40} className="bg-yellow-100 text-yellow-600 rounded p-2"/>, color : "bg-yellow-100 text-yellow-600" },
]

export default function TravelToolCard(){
  return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Travel Tools</CardTitle>
              <Button variant="link" className="text-amber-400">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {travelTools.map((tool, i) => (
                  <Card key={i} className="transition-colors">
                    <CardContent className="space-y-3">
                      <div >
                          {tool.icon}
                          <h3 className="font-medium">{tool.title}</h3>
                        <div className="flex justify-between">
                          <p className={`text-sm ${tool.color} p-1 rounded mt-1`}>{tool.type}</p>
                          <p className="text-xs text-gray-500 mt-2">Updated {tool.updated}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
  )
}

