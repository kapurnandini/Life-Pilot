"use client"

import type React from "react"

import { useState } from "react"
import { Plus, CloudRain, Clock, Calendar, Bell, Brain, Zap, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type Automation = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  active: boolean
  category: string
}

export function AutomationsHub() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: "1",
      title: "Weather Alert",
      description: "If weather is rainy, remind me to carry an umbrella",
      icon: <CloudRain className="h-5 w-5 text-cyan-500" />,
      active: true,
      category: "Weather",
    },
    {
      id: "2",
      title: "Deep Work Block",
      description: "If tomorrow has 2+ meetings, suggest a timeblock for deep work",
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      active: true,
      category: "Productivity",
    },
    {
      id: "3",
      title: "Assignment Reminder",
      description: "Remind me 2 days before assignment deadlines",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      active: true,
      category: "Academic",
    },
    {
      id: "4",
      title: "Hydration Reminder",
      description: "Remind me to drink water every 2 hours",
      icon: <Bell className="h-5 w-5 text-blue-500" />,
      active: false,
      category: "Health",
    },
    {
      id: "5",
      title: "Study Suggestion",
      description: "Suggest study sessions based on my productivity patterns",
      icon: <Brain className="h-5 w-5 text-green-500" />,
      active: true,
      category: "Academic",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    trigger: "",
    action: "",
    category: "",
  })

  const toggleAutomation = (id: string) => {
    setAutomations(
      automations.map((automation) =>
        automation.id === id ? { ...automation, active: !automation.active } : automation,
      ),
    )
  }

  const createAutomation = () => {
    if (!newAutomation.name || !newAutomation.trigger || !newAutomation.action) return

    const automation: Automation = {
      id: Date.now().toString(),
      title: newAutomation.name,
      description: `When ${newAutomation.trigger}, ${newAutomation.action}`,
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      active: true,
      category: newAutomation.category || "Custom",
    }

    setAutomations((prev) => [automation, ...prev])
    setNewAutomation({ name: "", trigger: "", action: "", category: "" })
    setIsDialogOpen(false)
  }

  const categories = ["All", "Weather", "Productivity", "Academic", "Health", "Custom"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredAutomations =
    selectedCategory === "All" ? automations : automations.filter((a) => a.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Automations Hub</h1>
        <p className="text-muted-foreground mt-1">Create smart routines that work for you.</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAutomations.map((automation) => (
          <Card
            key={automation.id}
            className={`backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-md transition-all hover:shadow-lg ${
              automation.active ? "bg-white/80 dark:bg-slate-900/80" : "bg-slate-100/80 dark:bg-slate-800/50"
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {automation.icon}
                  <div>
                    <CardTitle className="text-base font-medium">{automation.title}</CardTitle>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{automation.category}</p>
                  </div>
                </div>
                <Switch checked={automation.active} onCheckedChange={() => toggleAutomation(automation.id)} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{automation.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => setAutomations((prev) => prev.filter((a) => a.id !== automation.id))}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 border-dashed shadow-md cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <CardHeader className="pb-2 flex flex-col items-center justify-center h-full">
                <Plus className="h-8 w-8 text-slate-400" />
                <CardTitle className="text-base font-medium mt-2">Create Automation</CardTitle>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Automation</DialogTitle>
              <DialogDescription>Set up a new automation to help optimize your day.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Automation Name</Label>
                <Input
                  id="name"
                  placeholder="My New Automation"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trigger">When this happens...</Label>
                <Select onValueChange={(value) => setNewAutomation((prev) => ({ ...prev, trigger: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather-rain">Weather is rainy</SelectItem>
                    <SelectItem value="calendar-busy">Calendar is busy</SelectItem>
                    <SelectItem value="time-morning">It's morning (8 AM)</SelectItem>
                    <SelectItem value="task-completed">Task is completed</SelectItem>
                    <SelectItem value="mood-low">Mood is low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="action">Do this...</Label>
                <Select onValueChange={(value) => setNewAutomation((prev) => ({ ...prev, action: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notify">Send notification</SelectItem>
                    <SelectItem value="schedule">Schedule event</SelectItem>
                    <SelectItem value="suggest">Make suggestion</SelectItem>
                    <SelectItem value="email">Send email</SelectItem>
                    <SelectItem value="reminder">Set reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewAutomation((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weather">Weather</SelectItem>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={createAutomation}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                disabled={!newAutomation.name || !newAutomation.trigger || !newAutomation.action}
              >
                <Zap className="mr-2 h-4 w-4" />
                Create Automation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{automations.filter((a) => a.active).length}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Automations</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-cyan-600">247</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tasks Automated</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">12h</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Time Saved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
