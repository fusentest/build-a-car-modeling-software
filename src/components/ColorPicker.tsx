
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const presetColors = [
  { name: "Racing Red", value: "#ef4444" },
  { name: "Ocean Blue", value: "#3b82f6" },
  { name: "Midnight Black", value: "#1a1a1a" },
  { name: "Pearl White", value: "#f8f8f8" },
  { name: "Silver Metallic", value: "#9ca3af" },
  { name: "Forest Green", value: "#22c55e" },
  { name: "Sunset Orange", value: "#f97316" },
  { name: "Royal Purple", value: "#a855f7" },
  { name: "Gold", value: "#eab308" },
  { name: "Charcoal", value: "#404040" },
];

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className={`w-full aspect-square rounded-md border-2 transition-all hover:scale-110 ${
              color === preset.value
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
            style={{ backgroundColor: preset.value }}
            title={preset.name}
          />
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Custom Color</label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}