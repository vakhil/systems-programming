import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Minimize2,
  FastForward,
  Rewind,
  List,
  Sparkles,
  Terminal,
  Cpu,
  Code2,
  Activity,
  Layers,
  Tv,
  Mic,
  Headphones,
  ExternalLink,
  Info,
  Film
} from 'lucide-react';
import { VideoTour, VideoChapter, VideoMasterclass } from '../types';

interface InteractiveVideoPlayerProps {
  videoTour: VideoTour;
  accentColor: string;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  videoTour,
  accentColor,
}) => {
  // Playlist resolution
  const playlist: VideoMasterclass[] =
    videoTour.playlist && videoTour.playlist.length > 0
      ? videoTour.playlist
      : videoTour.masterclass
      ? [videoTour.masterclass]
      : [];

  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);
  const activeMasterclass = playlist[selectedVideoIndex] || playlist[0] || videoTour.masterclass;

  // Mode: 'masterclass' (real 1080p human video with sound) vs 'interactive' (AI spoken audio simulator)
  const [viewMode, setViewMode] = useState<'masterclass' | 'interactive'>(
    playlist.length > 0 ? 'masterclass' : 'interactive'
  );

  // Interactive Simulator States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showChapters, setShowChapters] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalDuration = videoTour.durationSeconds || 615;

  // Active Chapter calculation
  const currentChapterIndex = videoTour.chapters.reduce(
    (acc, chap, idx) => (currentTime >= chap.timeSeconds ? idx : acc),
    0
  );
  const activeChapter: VideoChapter = videoTour.chapters[currentChapterIndex] || videoTour.chapters[0];
  const lastSpokenChapterRef = useRef<number>(-1);

  // Play synthesized tactile sound effect via Web Audio API
  const playTactileAudio = (freq = 440, type = 'sine', duration = 0.06) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context blocked until user gesture, ignore
    }
  };

  // Browser SpeechSynthesis Voice Narration
  const speakNarration = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isMuted || volume === 0) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02 * speed;
    utterance.pitch = 1.0;
    utterance.volume = volume;

    // Pick natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Daniel') ||
          v.name.includes('Samantha') ||
          v.name.includes('Alex'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    playTactileAudio(600, 'triangle', 0.08);
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Trigger speech narration when playing and chapter changes
  useEffect(() => {
    if (viewMode === 'interactive' && isPlaying && !isMuted) {
      if (lastSpokenChapterRef.current !== currentChapterIndex) {
        lastSpokenChapterRef.current = currentChapterIndex;
        const narrationText = `${activeChapter.title}. ${activeChapter.subtitle}. ${activeChapter.description}`;
        speakNarration(narrationText);
      }
    } else {
      stopNarration();
    }
  }, [currentChapterIndex, isPlaying, isMuted, viewMode, speed, volume]);

  // Cleanup on unmount or viewMode change
  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [viewMode]);

  // Tick clock when playing
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && viewMode === 'interactive') {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            stopNarration();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, totalDuration, viewMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.min(totalDuration, Math.max(0, Math.floor(pos * totalDuration)));
    setCurrentTime(newTime);
    lastSpokenChapterRef.current = -1; // re-trigger voice
    playTactileAudio(480, 'sine', 0.04);
  };

  const handleJumpToChapter = (chapter: VideoChapter) => {
    setCurrentTime(chapter.timeSeconds);
    lastSpokenChapterRef.current = -1;
    setIsPlaying(true);
    playTactileAudio(550, 'triangle', 0.06);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col my-6 select-none"
    >
      {/* Top Mode Selector Bar */}
      <div className="px-5 py-3 bg-slate-900 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-white tracking-wide truncate">
            {videoTour.title}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-medium">
            {videoTour.durationFormatted}
          </span>
        </div>

        {/* View Switcher: Real Video Masterclass vs Interactive AI Voice Simulator */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {videoTour.masterclass && (
            <button
              onClick={() => {
                stopNarration();
                setIsPlaying(false);
                setViewMode('masterclass');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'masterclass'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Real Video Masterclass</span>
              <span className="text-[9px] bg-black/20 text-slate-900 px-1 rounded uppercase font-extrabold">
                1080p Audio
              </span>
            </button>
          )}

          <button
            onClick={() => setViewMode('interactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'interactive'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Interactive AI Voice &amp; Code Scrubber</span>
            <span className="text-[9px] bg-black/20 text-slate-900 px-1 rounded uppercase font-extrabold">
              Spoken Voice
            </span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: Real Video Masterclass (1080p + Human Audio + Code Recording) */}
      {viewMode === 'masterclass' && activeMasterclass && (
        <div className="flex flex-col bg-slate-950">
          {/* Playlist selector bar if multiple videos */}
          {playlist.length > 1 && (
            <div className="px-4 sm:px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Film className="w-3.5 h-3.5 text-emerald-400" />
                <span>Video Playlist ({playlist.length}):</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {playlist.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVideoIndex(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedVideoIndex === idx
                        ? 'bg-gradient-to-r from-emerald-500/25 to-teal-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
                        : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        selectedVideoIndex === idx
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[170px] sm:max-w-[260px]">{video.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {video.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative aspect-video w-full bg-black">
            <iframe
              key={activeMasterclass.youtubeId}
              src={`https://www.youtube.com/embed/${activeMasterclass.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
              title={activeMasterclass.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="p-5 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                  <Headphones className="w-3 h-3" /> Real Human Audio &amp; Screen Recording
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeMasterclass.duration} Full Runtime
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-emerald-400 font-medium">
                  By {activeMasterclass.author}
                </span>
                {activeMasterclass.tag && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                      {activeMasterclass.tag}
                    </span>
                  </>
                )}
              </div>

              <h4 className="text-base font-bold text-white">
                {activeMasterclass.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {activeMasterclass.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${activeMasterclass.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-md shadow-rose-950"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setViewMode('interactive')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Switch to AI Voice Simulator</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Interactive AI Voice & Code Simulator */}
      {viewMode === 'interactive' && (
        <>
          {/* Main Video Screen Area (16:9 aspect) */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex flex-col justify-between p-6">
            {/* Top Active Chapter Tag & Audio Voice Status */}
            <div className="flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs text-white shadow-xl backdrop-blur-md">
                <span className="font-mono text-emerald-400 font-bold">{activeChapter.timestamp}</span>
                <span className="text-slate-500">•</span>
                <span className="font-semibold text-slate-200">{activeChapter.title}</span>
              </div>

              {/* Voice Synthesizer Speaking Waveform */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-mono font-medium border transition-all ${
                    isSpeaking
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'Voiceover Speaking' : 'Voice Synthesizer'}</span>
                  {isSpeaking && (
                    <div className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" />
                      <span className="w-1 h-4 bg-teal-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowChapters(!showChapters)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                    showChapters
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Chapters ({videoTour.chapters.length})</span>
                </button>
              </div>
            </div>

            {/* Central Dynamic Scene Canvas */}
            <div className="my-auto w-full max-w-3xl mx-auto z-10 py-2">
              {activeChapter.scene.type === 'overview' && (
                <div className="p-6 rounded-2xl bg-slate-900/95 border border-emerald-500/30 shadow-2xl backdrop-blur-md text-center space-y-3.5">
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {activeChapter.scene.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {activeChapter.description}
                  </p>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 text-left overflow-x-auto shadow-inner">
                    {activeChapter.scene.visualSnippet}
                  </div>
                </div>
              )}

              {activeChapter.scene.type === 'architecture' && (
                <div className="p-6 rounded-2xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                      <Layers className="w-4 h-4" />
                      <span>{activeChapter.scene.headline}</span>
                    </div>
                    <span className="text-[11px] text-cyan-300/80 font-mono">Kernel &harr; Userspace Boundary</span>
                  </div>
                  <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
                    {activeChapter.scene.visualSnippet}
                  </pre>
                  <div className="text-xs text-slate-300 font-sans leading-relaxed">
                    {activeChapter.scene.calloutText}
                  </div>
                </div>
              )}

              {activeChapter.scene.type === 'demo' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-2.5 font-mono">
                  {/* Styled Terminal Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] ml-2">bash ~ {videoTour.instructorName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      ACTIVE SOCKET RUN
                    </span>
                  </div>
                  <pre className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800/80 text-emerald-400 text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap shadow-inner font-mono">
                    {activeChapter.scene.visualSnippet}
                  </pre>
                  <div className="text-[11px] text-slate-300 font-sans flex items-center justify-between">
                    <span>{activeChapter.scene.calloutText}</span>
                    <span className="font-mono text-emerald-400 text-xs animate-pulse">▋</span>
                  </div>
                </div>
              )}

              {activeChapter.scene.type === 'code' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-2xl space-y-2 font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <Code2 className="w-4 h-4" />
                      <span>{activeChapter.scene.headline}</span>
                    </div>
                    <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      Step Zero Architecture
                    </span>
                  </div>
                  <pre className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 text-indigo-200 text-xs overflow-x-auto leading-relaxed shadow-inner">
                    {activeChapter.scene.visualSnippet}
                  </pre>
                  <div className="text-[11px] text-slate-300 font-sans">
                    {activeChapter.scene.calloutText}
                  </div>
                </div>
              )}

              {activeChapter.scene.type === 'benchmark' && (
                <div className="p-6 rounded-2xl bg-slate-900/95 border border-purple-500/30 shadow-2xl backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                      <Activity className="w-4 h-4" />
                      <span>{activeChapter.scene.headline}</span>
                    </div>
                    <span className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded font-mono">
                      LATENCY &amp; THROUGHPUT
                    </span>
                  </div>
                  <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed shadow-inner">
                    {activeChapter.scene.visualSnippet}
                  </pre>
                  <div className="text-xs text-slate-300 font-sans">
                    {activeChapter.scene.calloutText}
                  </div>
                </div>
              )}
            </div>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <button
                onClick={() => {
                  setIsPlaying(true);
                  lastSpokenChapterRef.current = -1;
                  playTactileAudio(520, 'sine', 0.1);
                }}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-500/95 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/60 hover:scale-110 transition-all z-20 group"
                aria-label="Play video walkthrough"
              >
                <Play className="w-7 h-7 fill-slate-950 translate-x-0.5 group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* Spoken Narration Subtitle Bar with Audio Indicator */}
            <div className="z-10 mt-auto">
              <div className="p-3.5 rounded-2xl bg-slate-950/95 border border-slate-800 text-xs text-slate-200 flex items-center gap-3 backdrop-blur-md shadow-xl">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1.5 flex-shrink-0">
                  <Mic className="w-3 h-3" />
                  AUDIO SPEECH
                </span>
                <span className="italic text-slate-300 flex-1 truncate font-serif">
                  &ldquo;{activeChapter.subtitle}&rdquo;
                </span>
                {isSpeaking && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Speaking
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Chapters Drawer (Toggleable) */}
          {showChapters && (
            <div className="p-4 bg-slate-900 border-t border-slate-800 max-h-56 overflow-y-auto">
              <div className="text-xs font-bold text-slate-300 mb-2.5 uppercase tracking-wider flex items-center justify-between">
                <span>Video Walkthrough Chapters (~10 Minutes)</span>
                <span className="text-[11px] text-slate-500">Click to jump immediately</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {videoTour.chapters.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToChapter(chap)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all flex items-start gap-2.5 ${
                      currentChapterIndex === idx
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-mono text-emerald-400 text-xs">{chap.timestamp}</span>
                    <div className="truncate">
                      <div className="truncate">{chap.title}</div>
                      <div className="text-[10px] text-slate-500 truncate">{chap.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Video Scrubber & Audio Controls Bar */}
          <div className="p-4 bg-slate-900/95 border-t border-slate-800/80 flex flex-col gap-2.5">
            {/* Scrubber Progress Bar */}
            <div
              onClick={handleSeek}
              className="relative w-full h-2.5 bg-slate-800 rounded-full cursor-pointer group"
            >
              {videoTour.chapters.map((c, i) => (
                <div
                  key={i}
                  style={{ left: `${(c.timeSeconds / totalDuration) * 100}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-600/80 group-hover:bg-slate-300 z-10"
                  title={`${c.timestamp} - ${c.title}`}
                />
              ))}

              <div
                style={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full relative"
              >
                <span className="absolute right-0 -top-1 w-4 h-4 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* Buttons & Time Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    const nextPlaying = !isPlaying;
                    setIsPlaying(nextPlaying);
                    if (nextPlaying) {
                      lastSpokenChapterRef.current = -1;
                    } else {
                      stopNarration();
                    }
                    playTactileAudio(500, 'sine', 0.08);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => {
                    setCurrentTime((prev) => Math.max(0, prev - 10));
                    lastSpokenChapterRef.current = -1;
                    playTactileAudio(420, 'sine', 0.05);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  title="Rewind 10 seconds"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTime((prev) => Math.min(totalDuration, prev + 10));
                    lastSpokenChapterRef.current = -1;
                    playTactileAudio(580, 'sine', 0.05);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  title="Forward 10 seconds"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                <div className="font-mono text-xs text-slate-400 ml-1">
                  <span className="text-white font-bold">{formatTime(currentTime)}</span> / {formatTime(totalDuration)}
                </div>
              </div>

              {/* Volume & Audio Controls */}
              <div className="flex items-center gap-3">
                {/* Audio Volume Slider & Mute Toggle */}
                <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      const nextMute = !isMuted;
                      setIsMuted(nextMute);
                      if (nextMute) {
                        stopNarration();
                      } else if (isPlaying) {
                        lastSpokenChapterRef.current = -1;
                      }
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                    title={isMuted ? 'Unmute voice' : 'Mute voice'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setVolume(val);
                      if (val > 0 && isMuted) setIsMuted(false);
                    }}
                    className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  />

                  <span className="text-[10px] font-mono text-slate-400 w-7">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>

                {/* Speed Selector */}
                <button
                  onClick={() => {
                    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : speed === 1.5 ? 2 : 1;
                    setSpeed(nextSpeed);
                    lastSpokenChapterRef.current = -1;
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono font-bold"
                  title="Playback Speed"
                >
                  {speed}x
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
