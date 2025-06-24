"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Clock, BookOpen, FileText, GraduationCap, Plus, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Task = {
  id: string
  title: string
  dueDate: string
  completed: boolean
  priority: "high" | "medium" | "low"
  type: "assignment" | "quiz" | "class" | "other"
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Physics Lab Report",
      dueDate: "Tomorrow, 11:59 PM",
      completed: false,
      priority: "high",
      type: "assignment",
    },
    {
      id: "2",
      title: "Study for Calculus Quiz",
      dueDate: "Wednesday, 2:00 PM",
      completed: false,
      priority: "medium",
      type: "quiz",
    },
    {
      id: "3",
      title: "Attend Psychology Lecture",
      dueDate: "Today, 3:30 PM",
      completed: false,
      priority: "medium",
      type: "class",
    },
    {
      id: "4",
      title: "Read Chapter 5 of Economics Textbook",
      dueDate: "Friday, 9:00 AM",
      completed: true,
      priority: "low",
      type: "other",
    },
  ])

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      dueDate: "No due date",
      completed: false,
      priority: "medium",
      type: "other",
    }

    setTasks([newTask, ...tasks])
    setNewTaskTitle("")
    setIsAddingTask(false)
  }

  const getTaskIcon = (type: Task["type"]) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />
      case "quiz":
        return <BookOpen className="h-4 w-4" />
      case "class":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <Circle className="h-4 w-4" />
    }
  }

  const getTaskTypeColor = (type: Task["type"]) => {
    switch (type) {
      case "assignment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "quiz":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "class":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Upcoming Tasks</CardTitle>
          <Button
            size="sm"
            onClick={() => setIsAddingTask(true)}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingTask && (
          <div className="mb-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div className="flex gap-2">
              <Input
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Button size="sm" onClick={addTask}>
                Add
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAddingTask(false)
                  setNewTaskTitle("")
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={cn(
                "flex items-start justify-between p-3 rounded-lg border group",
                task.completed
                  ? "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
              )}
            >
              <div className="flex items-start gap-3 flex-1">
                <button
                  className="mt-0.5 text-slate-500 hover:text-purple-500 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={cn("font-medium", task.completed && "line-through text-slate-500 dark:text-slate-400")}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getTaskTypeColor(task.type)} variant="secondary">
                  <span className="flex items-center gap-1">
                    {getTaskIcon(task.type)}
                    <span className="capitalize">{task.type}</span>
                  </span>
                </Badge>
                <Badge className={getPriorityColor(task.priority)} variant="secondary">
                  <span className="capitalize">{task.priority}</span>
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
