"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Bot,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Calendar,
  BookOpen,
  Play,
  Laptop,
  BarChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "AI-Powered Smart Planner",
      description:
        "Just type 'I have a quiz next Wednesday' and watch LifePilot create your entire study plan automatically.",
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-500" />,
      title: "Auto-Life Optimizer",
      description: "Learns your routine and builds the perfect day plan. Never miss a meal, break, or power nap again.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      title: "Smart Calendar Sync",
      description: "Seamlessly integrates with Google Calendar and suggests optimal scheduling based on your patterns.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      title: "Emotion-Aware Journal",
      description: "Track your mood with AI sentiment analysis and get personalized mental health suggestions.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      content:
        "LifePilot transformed my chaotic schedule into a well-organized masterpiece. My GPA went from 3.2 to 3.8!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Pre-Med Student",
      content:
        "The AI suggestions are incredible. It knows when I need breaks better than I do. Game changer for MCAT prep!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Business Major",
      content:
        "Finally, a productivity app that actually understands student life. The mood tracking helped me through finals week.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                LifePilot
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="hover:text-cyan-400 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                Pricing
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30">🚀 Now with AI-Powered Automations</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Your AI Co-Pilot for
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Chaotic Lives
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              LifePilot automates the boring stuff, organizes the messy stuff, and helps you be your best self every day
              — even when you're overwhelmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-lg px-8 py-4"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                // variant="outline"
                className="bg-indigo-500 border-blue/30 text-white hover:bg-white/10 text-lg px-8 py-4"
                // className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              ✨ No credit card required • 🎓 Free for students • 🚀 Setup in 2 minutes
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Students Love LifePilot</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built specifically for the chaos of student life. No more juggling 10 different apps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/15 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section - Replacing Video */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How LifePilot Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform transforms how students manage their academic and personal lives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <Laptop className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-white text-center">1. Input Your Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Simply tell LifePilot what's on your mind. "I have a physics exam on Friday and two assignments due
                  next week."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-md overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-full">
                    <Brain className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>
                <CardTitle className="text-white text-center">2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Our AI analyzes your tasks, schedule, and past productivity patterns to create an optimized plan.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-md overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <BarChart className="h-8 w-8 text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-white text-center">3. Smart Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Get a perfectly organized schedule with study blocks, reminders, and breaks optimized for your
                  productivity.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                Try It Yourself
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved by 10,000+ Students</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of students who've transformed their productivity with LifePilot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-300 text-base">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Student-Friendly Pricing</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Free</CardTitle>
                <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">
                  $0<span className="text-lg text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Basic AI planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Calendar sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Basic Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Mood tracking</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-600 to-purple-600 border-cyan-400/50 backdrop-blur-md relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white text-2xl">Pro</CardTitle>
                <CardDescription className="text-gray-300">For serious students</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">
                  $9<span className="text-lg text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Advanced AI automations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Smart suggestions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Team</CardTitle>
                <CardDescription className="text-gray-300">For study groups</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">
                  $19<span className="text-lg text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Shared calendars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">Group analytics</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                    Start Team Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/50 to-purple-900/50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Life?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of students who've already discovered the power of AI-driven productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-lg px-8 py-4"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              // variant="outline"
              className="bg-indigo-500 border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Bot className="h-6 w-6 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                LifePilot
              </span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400">
            <p>&copy; 2025 LifePilot. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
