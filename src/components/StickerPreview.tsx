import { useState, useRef, useEffect, useCallback } from 'react';
import { Ruler, Palette, AlertTriangle } from 'lucide-react';

// px → cm conversion factor (roughly 96 DPI, 2.54 cm per inch)
const PX_TO_CM = 2.54 / 96;

// Maximum width in cm before showing warning
const MAX_WIDTH_CM = 100;

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

export interface StickerDimensions {
  widthCm: number;
  heightCm: number;
}

interface StickerPreviewProps {
  text: string;
  fontFamily: string;
  stickerColor: string;
  heightCm: number;
  className?: string;
  onDimensionsChange?: (dimensions: StickerDimensions) => void;
}

export function StickerPreview({ 
  text, 
  fontFamily, 
  stickerColor, 
  heightCm,
  className = '',
  onDimensionsChange
}: StickerPreviewProps) {
  const [backgroundColor, setBackgroundColor] = useState('#E5E7EB');
  const [customColor, setCustomColor] = useState('#E5E7EB');
  const [dimensions, setDimensions] = useState<StickerDimensions>({ widthCm: 0, heightCm: 0 });
  const textRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate font size to achieve approximate height
  const baseFontSize = 100; // Base font size for measurement
  
  // Measure and calculate dimensions
  const measureText = useCallback(() => {
    if (textRef.current && text.trim()) {
      try {
        const bbox = textRef.current.getBBox();
        if (bbox.width > 0 && bbox.height > 0) {
          // Scale factor: we want the text to be heightCm tall
          // bbox.height is in SVG units (baseFontSize), so we calculate the ratio
          const scaleFactor = heightCm / (bbox.height * PX_TO_CM);
          
          // Calculate actual width based on the scaled height
          const widthCm = bbox.width * PX_TO_CM * scaleFactor;
          
          const newDimensions = {
            widthCm: Math.round(widthCm * 10) / 10,
            heightCm: heightCm,
          };
          
          setDimensions(newDimensions);
          onDimensionsChange?.(newDimensions);
        }
      } catch (e) {
        // getBBox can throw if element is not rendered
      }
    } else {
      const zeroDimensions = { widthCm: 0, heightCm: 0 };
      setDimensions(zeroDimensions);
      onDimensionsChange?.(zeroDimensions);
    }
  }, [text, heightCm, onDimensionsChange]);

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
  const isTooWide = dimensions.widthCm > MAX_WIDTH_CM;

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
        className={`relative rounded-xl overflow-hidden transition-colors duration-200 min-h-[200px] flex items-center justify-center ${
          isTooWide ? 'ring-2 ring-destructive/50' : ''
        }`}
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
        {hasText && dimensions.widthCm > 0 && (
          <div className={`absolute bottom-3 right-3 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border ${
            isTooWide 
              ? 'bg-destructive/90 border-destructive text-destructive-foreground' 
              : 'bg-background/90 border-border'
          }`}>
            <div className="flex items-center gap-2 text-sm">
              <Ruler className={`w-4 h-4 ${isTooWide ? '' : 'text-primary'}`} />
              <span className="font-medium">
                {dimensions.widthCm} × {dimensions.heightCm} cm
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Width Warning */}
      {isTooWide && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Let op:</strong> De breedte ({dimensions.widthCm} cm) overschrijdt de maximale breedte van {MAX_WIDTH_CM} cm. 
            Probeer kortere tekst of een kleiner lettertype.
          </span>
        </div>
      )}

      {/* Info text */}
      {hasText && !isTooWide && (
        <p className="text-xs text-muted-foreground text-center">
          Afmetingen bij een hoogte van <span className="font-medium">{heightCm} cm</span>. 
          De exacte afmetingen kunnen licht afwijken.
        </p>
      )}
    </div>
  );
}
