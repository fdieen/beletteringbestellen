import { useState, useRef, useEffect, useCallback } from 'react';
import { Ruler, Palette } from 'lucide-react';

// px → cm conversion factor (roughly 96 DPI, 2.54 cm per inch)
const PX_TO_CM = 2.54 / 96;

// Preset background colors for preview
const BACKGROUND_PRESETS = [
  { id: 'white', color: '#FFFFFF', name: 'Wit' },
  { id: 'lightgray', color: '#E5E7EB', name: 'Lichtgrijs' },
  { id: 'darkgray', color: '#4B5563', name: 'Donkergrijs' },
  { id: 'black', color: '#111827', name: 'Zwart' },
  { id: 'wood', color: '#D4A574', name: 'Hout' },
  { id: 'blue', color: '#3B82F6', name: 'Blauw' },
  { id: 'red', color: '#EF4444', name: 'Rood' },
  { id: 'green', color: '#22C55E', name: 'Groen' },
];

interface StickerPreviewProps {
  text: string;
  fontFamily: string;
  stickerColor: string;
  heightCm: number;
  className?: string;
}

export function StickerPreview({ 
  text, 
  fontFamily, 
  stickerColor, 
  heightCm,
  className = '' 
}: StickerPreviewProps) {
  const [backgroundColor, setBackgroundColor] = useState('#E5E7EB');
  const [customColor, setCustomColor] = useState('#E5E7EB');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate font size to achieve approximate height
  const baseFontSize = 100; // Base font size for measurement
  const targetHeightPx = heightCm / PX_TO_CM;
  
  // Measure and calculate dimensions
  const measureText = useCallback(() => {
    if (textRef.current && text.trim()) {
      try {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          // Convert px to cm
          const widthCm = bbox.width * PX_TO_CM;
          const heightCmActual = bbox.height * PX_TO_CM;
          
          setDimensions({
            width: Math.round(widthCm * 10) / 10,
            height: Math.round(heightCmActual * 10) / 10,
          });
        }
      } catch (e) {
        // getBBox can throw if element is not rendered
      }
    } else {
      setDimensions({ width: 0, height: 0 });
    }
  }, [text]);

  useEffect(() => {
    // Small delay to ensure font is loaded and rendered
    const timer = setTimeout(measureText, 50);
    return () => clearTimeout(timer);
  }, [text, fontFamily, heightCm, measureText]);

  const handlePresetClick = (color: string) => {
    setBackgroundColor(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    setBackgroundColor(color);
  };

  const hasText = text.trim().length > 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Background Color Selector */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
          <Palette className="w-4 h-4" />
          Preview achtergrond
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {BACKGROUND_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all ${
                backgroundColor === preset.color
                  ? 'border-primary ring-2 ring-primary/30 scale-110'
                  : 'border-border hover:scale-105'
              }`}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
              aria-label={`Achtergrondkleur: ${preset.name}`}
            />
          ))}
          {/* Custom color picker */}
          <div className="relative">
            <input
              type="color"
              value={customColor}
              onChange={handleCustomColorChange}
              className="w-8 h-8 rounded-lg cursor-pointer border-2 border-border hover:scale-105 transition-all"
              title="Kies een kleur"
              aria-label="Aangepaste achtergrondkleur"
            />
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden transition-colors duration-200 min-h-[200px] flex items-center justify-center"
        style={{ backgroundColor }}
      >
        {hasText ? (
          <svg
            className="w-full h-auto max-h-[300px]"
            viewBox="0 0 600 200"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              ref={textRef}
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily,
                fontSize: `${baseFontSize}px`,
                fill: stickerColor,
                // Add subtle shadow for white text visibility
                filter: stickerColor.toLowerCase() === '#ffffff' || stickerColor.toLowerCase() === 'white' 
                  ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' 
                  : 'none',
              }}
            >
              {text}
            </text>
          </svg>
        ) : (
          <p className="text-muted-foreground italic">
            Typ je tekst om een preview te zien
          </p>
        )}

        {/* Dimensions Badge */}
        {hasText && dimensions.width > 0 && (
          <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-border">
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="font-medium text-foreground">
                {dimensions.width} × {dimensions.height} cm
              </span>
              <span className="text-xs text-muted-foreground">(indicatief)</span>
            </div>
          </div>
        )}
      </div>

      {/* Info text */}
      {hasText && (
        <p className="text-xs text-muted-foreground text-center">
          De afmetingen zijn gebaseerd op een hoogte van <span className="font-medium">{heightCm} cm</span>. 
          De exacte afmetingen kunnen licht afwijken.
        </p>
      )}
    </div>
  );
}
