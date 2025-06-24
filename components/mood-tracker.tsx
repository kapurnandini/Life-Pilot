"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type MoodData = {
  day: string
  mood: number
  emoji: string
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const [moodData, setMoodData] = useState<MoodData[]>([
    { day: "Mon", mood: 3, emoji: "😐" },
    { day: "Tue", mood: 2, emoji: "😔" },
    { day: "Wed", mood: 4, emoji: "😊" },
    { day: "Thu", mood: 5, emoji: "😄" },
    { day: "Fri", mood: 4, emoji: "😊" },
    { day: "Sat", mood: 5, emoji: "😄" },
    { day: "Sun", mood: 4, emoji: "😊" },
  ])

  const moods = [
    { value: 1, emoji: "😩", label: "Terrible" },
    { value: 2, emoji: "😔", label: "Bad" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 4, emoji: "😊", label: "Good" },
    { value: 5, emoji: "😄", label: "Great" },
  ]

  const logMood = (moodValue: number) => {
    const today = new Date().toLocaleDateString("en", { weekday: "short" })
    const moodEmoji = moods.find((m) => m.value === moodValue)?.emoji || "😐"

    setMoodData((prev) => {
      const updated = [...prev]
      const todayIndex = updated.findIndex((d) => d.day === today)
      if (todayIndex >= 0) {
        updated[todayIndex] = { day: today, mood: moodValue, emoji: moodEmoji }
      } else {
        updated.push({ day: today, mood: moodValue, emoji: moodEmoji })
      }
      return updated.slice(-7) // Keep only last 7 days
    })

    setSelectedMood(moodValue)

    // Reset selection after 2 seconds
    setTimeout(() => setSelectedMood(null), 2000)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 shadow-md">
          <p className="text-lg">{data.emoji}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{data.day}</p>
        </div>
      )
    }
    return null
  }

  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[1, 5]} hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="url(#colorMood)"
                strokeWidth={3}
                dot={{
                  stroke: "#8b5cf6",
                  strokeWidth: 2,
                  fill: "#ffffff",
                  r: 4,
                }}
                activeDot={{
                  stroke: "#8b5cf6",
                  strokeWidth: 2,
                  fill: "#8b5cf6",
                  r: 6,
                }}
              />
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Selection */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">How are you feeling today?</p>
          <div className="flex gap-2 justify-center">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                size="sm"
                onClick={() => logMood(mood.value)}
                className={`text-lg ${selectedMood === mood.value ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}`}
              >
                {mood.emoji}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Weekly Average</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-lg">😊</span>
              <span className="font-medium">{averageMood.toFixed(1)}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Trend</p>
            <p className="font-medium text-green-600 dark:text-green-400 mt-1">↗ Improving</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Best Day</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-lg">😄</span>
              <span className="font-medium">Thu</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
