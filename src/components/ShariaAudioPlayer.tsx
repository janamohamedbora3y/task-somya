import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ShariaAudioPlayerProps {
  audioUrl: string;
  title: string;
  subtitle?: string;
  badge?: string;
  autoPlay?: boolean;
}

export const ShariaAudioPlayer: React.FC<ShariaAudioPlayerProps> = ({
  audioUrl,
  title,
  subtitle,
  badge = 'تسجيل صوتي تعليمي',
  autoPlay = false,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:00');

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTimeStr('00:00');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (autoPlay) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [audioUrl, autoPlay]);

  const togglePlay = () => {
    sounds.playClick();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    }
  };

  const handleRestart = () => {
    sounds.playClick();
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const toggleMute = () => {
    sounds.playClick();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
    setCurrentTimeStr(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDurationStr(formatTime(audioRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekVal = Number(e.target.value);
    const duration = audioRef.current.duration || 1;
    audioRef.current.currentTime = (seekVal / 100) * duration;
    setProgress(seekVal);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-md space-y-3.5 my-3 text-right">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shadow-sm">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-black text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 inline-block mb-0.5">
              {badge}
            </span>
            <h4 className="text-sm sm:text-base font-black text-white leading-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="text-xs font-bold text-slate-300 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="text-xs font-mono font-bold text-emerald-300 bg-black/30 px-2.5 py-1 rounded-lg border border-emerald-500/30">
          {currentTimeStr} / {durationStr}
        </div>
      </div>

      {/* Progress Track */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress}
          onChange={handleSeek}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
      </div>

      {/* Controls Bar: Play / Pause, Restart, Mute */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-black text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-amber-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>إيقاف مؤقت</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>تشغيل الصوت 🔊</span>
              </>
            )}
          </button>

          {/* Restart Button */}
          <button
            type="button"
            onClick={handleRestart}
            title="إعادة تشغيل من البداية"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs cursor-pointer border border-white/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة</span>
          </button>

          {/* Download MP3 Button */}
          <a
            href={audioUrl}
            download
            target="_blank"
            rel="noreferrer"
            title="تحميل الملف الصوتي MP3"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white font-bold text-xs cursor-pointer border border-amber-300/30 transition-all active:scale-95"
          >
            <span>تحميل MP3 💾</span>
          </a>
        </div>

        {/* Volume / Mute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer border border-white/20 transition-colors"
          title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
