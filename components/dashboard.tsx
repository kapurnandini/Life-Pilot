"use client"

import { useState } from "react"
import { Send, Brain, Calendar, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { TaskList } from "@/components/task-list"
import { SmartSuggestions } from "@/components/smart-suggestions"
import { MoodTracker } from "@/components/mood-tracker"
import { AiTips } from "@/components/ai-tips"

export function Dashboard() {
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!inputValue.trim()) return

    setIsProcessing(true)
    setAiResponse(null)

    // Simulate AI processing with realistic responses
    setTimeout(() => {
      const responses = [
        "I've analyzed your input and created 3 tasks, scheduled 2 calendar events, and set up study reminders. Your Physics quiz prep is now optimized for maximum retention!",
        "Great! I've organized your assignments into manageable chunks and found the perfect study windows in your schedule. You're all set for success!",
        "I've processed your schedule and created a personalized study plan. I also noticed you might need a break - I've suggested some wellness activities.",
        "Perfect! Your tasks are now organized by priority and I've synced everything with your calendar. I've also set up smart reminders based on your productivity patterns.",
      ]

      setAiResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsProcessing(false)
      setInputValue("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
        <p className="text-muted-foreground mt-1">Let's organize your day together.</p>
      </div>

      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Tell me what's on your mind
          </CardTitle>
          <CardDescription>Type anything like "I have 2 assignments and a quiz this week"</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your schedule? I'll help organize it..."
            className="min-h-24 resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {aiResponse && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">AI Assistant</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{aiResponse}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Calendar
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Tasks
            </Badge>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isProcessing}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          >
            {isProcessing ? "Processing..." : "Process"} <Send className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskList />
        <SmartSuggestions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoodTracker />
        <AiTips />
      </div>
    </div>
  )
}
