
import { Card } from "@/components/ui/card";

interface WheelSelectorProps {
  selected: string;
  onChange: (style: string) => void;
}

const wheelStyles = [
  { id: "standard", name: "Standard", description: "Classic alloy wheels" },
  { id: "sport", name: "Sport", description: "Performance 5-spoke" },
  { id: "chrome", name: "Chrome", description: "Luxury chrome finish" },
  { id: "offroad", name: "Off-Road", description: "Rugged terrain wheels" },
];

export default function WheelSelector({ selected, onChange }: WheelSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {wheelStyles.map((style) => (
        <Card
          key={style.id}
          onClick={() => onChange(style.id)}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selected === style.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="space-y-2">
            <div className="w-full aspect-square bg-muted rounded-md flex items-center justify-center">
              <div
                className={`w-12 h-12 rounded-full border-4 ${
                  style.id === "chrome"
                    ? "border-gray-400 bg-gray-300"
                    : style.id === "sport"
                    ? "border-gray-700 bg-gray-800"
                    : style.id === "offroad"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-500 bg-gray-600"
                }`}
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">{style.name}</h4>
              <p className="text-xs text-muted-foreground">{style.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}