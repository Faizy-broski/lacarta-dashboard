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

const categories = [
  { letter: "A", name: "Activities", count: 42,color:"yellow" },
  { letter: "A", name: "Accommodations", count: 38 ,color:"red"},
  { letter: "B", name: "Beaches", count: 24,color:"purple" },
  { letter: "B", name: "Boating", count: 19 ,color:"green"},
  { letter: "R", name: "Real Estate", count: 31,color:"blue" },
  { letter: "G", name: "Gastronomy", count: 27 ,color:"gray"},
]

export default function CategoryCard(){
  return (
    <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Categories</CardTitle>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="border-black text-black hover:bg-yellow-500 hover:text-white">
                  + Add Category
                </Button>
                <Button className="bg-yellow-500 text-white" variant="outline" size="sm">
                  Reorder →
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                  <Card key={i} className="py-5">
                    <CardContent className="px-3 space-y-2">
                      <span className={`text-lg font-semibold bg-${cat.color}-100 text-black px-3 py-2 rounded mb-3`}>{cat.letter}</span>
                      <h3 className="font-bold">{cat.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{cat.count} articles</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
            )
}

