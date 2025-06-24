"use client"

import type React from "react"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Clock, Brain, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Suggestion = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  accepted?: boolean
  dismissed?: boolean
}

export function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      title: "Schedule study blocks",
      description: "You have 3 free hours this afternoon. Want to time-block for your Physics quiz?",
      icon: <Clock className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "2",
      title: "Distribute deadlines",
      description: "You seem overloaded on Friday. Want to auto-distribute your deadlines?",
      icon: <Calendar className="h-5 w-5 text-cyan-500" />,
    },
    {
      id: "3",
      title: "Optimize your routine",
      description: "Based on your productivity patterns, try studying earlier in the morning.",
      icon: <Brain className="h-5 w-5 text-amber-500" />,
    },
  ])

  const acceptSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, accepted: true } : suggestion)),
    )
  }

  const dismissSuggestion = (id: string) => {
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id))
  }

  const snoozeSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, dismissed: true } : suggestion)),
    )
  }

  const activeSuggestions = suggestions.filter((s) => !s.dismissed)

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Smart Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activeSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className={`p-3 rounded-lg border transition-all ${
                suggestion.accepted
                  ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{suggestion.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{suggestion.title}</p>
                    {suggestion.accepted && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{suggestion.description}</p>
                  {!suggestion.accepted && (
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => acceptSuggestion(suggestion.id)}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                      >
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => snoozeSuggestion(suggestion.id)}>
                        Snooze
                      </Button>
                      <div className="flex items-center gap-1 ml-auto">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => dismissSuggestion(suggestion.id)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {suggestion.accepted && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                      ✓ Applied to your schedule
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
