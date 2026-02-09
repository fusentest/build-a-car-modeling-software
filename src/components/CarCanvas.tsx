
import { useEffect, useRef } from "react";

interface CarCanvasProps {
  color: string;
  wheelStyle: string;
  bodyType: string;
  rotation: number;
}

export default function CarCanvas({ color, wheelStyle, bodyType, rotation }: CarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;

    // Apply rotation
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    // Draw car based on body type
    drawCar(ctx, centerX, centerY, color, wheelStyle, bodyType);

    ctx.restore();
  }, [color, wheelStyle, bodyType, rotation]);

  const drawCar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    wheelStyle: string,
    bodyType: string
  ) => {
    const scale = bodyType === "suv" ? 1.2 : bodyType === "sports" ? 0.9 : 1;
    const width = 300 * scale;
    const height = 120 * scale;

    // Shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;

    // Car body
    ctx.fillStyle = color;
    ctx.beginPath();
    
    if (bodyType === "sports") {
      // Sports car - sleek and low
      ctx.moveTo(x - width / 2 + 40, y + 20);
      ctx.lineTo(x - width / 2 + 60, y - 30);
      ctx.lineTo(x - width / 2 + 120, y - 40);
      ctx.lineTo(x + width / 2 - 80, y - 40);
      ctx.lineTo(x + width / 2 - 40, y - 30);
      ctx.lineTo(x + width / 2 - 20, y + 20);
      ctx.quadraticCurveTo(x + width / 2, y + 30, x + width / 2 - 10, y + 40);
      ctx.lineTo(x - width / 2 + 10, y + 40);
      ctx.quadraticCurveTo(x - width / 2, y + 30, x - width / 2 + 40, y + 20);
    } else if (bodyType === "suv") {
      // SUV - tall and boxy
      ctx.moveTo(x - width / 2 + 30, y + 30);
      ctx.lineTo(x - width / 2 + 50, y - 40);
      ctx.lineTo(x + width / 2 - 50, y - 40);
      ctx.lineTo(x + width / 2 - 30, y + 30);
      ctx.lineTo(x + width / 2, y + 40);
      ctx.lineTo(x - width / 2, y + 40);
      ctx.closePath();
    } else {
      // Sedan - balanced
      ctx.moveTo(x - width / 2 + 40, y + 20);
      ctx.lineTo(x - width / 2 + 70, y - 30);
      ctx.lineTo(x + width / 2 - 70, y - 30);
      ctx.lineTo(x + width / 2 - 40, y + 20);
      ctx.lineTo(x + width / 2, y + 40);
      ctx.lineTo(x - width / 2, y + 40);
      ctx.closePath();
    }
    
    ctx.fill();

    // Add shine effect
    ctx.shadowColor = "transparent";
    const gradient = ctx.createLinearGradient(x, y - 40, x, y + 40);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Windows
    ctx.fillStyle = "rgba(100, 150, 200, 0.6)";
    ctx.beginPath();
    if (bodyType === "sports") {
      ctx.moveTo(x - width / 2 + 80, y - 25);
      ctx.lineTo(x - width / 2 + 100, y - 35);
      ctx.lineTo(x + width / 2 - 100, y - 35);
      ctx.lineTo(x + width / 2 - 80, y - 25);
      ctx.closePath();
    } else if (bodyType === "suv") {
      ctx.rect(x - width / 2 + 60, y - 35, width - 120, 30);
    } else {
      ctx.moveTo(x - width / 2 + 80, y - 20);
      ctx.lineTo(x - width / 2 + 90, y - 25);
      ctx.lineTo(x + width / 2 - 90, y - 25);
      ctx.lineTo(x + width / 2 - 80, y - 20);
      ctx.closePath();
    }
    ctx.fill();

    // Wheels
    const wheelY = y + 40;
    const wheelRadius = wheelStyle === "sport" ? 25 : wheelStyle === "offroad" ? 30 : 22;
    
    drawWheel(ctx, x - width / 2 + 60, wheelY, wheelRadius, wheelStyle);
    drawWheel(ctx, x + width / 2 - 60, wheelY, wheelRadius, wheelStyle);
  };

  const drawWheel = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    style: string
  ) => {
    // Tire
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Rim
    ctx.fillStyle = style === "chrome" ? "#c0c0c0" : "#2a2a2a";
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Spokes
    ctx.strokeStyle = style === "chrome" ? "#e0e0e0" : "#404040";
    ctx.lineWidth = 2;
    const spokes = style === "sport" ? 5 : style === "offroad" ? 6 : 8;
    
    for (let i = 0; i < spokes; i++) {
      const angle = (i * Math.PI * 2) / spokes;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(angle) * radius * 0.5,
        y + Math.sin(angle) * radius * 0.5
      );
      ctx.stroke();
    }

    // Center cap
    ctx.fillStyle = style === "chrome" ? "#f0f0f0" : "#505050";
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="relative w-full aspect-video bg-gradient-to-b from-muted/30 to-muted/10 rounded-lg overflow-hidden border border-border">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "auto" }}
      />
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-md border border-border">
        Use the slider below to rotate the view
      </div>
    </div>
  );
}