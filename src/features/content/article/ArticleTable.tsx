"use client"

import { useState } from "react"
import { Bell, Plus, Search, Menu, X, ChevronRight, Edit, Eye, MoreVertical } from "lucide-react"
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

const articles = [
  { title: "The Hidden Courtyards of Getsemani", image: "/images/getsemani.jpg", category: "Architecture", author: "María Santos", status: "Published", views: "3,420" },
  { title: "Cartagena's Best Cevicherías: A Local's Guide", image: "/images/ceviche.jpg", category: "Food & Drink", author: "Carlos Mendoza", status: "Published", views: "2,891" },
  { title: "Sunset Sessions: Rooftop Bars in the Old City", image: "/images/rooftop.jpg", category: "Nightlife", author: "Ana Lucia Reyes", status: "Scheduled", views: "0" },
  { title: "Artisan Markets of Cartagena", image: "/images/market.jpg", category: "Shopping", author: "Diego Herrera", status: "Published", views: "1,567" },
]

export default function ArticleTable(){
  return (
   <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Articles</CardTitle>
              <Button variant="link" className="text-amber-400">
                View All →
              </Button>
            </CardHeader>
            <CardContent>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="w-[300px]">ARTICLE</TableHead>
                      <TableHead>CATEGORY</TableHead>
                      <TableHead>AUTHOR</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>VIEWS</TableHead>
                      <TableHead className="text-right">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.map((article, i) => (
                      <TableRow key={i} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-16 rounded overflow-hidden bg-gray-800">
                              {/* <img src={article.image} alt="" className="h-full w-full object-cover" /> */}
                            </div>
                            <span className="font-medium">{article.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{article.category}</TableCell>
                        <TableCell>{article.author}</TableCell>
                        <TableCell>
                          <Badge
                            variant={article.status === "Published" ? "default" : "secondary"}
                            className={cn(
                              article.status === "Published" && "bg-green-600 hover:bg-green-600",
                              article.status === "Scheduled" && "bg-yellow-600 hover:bg-yellow-600"
                            )}
                          >
                            {article.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.views}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {articles.map((article, i) => (
                  <Card key={i} >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 rounded overflow-hidden bg-gray-800 flex-shrink-0">
                          {/* <img src={article.image} alt="" className="h-full w-full object-cover" /> */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-gray-400 mt-1">{article.category}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                            <span>{article.author}</span>
                            <Badge
                              variant={article.status === "Published" ? "default" : "secondary"}
                              className={cn(
                                article.status === "Published" && "bg-green-600",
                                article.status === "Scheduled" && "bg-yellow-600"
                              )}
                            >
                              {article.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-400">{article.views} views</span>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
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

