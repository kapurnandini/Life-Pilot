"use client"

import { useState } from "react"
import { Send, Brain, TrendingUp, Calendar, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

type MoodData = {
  day: string
  mood: number
  sleep: number
  productivity: number
  date: string
}

type JournalEntry = {
  id: string
  date: string
  content: string
  mood: number
  aiAnalysis?: string
}

export function JournalView() {
  const [journalEntry, setJournalEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      date: "2025-06-09",
      content:
        "Had a great day today! Finished my physics assignment early and went for a walk. Feeling really productive and positive.",
      mood: 5,
      aiAnalysis:
        "Your entry shows high positivity and accomplishment. You mentioned productivity and physical activity - both great for mental health!",
    },
    {
      id: "2",
      date: "2025-06-08",
      content:
        "Struggling with calculus homework today. Feeling overwhelmed with all the assignments piling up. Need to find a better study strategy.",
      mood: 2,
      aiAnalysis:
        "I notice you're feeling overwhelmed. Consider breaking large tasks into smaller chunks and using the Pomodoro technique for better focus.",
    },
  ])

  const moods = [
    { value: 1, emoji: "😩", label: "Terrible" },
    { value: 2, emoji: "😔", label: "Bad" },
    { value: 3, emoji: "😐", label: "Okay" },
    { value: 4, emoji: "😊", label: "Good" },
    { value: 5, emoji: "😄", label: "Great" },
  ]

  // Sample mood data for the chart
  const moodData: MoodData[] = [
    { day: "Mon", mood: 3, sleep: 6, productivity: 7, date: "2025-06-03" },
    { day: "Tue", mood: 2, sleep: 5, productivity: 5, date: "2025-06-04" },
    { day: "Wed", mood: 4, sleep: 7, productivity: 8, date: "2025-06-05" },
    { day: "Thu", mood: 5, sleep: 8, productivity: 9, date: "2025-06-06" },
    { day: "Fri", mood: 4, sleep: 7, productivity: 8, date: "2025-06-07" },
    { day: "Sat", mood: 5, sleep: 9, productivity: 7, date: "2025-06-08" },
    { day: "Sun", mood: 4, sleep: 8, productivity: 6, date: "2025-06-09" },
  ]

  const analyzeEntry = () => {
    if (!journalEntry.trim() || selectedMood === null) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const analyses = [
        "Your entry shows a balanced emotional state. I notice themes of growth and reflection. Consider celebrating small wins!",
        "I detect some stress patterns in your writing. Remember to practice self-compassion and take breaks when needed.",
        "Great positivity in today's entry! Your mindset seems focused on solutions rather than problems - that's excellent for mental resilience.",
        "I sense some uncertainty in your thoughts. This is completely normal. Try journaling about specific goals to gain clarity.",
        "Your entry reflects strong self-awareness. You're doing great at recognizing your emotions and patterns.",
      ]

      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        content: journalEntry,
        mood: selectedMood,
        aiAnalysis: analyses[Math.floor(Math.random() * analyses.length)],
      }

      setEntries((prev) => [newEntry, ...prev])
      setJournalEntry("")
      setSelectedMood(null)
      setIsAnalyzing(false)
    }, 2000)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-purple-600 dark:text-purple-400">Mood: {payload[0]?.value}</p>
          <p className="text-blue-600 dark:text-blue-400">Sleep: {payload[1]?.value}h</p>
          <p className="text-green-600 dark:text-green-400">Productivity: {payload[2]?.value}/10</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Journal & Mood Tracking</h1>
        <p className="text-muted-foreground mt-1">Reflect on your day and track your emotional wellbeing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Journal Entry */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Daily Journal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">How are you feeling today?</label>
              <div className="flex gap-2 justify-center mb-4">
                {moods.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`text-lg ${selectedMood === mood.value ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}`}
                  >
                    {mood.emoji}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">What's on your mind?</label>
              <Textarea
                placeholder="Write about your day, thoughts, feelings, or anything that comes to mind..."
                className="min-h-32 resize-none"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
              />
            </div>

            <Button
              onClick={analyzeEntry}
              disabled={!journalEntry.trim() || selectedMood === null || isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Mood Analytics */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              Wellness Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis domain={[0, 10]} hide={true} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="url(#colorMood)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="sleep"
                    stackId="2"
                    stroke="#06b6d4"
                    fill="url(#colorSleep)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="productivity"
                    stackId="3"
                    stroke="#10b981"
                    fill="url(#colorProductivity)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorProductivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Avg Mood</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">4.1</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Avg Sleep</p>
                <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">7.1h</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Productivity</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">7.1/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-500" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{moods.find((m) => m.value === entry.mood)?.emoji}</span>
                    <span className="text-sm font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {moods.find((m) => m.value === entry.mood)?.label}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{entry.content}</p>
                {entry.aiAnalysis && (
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-900/20 dark:to-cyan-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-purple-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-purple-700 dark:text-purple-300">AI Insights</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">{entry.aiAnalysis}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
