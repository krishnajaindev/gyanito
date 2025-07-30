// src/components/QuizCard.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Clock, type LucideIcon } from "lucide-react";

// Define the properties the QuizCard component will accept
interface QuizCardProps {
  name: string;
  timeLimit: string;
  Icon: LucideIcon;
}

export function QuizCard({ name, timeLimit, Icon }: QuizCardProps) {
  return (
    <Card className="w-64 h-80 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-6 flex flex-col items-center justify-around h-full text-center">
        
        {/* Quiz Icon */}
        <div className="bg-primary/10 p-6 rounded-full">
          <Icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>

        {/* Quiz Name */}
        <h3 className="text-xl font-bold text-card-foreground">
          {name}
        </h3>

        {/* Time Limit */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{timeLimit}</span>
        </div>
        
      </CardContent>
    </Card>
  );
}
