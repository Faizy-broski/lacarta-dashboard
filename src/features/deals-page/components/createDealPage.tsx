"use client"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, CalendarIcon, Upload, X, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// DatePicker (unchanged)
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

function DatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder?: string
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export default function CreateDealModal() {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState<"draft" | "submit">("submit")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfPreviewName, setPdfPreviewName] = useState<string | null>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file")
      return
    }
    setPdfFile(file)
    setPdfPreviewName(file.name)
  }

  const removePdf = () => {
    setPdfFile(null)
    setPdfPreviewName(null)
    if (pdfInputRef.current) pdfInputRef.current.value = ""
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </DialogTrigger>

      <DialogContent 
        className={cn(
          "p-0 gap-0 overflow-y-auto max-h-[96vh]",
          "w-full max-w-[min(95vw,460px)] sm:max-w-[min(95vw,520px)] md:max-w-[min(95vw,620px)]",
        )}
      >
        <DialogHeader className="px-5 sm:px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-lg sm:text-xl font-semibold tracking-tight">
            Create New Deal
          </DialogTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Add deal details and select a category to submit your offer for review.
          </p>
        </DialogHeader>

        <div className="px-5 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="title" className="flex items-center gap-1 text-sm">
              Deal Title <span className="text-red-500">*</span>
            </Label>
            <Input id="title" placeholder="Summer Flash Sale – 50% Off" className="h-9" />
          </div>

          {/* Description - smaller height */}
          <div className="space-y-1.5">
            <Label className="text-sm">Description</Label>
            <Textarea
              placeholder="Brief description of the deal..."
              className="min-h-[60px] sm:min-h-[68px] resize-none text-sm"
            />
          </div>

          {/* Partner */}
          <div className="space-y-1.5">
            <Label htmlFor="partner" className="flex items-center gap-1 text-sm">
              Partner / Brand <span className="text-red-500">*</span>
            </Label>
            <Input id="partner" placeholder="e.g. KFC, Samsung" className="h-9" />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Start Date</Label>
              <DatePicker date={startDate} setDate={setStartDate} placeholder="Select start date" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">End Date</Label>
              <DatePicker date={endDate} setDate={setEndDate} placeholder="Select end date" />
            </div>
          </div>

          {/* Offer */}
          <div className="space-y-1.5">
            <Label className="text-sm">Offer / Discount details</Label>
            <Input placeholder="e.g. 50% OFF • Free delivery..." className="h-9" />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1 text-sm">
              Category <span className="text-red-500 font-medium">(REQUIRED)</span>
            </Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="tech">Tech & Gadgets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-sm">Status</Label>
            <RadioGroup
              value={status}
              onValueChange={(v) => setStatus(v as "draft" | "submit")}
              className="flex flex-col sm:flex-row gap-5 sm:gap-8 pt-0.5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft" className="cursor-pointer text-sm">Draft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="submit" id="submit" />
                <Label htmlFor="submit" className="cursor-pointer text-sm">Submit</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Upload PDF - reduced vertical space */}
          <div className="space-y-1.5">
            <Label className="text-sm">Upload PDF</Label>
            <div className="border border-dashed border-input rounded-lg p-3 sm:p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
              {!pdfPreviewName ? (
                <div className="flex flex-col items-center justify-center py-1 sm:py-4 text-center">
                  <Upload className="h-6 w-6 sm:h-7 sm:w-7 text-muted-foreground mb-1.5" />
                  <p className="text-sm font-medium">Click to upload PDF</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Max 10MB recommended</p>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handlePdfChange}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 gap-1.5 text-xs sm:text-sm"
                    onClick={() => pdfInputRef.current?.click()}
                  >
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Choose PDF
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-2.5 px-3 sm:px-4 bg-background rounded border text-sm">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                    <span className="font-medium truncate max-w-[180px] sm:max-w-[260px]">
                      {pdfPreviewName}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive"
                    onClick={removePdf}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 border-t bg-muted/30">
          <Button
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium h-10"
            onClick={() => setOpen(false)}
            disabled={status === "draft"}
          >
            {status === "submit" ? "Submit Deal" : "Save as Draft"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}