import { useState, useRef, useEffect, useCallback } from 'react';
import { Ruler, Palette, Image, Car, Store, Ship } from 'lucide-react';

// Mockup backgrounds
const MOCKUP_PRESETS = [
  { id: 'auto', src: '/assets/mockups/auto-belettering.png', name: 'Auto', icon: '🚗' },
  { id: 'etalage', src: '/assets/mockups/etalage-belettering.png', name: 'Etalage', icon: '🏪' },
  { id: 'boot', src: '/assets/mockups/boot-belettering.png', name: 'Boot', icon: '⛵' },
  { id: 'interieur', src: '/assets/mockups/interieur-belettering.png', name: 'Interieur', icon: '🏢' },
];

// Size references with common objects (heights in cm)
const SIZE_REFERENCES = [
  { maxHeight: 3, icon: '🪙', name: '€2 munt', size: 2.6, description: 'Ongeveer zo hoog als een €2 munt' },
  { maxHeight: 6, icon: '💳', name: 'Bankpas', size: 5.4, description: 'Ongeveer zo hoog als een bankpas' },
  { maxHeight: 10, icon: '🖐️', name: 'Handpalm', size: 8, description: 'Past in je handpalm' },
  { maxHeight: 16, icon: '📱', name: 'Smartphone', size: 15, description: 'Ongeveer zo hoog als een smartphone' },
  { maxHeight: 22, icon: '📏', name: 'A5 papier', size: 21, description: 'Ongeveer zo hoog als een A5 blad' },
  { maxHeight: 30, icon: '📄', name: 'A4 papier', size: 29.7, description: 'Ongeveer zo hoog als een A4 blad' },
];

function getSizeReference(heightCm: number) {
  return SIZE_REFERENCES.find(ref => heightCm <= ref.maxHeight) || SIZE_REFERENCES[SIZE_REFERENCES.length - 1];
}

// px → cm conversion factor (roughly 96 DPI, 2.54 cm per inch)
const PX_TO_CM = 2.54 / 96;

// No maximum width limit

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
  const [previewMode, setPreviewMode] = useState<'color' | 'mockup'>('color');
  const [selectedMockup, setSelectedMockup] = useState(MOCKUP_PRESETS[0]);
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

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview Mode Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setPreviewMode('color')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            previewMode === 'color'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Palette className="w-4 h-4" />
          Kleur
        </button>
        <button
          onClick={() => setPreviewMode('mockup')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            previewMode === 'mockup'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Image className="w-4 h-4" />
          Mockup
        </button>
      </div>

      {/* Background Selector based on mode */}
      {previewMode === 'color' ? (
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Palette className="w-4 h-4" />
            Achtergrondkleur
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
      ) : (
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Image className="w-4 h-4" />
            Kies een mockup
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MOCKUP_PRESETS.map((mockup) => (
              <button
                key={mockup.id}
                onClick={() => setSelectedMockup(mockup)}
                className={`relative overflow-hidden rounded-lg border-2 transition-all aspect-video ${
                  selectedMockup.id === mockup.id
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <img
                  src={mockup.src}
                  alt={mockup.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <span className="text-white text-xs font-medium flex items-center gap-1">
                    {mockup.icon} {mockup.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden transition-colors duration-200 min-h-[200px] flex items-center justify-center"
        style={previewMode === 'color' ? { backgroundColor } : {}}
      >
        {/* Mockup background image */}
        {previewMode === 'mockup' && (
          <img
            src={selectedMockup.src}
            alt={selectedMockup.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {hasText ? (
          <svg
            className={`w-full h-auto max-h-[300px] ${previewMode === 'mockup' ? 'relative z-10' : ''}`}
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
                // Add shadow for better visibility on mockups and for white text
                filter: previewMode === 'mockup' || stickerColor.toLowerCase() === '#ffffff' || stickerColor.toLowerCase() === 'white'
                  ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
                  : 'none',
              }}
            >
              {text}
            </text>
          </svg>
        ) : (
          <p className={`italic ${previewMode === 'mockup' ? 'relative z-10 text-white bg-black/50 px-4 py-2 rounded-lg' : 'text-muted-foreground'}`}>
            Typ je tekst om een preview te zien
          </p>
        )}

        {/* Dimensions Badge */}
        {hasText && dimensions.widthCm > 0 && (
          <div className="absolute bottom-3 right-3 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border bg-background/90 border-border">
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {dimensions.widthCm} × {dimensions.heightCm} cm
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Size Reference */}
      {hasText && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getSizeReference(heightCm).icon}</span>
            <div>
              <p className="font-medium text-foreground">
                {getSizeReference(heightCm).description}
              </p>
              <p className="text-sm text-muted-foreground">
                Letterhoogte: {heightCm} cm · Vergelijk: {getSizeReference(heightCm).name} ({getSizeReference(heightCm).size} cm)
              </p>
            </div>
          </div>

          {/* Visual scale bar */}
          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Schaal vergelijking</span>
              <span>{heightCm} cm</span>
            </div>
            <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
              {/* Reference object bar */}
              <div
                className="absolute top-0 left-0 h-4 bg-muted-foreground/20 rounded-t-lg flex items-center justify-end pr-2"
                style={{ width: `${Math.min((getSizeReference(heightCm).size / 30) * 100, 100)}%` }}
              >
                <span className="text-[10px] text-muted-foreground">{getSizeReference(heightCm).name}</span>
              </div>
              {/* Your letters bar */}
              <div
                className="absolute bottom-0 left-0 h-4 bg-primary rounded-b-lg flex items-center justify-end pr-2"
                style={{ width: `${Math.min((heightCm / 30) * 100, 100)}%` }}
              >
                <span className="text-[10px] text-primary-foreground font-medium">Jouw letters</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info text */}
      {hasText && (
        <p className="text-xs text-muted-foreground text-center">
          De exacte afmetingen kunnen licht afwijken afhankelijk van het lettertype.
        </p>
      )}
    </div>
  );
}
