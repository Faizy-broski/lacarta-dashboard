"use client"

import { useState } from "react"
import img from "@/assets/images/featured.png"
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

const featuredStories = [
  { title: "Cartagena's Colonial Architecture: A Walking Tour", image: "/images/colonial.jpg", position: 1, featured: true },
  { title: "The Best Seafood Restaurants in the Walled City", image: "/images/seafood.jpg", position: 2, featured: true },
  { title: "Sunset at Café del Mar: The Ultimate Guide", image: "/images/sunset.jpg", position: 3, featured: true },
  { title: "Hidden Beaches of the Rosario Islands", image: "/images/rosario.jpg", position: 4, featured: false },
]

export default function FeaturedStoryCard(){
  return (
    <Card className="my-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Featured Stories</CardTitle>
              <Button variant="link" className="text-amber-400">
                Manage →
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStories.map((story, i) => (
                  <Card key={i} className=" overflow-hidden p-1">
                    <div className="aspect-video  relative">
                      {/* <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" /> */}
                    </div>
                    <CardContent className="p-2">
                      <h3 className="text-xs font-bold  mb-3">{story.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Position #{story.position}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Featured</span>
                          <Switch checked={story.featured} />
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

