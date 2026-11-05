import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Download, Music2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface QuranAudioPlayerProps {
  audioUrl: string;
  surahName: string;
  reciterName?: string;
  ayahRange?: string;
}

export const QuranAudioPlayer: React.FC<QuranAudioPlayerProps> = ({
  audioUrl,
  surahName,
  reciterName = 'الشيخ مشاري راشد العفاسي',
  ayahRange = 'كامل السورة بتلاوة مرتلة خاشعة',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:00');

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    sounds.playClick();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
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
    const seekTime = (Number(e.target.value) / 100) * (audioRef.current.duration || 1);
    audioRef.current.currentTime = seekTime;
    setProgress(Number(e.target.value));
  };

  const handleRestart = () => {
    sounds.playClick();
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-900 text-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-xl space-y-4 my-4 text-right">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-700/80 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-xl shadow-md shrink-0">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-amber-300">{surahName}</span>
              <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded-full text-emerald-100 font-bold">
                تلاوة قرآنية حقيقية
              </span>
            </div>
            <span className="text-xs text-slate-300 font-bold block mt-0.5">
              بصوت: <span className="text-white font-black">{reciterName}</span> · {ayahRange}
            </span>
          </div>
        </div>

        {/* Download MP3 Button */}
        <a
          href={audioUrl}
          download
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          title="تحميل ملف التلاوة MP3"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تحميل التلاوة MP3</span>
        </a>
      </div>

      {/* Progress & Seek */}
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
        <div className="flex items-center justify-between text-[11px] font-black text-emerald-200 tabular-nums">
          <span>{currentTimeStr}</span>
          <span>{durationStr}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 flex items-center justify-center font-black shadow-md cursor-pointer transition-transform hover:scale-105"
            title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل التلاوة'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-amber-950" /> : <Play className="w-5 h-5 fill-amber-950 translate-x-[-1px]" />}
          </button>

          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white cursor-pointer"
            title="إعادة التلاوة من البداية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <a
            href={audioUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/40 text-amber-200 hover:text-white cursor-pointer transition-colors"
            title="تحميل ملف التلاوة MP3"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={audioUrl}
            download
            className="text-[11px] text-amber-300 hover:text-white font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-700/50"
          >
            <Download className="w-3 h-3" />
            <span>تحميل MP3</span>
          </a>
          <span className="text-xs text-amber-200 font-bold hidden sm:flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>استمع بخشوع</span>
          </span>
        </div>
      </div>
    </div>
  );
};
