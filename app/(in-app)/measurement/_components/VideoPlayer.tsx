'use client';

import { useState } from 'react';
import { PlayIcon, Volume2Icon, Maximize2Icon } from 'lucide-react';
interface VideoPlayerProps {
  source: string;
}
export default function VideoPlayer({ source }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary">
      <div className="bg-black aspect-video relative">
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="h-20 w-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <PlayIcon className="h-10 w-10 text-white fill-white ml-1" />
              </button>
            </div>

            <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent">
              <h3 className="text-white font-medium text-sm">Vertical Jump Technique</h3>
            </div>
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={source}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}

        {!isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2 flex items-center gap-2">
            <button className="text-white p-1 rounded-full hover:bg-white/20">
              <PlayIcon className="h-5 w-5" />
            </button>

            <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full w-[30%] bg-primary rounded-full"></div>
            </div>

            <div className="text-white text-xs">0:00 / 1:30</div>

            <button className="text-white p-1 rounded-full hover:bg-white/20">
              <Volume2Icon className="h-5 w-5" />
            </button>

            <button className="text-white p-1 rounded-full hover:bg-white/20">
              <Maximize2Icon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
