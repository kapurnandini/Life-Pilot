"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, CalendarIcon, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Event = {
  id: string
  title: string
  time: string
  type: "class" | "assignment" | "study" | "personal" | "other"
  date: number
}

type Day = {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
}

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState("June 2025")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    type: "other" as Event["type"],
  })

  const [events, setEvents] = useState<Event[]>([
    { id: "1", title: "Psychology Lecture", time: "10:00 AM - 11:30 AM", type: "class", date: 10 },
    { id: "2", title: "Study Group", time: "2:00 PM - 3:30 PM", type: "study", date: 10 },
    { id: "3", title: "Physics Lab", time: "9:00 AM - 11:00 AM", type: "class", date: 11 },
    { id: "4", title: "Calculus Quiz", time: "2:00 PM", type: "assignment", date: 11 },
    { id: "5", title: "Coffee with Alex", time: "3:00 PM", type: "personal", date: 12 },
    { id: "6", title: "Economics Assignment Due", time: "11:59 PM", type: "assignment", date: 14 },
  ])

  // Sample calendar data
  const days: Day[] = Array.from({ length: 35 }, (_, i) => {
    const date = i - 2 // Start from May 30
    const isCurrentMonth = date > 0 && date <= 30
    const isToday = date === 10 // June 10 is today

    const dayEvents = events.filter((event) => event.date === date)

    return {
      date,
      isCurrentMonth,
      isToday,
      events: dayEvents,
    }
  })

  const addEvent = () => {
    if (!newEvent.title || !newEvent.time || !selectedDate) return

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      time: newEvent.time,
      type: newEvent.type,
      date: selectedDate,
    }

    setEvents((prev) => [...prev, event])
    setNewEvent({ title: "", time: "", type: "other" })
    setIsAddEventOpen(false)
    setSelectedDate(null)
  }

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId))
  }

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "class":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "assignment":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "study":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "personal":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-1">Manage your schedule and events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-purple-500" />
                  <CardTitle className="text-lg font-medium">{currentMonth}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Event Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter event title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            placeholder="e.g., 2:00 PM - 3:00 PM"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            onValueChange={(value: Event["type"]) => setNewEvent((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class">Class</SelectItem>
                              <SelectItem value="assignment">Assignment</SelectItem>
                              <SelectItem value="study">Study</SelectItem>
                              <SelectItem value="personal">Personal</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="number"
                            placeholder="Day of month (1-30)"
                            min="1"
                            max="30"
                            value={selectedDate || ""}
                            onChange={(e) => setSelectedDate(Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={addEvent}
                          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                          disabled={!newEvent.title || !newEvent.time || !selectedDate}
                        >
                          Add Event
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                {/* Weekday headers */}
                {weekdays.map((day) => (
                  <div
                    key={day}
                    className="bg-slate-100 dark:bg-slate-800 p-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "min-h-24 p-1 bg-white dark:bg-slate-800 relative cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50",
                      !day.isCurrentMonth && "bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500",
                      day.isToday && "bg-purple-50 dark:bg-purple-900/10",
                    )}
                    onClick={() => {
                      if (day.isCurrentMonth) {
                        setSelectedDate(day.date)
                        setIsAddEventOpen(true)
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={cn(
                          "text-sm font-medium p-1",
                          day.isToday &&
                            "bg-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center",
                        )}
                      >
                        {day.date > 0 && day.date <= 30 ? day.date : ""}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {day.events.map((event) => (
                        <div
                          key={event.id}
                          className={cn("text-xs p-1 rounded truncate group relative", getEventTypeColor(event.type))}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs opacity-80">{event.time}</div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-0 right-0 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteEvent(event.id)
                            }}
                          >
                            <X className="h-2 w-2" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Class gap detected</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      You have a 2-hour gap between classes on Wednesday. Add a study session?
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          const studyEvent: Event = {
                            id: Date.now().toString(),
                            title: "Study Session",
                            time: "12:00 PM - 1:30 PM",
                            type: "study",
                            date: 12,
                          }
                          setEvents((prev) => [...prev, studyEvent])
                        }}
                      >
                        Add Session
                      </Button>
                      <Button size="sm" variant="outline">
                        Ignore
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Buffer time needed</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Too many back-to-back events on Thursday. Add 15-minute buffers?
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Add Buffers</Button>
                      <Button size="sm" variant="outline">
                        Ignore
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Optimize study time</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Based on your productivity patterns, morning is your best focus time.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm">Schedule AM Study</Button>
                      <Button size="sm" variant="outline">
                        Ignore
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
