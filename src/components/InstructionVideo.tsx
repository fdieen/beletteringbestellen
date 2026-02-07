import { useState } from 'react';
import { Clock, CheckCircle, Play } from 'lucide-react';

export function InstructionVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section id="instructie" className="py-16 md:py-24 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Zo breng je plakletters aan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            In een paar simpele stappen zit je belettering perfect op je auto, raam of boot.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group cursor-pointer bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:from-gray-900/70 hover:to-gray-800/70 transition-all"
                >
                  <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                  <span className="text-white font-bold text-lg">Bekijk instructievideo</span>
                  <span className="text-white/70 text-sm">2 minuten</span>
                </button>
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/instructie.mp4" type="video/mp4" />
                  Je browser ondersteunt geen video.
                </video>
              )}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Aanbrengen duurt ongeveer 10-15 minuten</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Maak het oppervlak schoon',
                  description: 'Gebruik een vetvrije reiniger. Het oppervlak moet droog en stofvrij zijn.',
                },
                {
                  step: 2,
                  title: 'Positioneer de letters',
                  description: 'Gebruik afplaktape om de letters op de juiste plek te houden voordat je plakt.',
                },
                {
                  step: 3,
                  title: 'Breng de letters aan',
                  description: 'Verwijder de achterkant en wrijf met een rakel van binnen naar buiten.',
                },
                {
                  step: 4,
                  title: 'Verwijder de transfertape',
                  description: 'Trek de transparante tape er langzaam af onder een scherpe hoek.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3 bg-success/10 text-success rounded-xl p-4">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Gratis rakel bij elke bestelling</p>
                  <p className="text-sm opacity-80">Wij leveren een rakel mee zodat je direct aan de slag kunt.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
