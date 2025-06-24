import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { AutomationsHub } from "@/components/automations-hub"

export default function AutomationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <AutomationsHub />
        </div>
        <div className="w-full md:w-1/4">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
