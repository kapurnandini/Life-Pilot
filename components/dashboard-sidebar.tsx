"use client"

import { usePathname, useRouter } from "next/navigation"
import { Bot, Home, Zap, Calendar, BookOpen, Settings, User, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Automations", path: "/dashboard/automations", icon: Zap },
    { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
    { name: "Journal", path: "/dashboard/journal", icon: BookOpen },
  ]

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Bot className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            LifePilot
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.name}>
                <button onClick={() => router.push(item.path)}>
                  <item.icon />
                  <span>{item.name}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"} tooltip="Profile">
              <button onClick={() => router.push("/dashboard/profile")}>
                <User />
                <span>Profile</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
              <button onClick={() => router.push("/dashboard/settings")}>
                <Settings />
                <span>Settings</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <button onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
