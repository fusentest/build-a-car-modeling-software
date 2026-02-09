
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";

interface BodyTypeSelectorProps {
  selected: string;
  onChange: (type: string) => void;
}

const bodyTypes = [
  { id: "sedan", name: "Sedan", description: "Classic 4-door design" },
  { id: "suv", name: "SUV", description: "Spacious utility vehicle" },
  { id: "sports", name: "Sports", description: "High-performance coupe" },
];

export default function BodyTypeSelector({ selected, onChange }: BodyTypeSelectorProps) {
  return (
    <div className="space-y-3">
      {bodyTypes.map((type) => (
        <Card
          key={type.id}
          onClick={() => onChange(type.id)}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selected === type.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "border-border hover:border-primary/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Car className="w-6 h-6 text-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground">{type.name}</h4>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}