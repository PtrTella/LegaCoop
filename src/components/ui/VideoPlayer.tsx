import React from 'react';
import { Card } from './Card';

interface VideoPlayerProps {
  content: string;
  className?: string;
}

export const VideoPlayer = ({ content, className = '' }: VideoPlayerProps) => {
  // Safe YouTube parser
  const getYouTubeId = (url: string) => {
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(ytRegex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(content);

  return (
    <Card 
      padding="p-0" 
      className={`overflow-hidden aspect-video border-border-subtle/50 group relative ${className}`}
    >
      {videoId ? (
        <div className="w-full h-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
            title="YouTube Video Player"
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative w-full h-full bg-surface-container-low">
          <video 
            src={content} 
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      )}
    </Card>
  );
};
