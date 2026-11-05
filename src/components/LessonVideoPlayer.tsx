import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Download, Film, Upload, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface LessonVideoPlayerProps {
  videoUrl: string;
  title: string;
  caption?: string;
  poster?: string;
}

export const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  videoUrl,
  title,
  caption,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentSrc, setCurrentSrc] = useState(videoUrl);
  const [isCustomVideo, setIsCustomVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrentSrc(videoUrl);
    setIsCustomVideo(false);
    setIsPlaying(false);
    setProgress(0);
  }, [videoUrl]);

  const togglePlay = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (Number(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = seekTime;
    setProgress(Number(e.target.value));
  };

  const handleRestart = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setCurrentSrc(objectUrl);
      setIsCustomVideo(true);
      sounds.playSuccess();
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-xl text-white text-right my-4">
      {/* Hidden file input for custom animated MP4 videos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/*"
        onChange={handleCustomFileUpload}
        className="hidden"
      />

      {/* Header Bar */}
      <div className="px-5 py-3 bg-slate-800/90 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-black text-amber-200">
            {title}
          </span>
          {isCustomVideo ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>فيديو كرتوني خاص مدمج</span>
            </span>
          ) : (
            <span className="text-[11px] font-black bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
              مشهد تعليمي مصور مع تعليق صوتي
            </span>
          )}
        </div>

        {/* Action Controls: Upload Custom MP4 or Download */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              fileInputRef.current?.click();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            title="اختر ملف فيديو كرتوني متحرك MP4 من جهازك"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>إدراج فيديو MP4 متحرك 🎬</span>
          </button>

          <a
            href={currentSrc}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            title="تحميل ملف الفيديو على جهازك"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل</span>
          </a>
        </div>
      </div>

      {/* HTML5 Video Display */}
      <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={currentSrc}
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlay}
          playsInline
        />

        {/* Play Overlay Button if paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-400/90 text-amber-950 flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-transform cursor-pointer"
            title="تشغيل العرض"
          >
            <Play className="w-8 h-8 fill-amber-950 translate-x-[-2px]" />
          </button>
        )}
      </div>

      {/* Controls Bar */}
      <div className="p-4 bg-slate-800/95 space-y-2">
        {/* Seek Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress}
          onChange={handleSeek}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white cursor-pointer"
              title="إعادة التشغيل من البداية"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white cursor-pointer"
              title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <button
            onClick={handleFullscreen}
            className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white cursor-pointer"
            title="ملء الشاشة"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Caption footer */}
      {caption && (
        <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 font-bold flex items-center justify-between">
          <span>{caption}</span>
          <span className="text-[11px] text-amber-300">
            يمكنك إدراج أي فيديو متحرك بصيغة MP4 من زر "إدراج فيديو MP4 متحرك" بأعلى المشغل.
          </span>
        </div>
      )}
    </div>
  );
};
