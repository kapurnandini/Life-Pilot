"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Lightbulb, X } from "lucide-react"

type Tip = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export function AiTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [dismissedTips, setDismissedTips] = useState<string[]>([])

  const allTips: Tip[] = [
    {
      id: "1",
      title: "Try the Pomodoro Technique",
      description: "Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "2",
      title: "Hydration Reminder",
      description: "You haven't logged water intake today. Staying hydrated improves focus and energy levels.",
      icon: <Lightbulb className="h-5 w-5 text-cyan-500" />,
    },
    {
      id: "3",
      title: "Schedule a Wellness Break",
      description: "Your calendar shows back-to-back meetings. Consider adding a 10-minute break between them.",
      icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "4",
      title: "Optimize Study Environment",
      description: "Studies show that a clean, organized workspace can improve focus by up to 40%.",
      icon: <Lightbulb className="h-5 w-5 text-green-500" />,
    },
    {
      id: "5",
      title: "Power Nap Suggestion",
      description: "A 20-minute nap between 1-3 PM can boost alertness and memory consolidation.",
      icon: <Lightbulb className="h-5 w-5 text-orange-500" />,
    },
  ]

  const tips = allTips.filter((tip) => !dismissedTips.includes(tip.id))

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length)
  }

  const dismissTip = (tipId: string) => {
    setDismissedTips((prev) => [...prev, tipId])
    if (currentTipIndex >= tips.length - 1) {
      setCurrentTipIndex(0)
    }
  }

  if (tips.length === 0) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">AI Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Lightbulb className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400">No more tips for now!</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Check back later for new suggestions.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentTip = tips[currentTipIndex]

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">AI Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 relative">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dismissTip(currentTip.id)}
            className="absolute top-2 right-2 h-6 w-6 opacity-60 hover:opacity-100"
          >
            <X className="h-3 w-3" />
          </Button>
          <div className="flex items-start gap-3 pr-8">
            <div className="mt-0.5">{currentTip.icon}</div>
            <div>
              <p className="font-medium">{currentTip.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{currentTip.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button size="icon" variant="outline" onClick={prevTip} className="h-8 w-8" disabled={tips.length <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {tips.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentTipIndex ? "bg-purple-500" : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <Button size="icon" variant="outline" onClick={nextTip} className="h-8 w-8" disabled={tips.length <= 1}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
