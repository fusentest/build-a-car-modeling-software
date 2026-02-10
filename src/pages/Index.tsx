
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCw, 
  Palette, 
  Settings, 
  Car,
  Download,
  Share2
} from "lucide-react";
import CarCanvas from "@/components/CarCanvas";
import ColorPicker from "@/components/ColorPicker";
import WheelSelector from "@/components/WheelSelector";
import BodyTypeSelector from "@/components/BodyTypeSelector";

export default function Index() {
  const [carColor, setCarColor] = useState("#3b82f6");
  const [wheelStyle, setWheelStyle] = useState("sport");
  const [bodyType, setBodyType] = useState("sedan");
  const [rotation, setRotation] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CarForge Studio</h1>
                <p className="text-sm text-muted-foreground">Professional Car Modeling Software</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">3D Preview</h2>
                  <p className="text-sm text-muted-foreground">Rotate and customize your vehicle</p>
                </div>
                <Badge variant="secondary" className="gap-2">
                  <RotateCw className="w-3 h-3" />
                  Interactive View
                </Badge>
              </div>
              
              <CarCanvas 
                color={carColor}
                wheelStyle={wheelStyle}
                bodyType={bodyType}
                rotation={rotation}
              />
              
              {/* Rotation Control */}
              <div className="mt-6 space-y-2">
                <Label className="text-foreground">Camera Rotation</Label>
                <Slider
                  value={[rotation]}
                  onValueChange={(value) => setRotation(value[0])}
                  min={0}
                  max={360}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0°</span>
                  <span>{rotation}°</span>
                  <span>360°</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Customize</h2>
              </div>

              <Tabs defaultValue="color" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="color">
                    <Palette className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="wheels">Wheels</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                </TabsList>

                <TabsContent value="color" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-foreground mb-3 block">Body Color</Label>
                    <ColorPicker 
                      color={carColor}
                      onChange={setCarColor}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="wheels" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-foreground mb-3 block">Wheel Style</Label>
                    <WheelSelector
                      selected={wheelStyle}
                      onChange={setWheelStyle}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="body" className="space-y-4 mt-4">
                  <div>
                    <Label className="text-foreground mb-3 block">Body Type</Label>
                    <BodyTypeSelector
                      selected={bodyType}
                      onChange={setBodyType}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Body Type:</span>
                    <span className="text-foreground font-medium capitalize">{bodyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wheels:</span>
                    <span className="text-foreground font-medium capitalize">{wheelStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border border-border"
                        style={{ backgroundColor: carColor }}
                      />
                      <span className="text-foreground font-medium">{carColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}