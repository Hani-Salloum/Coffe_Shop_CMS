import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function CountCard({ name, count }: { name: string, count: number }) {
  return (
    <Card className="!w-full !p-0 max-w-sm bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-black/5">
      <CardContent className="!p-0">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-light p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white/80">{ name }</p>
            <p className="text-3xl font-bold tracking-tight">{count}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
