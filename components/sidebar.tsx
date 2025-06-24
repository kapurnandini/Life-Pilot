"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Cloud,
  Droplets,
  Quote,
  CheckSquare,
  Home,
  Calendar,
  BookOpen,
  Zap,
  Settings,
  User,
  LogOut,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [waterGlasses, setWaterGlasses] = useState(4)
  const [habits, setHabits] = useState({
    meditation: 3,
    exercise: 1,
    reading: 5,
  })
  const pathname = usePathname()

  const addWaterGlass = () => {
    if (waterGlasses < 8) {
      setWaterGlasses((prev) => prev + 1)
    }
  }

  const quotes = [
    {
      text: "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one.",
      author: "Mark Twain",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
  ]

  const [currentQuote] = useState(quotes[0])

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Automations", path: "/dashboard/automations", icon: Zap },
    { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
    { name: "Journal", path: "/dashboard/journal", icon: BookOpen },
  ]

  const profileItems = [
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Settings */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">User</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="flex flex-col space-y-1">
            {profileItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant={pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start hover:bg-slate-100 dark:hover:bg-slate-800">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Weather Widget */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Cloud className="h-4 w-4 text-cyan-500" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">72°F</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sunny</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Later Today</p>
              <p className="text-sm font-medium">Rain at 4PM</p>
              <p className="text-xs text-cyan-600 dark:text-cyan-400">Bring an umbrella!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Quote */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Quote className="h-4 w-4 text-purple-500" />
            Daily Quote
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic">"{currentQuote.text}"</p>
          <p className="text-xs text-right mt-2 text-slate-500 dark:text-slate-400">— {currentQuote.author}</p>
        </CardContent>
      </Card>

      {/* Micro Habit Tracker */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-500" />
            Habit Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">Hydration</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{waterGlasses}/8 glasses</p>
            </div>
            <Progress value={(waterGlasses / 8) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">Meditation</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{habits.meditation} day streak</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${
                    day <= habits.meditation
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">Exercise</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{habits.exercise} day streak</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${
                    day <= habits.exercise
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium">Reading</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{habits.reading} day streak</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${
                    day <= habits.reading
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              Suggested: Try adding a{" "}
              <span className="text-purple-600 dark:text-purple-400 font-medium">stretching</span> habit
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hydration Widget */}
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Droplets className="h-4 w-4 text-cyan-500" />
            Hydration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((glass) => (
              <button
                key={glass}
                onClick={addWaterGlass}
                className={`h-8 w-4 rounded-full border transition-colors ${
                  glass <= waterGlasses
                    ? "bg-cyan-500/80 border-cyan-600"
                    : "bg-transparent border-slate-300 dark:border-slate-600 hover:border-cyan-400"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">Tap to add a glass of water</p>
          {waterGlasses >= 8 && (
            <p className="text-xs text-center text-cyan-600 dark:text-cyan-400 mt-1 font-medium">
              🎉 Daily goal achieved!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
