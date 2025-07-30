import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface QuizCardProps {
  name: string;
  duration: number;
  Icon?: LucideIcon; // ✅ Strong typing for Lucide icons
}

export function QuizCard({
  name,
  duration,
  Icon = FileText,
}: QuizCardProps) {
  return (
    <Card className="w-72 h-80 rounded-2xl shadow-lg cursor-pointer bg-purple-800/30 border border-purple-600 hover:shadow-fuchsia-700/40 hover:shadow-xl transition-transform hover:-translate-y-1 duration-300">
      <CardContent className="p-6 flex flex-col items-center justify-between h-full text-center text-white">
        {/* Icon */}
        <div className="bg-fuchsia-700/20 p-6 rounded-full border border-fuchsia-500 shadow-md">
          <Icon className="w-14 h-14 text-fuchsia-400" strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-indigo-100 mt-2 tracking-wide">
          {name}
        </h3>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-fuchsia-200 mt-4">
          <Clock className="w-4 h-4 text-fuchsia-400" />
          <span>{duration} min</span>
        </div>
      </CardContent>
    </Card>
  );
}
