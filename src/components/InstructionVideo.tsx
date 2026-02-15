import { useState } from 'react';
import { Clock, CheckCircle, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  { src: '/videos/instructie.mp4', label: 'Instructievideo 1' },
  { src: '/videos/instructie-2.mp4', label: 'Instructievideo 2' },
  { src: '/videos/instructie-3.mp4', label: 'Instructievideo 3' },
];

const resultPhotos = [
  { src: '/assets/resultaten/bus-belettering-1.jpg', alt: 'Busbelettering achterkant' },
  { src: '/assets/resultaten/bus-belettering-2.jpg', alt: 'Busbelettering zijkant' },
];

function VideoPlayer({ src, label }: { src: string; label: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gradient-to-br from-gray-900/80 to-gray-800/80">
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group cursor-pointer hover:from-gray-900/70 hover:to-gray-800/70 transition-all"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-2xl">
            <Play className="w-7 h-7 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
          </div>
          <span className="text-white font-bold text-base md:text-lg">{label}</span>
        </button>
      ) : (
        <video
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
          Je browser ondersteunt geen video.
        </video>
      )}
    </div>
  );
}

export function InstructionVideo() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const prevVideo = () => setCurrentVideo((i) => (i === 0 ? videos.length - 1 : i - 1));
  const nextVideo = () => setCurrentVideo((i) => (i === videos.length - 1 ? 0 : i + 1));

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
          {/* Video Player with navigation */}
          <div className="space-y-4">
            <VideoPlayer
              key={currentVideo}
              src={videos[currentVideo].src}
              label={videos[currentVideo].label}
            />

            {/* Video navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevVideo}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Vorige video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentVideo(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentVideo ? 'bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Video ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextVideo}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Volgende video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
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
                  <p className="font-medium">Plakinstructie bij elke bestelling</p>
                  <p className="text-sm opacity-80">Bij elke bestelling ontvang je een duidelijke stap-voor-stap handleiding.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result photos */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
            Resultaat in de praktijk
          </h3>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resultPhotos.map((photo) => (
              <div key={photo.src} className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
