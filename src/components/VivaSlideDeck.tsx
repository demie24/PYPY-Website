import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  MessageSquare, 
  Award, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Play, 
  Layers 
} from 'lucide-react';
import { VIVA_SLIDES, PROJECT_INFO } from '../data';

interface VivaSlideDeckProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export const VivaSlideDeck: React.FC<VivaSlideDeckProps> = ({ onClose, isDarkMode }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = VIVA_SLIDES[currentSlideIdx];
  const totalSlides = VIVA_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIdx < totalSlides - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none animate-fade-in overflow-hidden">
      
      {/* Top Slide Control Bar */}
      <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-md">
        
        {/* Left: Info */}
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-brand-indigo text-white shadow-glow-indigo">
            {slide.slideNumber}
          </span>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {slide.category} • {PROJECT_INFO.institution}
          </span>
        </div>

        {/* Center: Progress Indicators */}
        <div className="flex items-center space-x-1.5">
          {VIVA_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIdx 
                  ? 'w-8 bg-gradient-to-r from-brand-indigo to-brand-cyan shadow-sm' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Pergi ke Slaid ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Toggle Speaker Notes */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              showSpeakerNotes 
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Buka Skrip / Nota Calon"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Skrip Calon</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700"
            title="Skrin Penuh (Fullscreen)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Slide Deck */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-800 border border-slate-700"
            title="Tutup Mod Slaid"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 relative flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        
        {/* Subtle Background Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="relative max-w-5xl w-full z-10">
          
          {/* Slide Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.category}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {slide.title}
            </h1>
            
            <p className="mt-3 text-lg sm:text-xl text-brand-indigo font-semibold">
              {slide.subtitle}
            </p>
          </div>

          {/* Slide Body: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Key Bullet Points */}
            <div className="lg:col-span-8 space-y-4">
              {slide.keyPoints.map((point, pIdx) => (
                <div 
                  key={pIdx} 
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-brand-indigo/40 transition-all flex items-start gap-4 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-brand-indigo/20 text-brand-cyan font-bold text-xs flex-shrink-0 mt-0.5">
                    {pIdx + 1}
                  </div>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Column: Highlight Card */}
            <div className="lg:col-span-4 space-y-5">
              
              {slide.highlightStat && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-brand-indigo/30 shadow-glow-indigo text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {slide.highlightStat.label}
                  </div>
                  <div className={`text-4xl font-black ${slide.highlightStat.color} my-2`}>
                    {slide.highlightStat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Empirical Verification
                  </div>
                </div>
              )}

              {/* Quick Meta Card */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="text-slate-200">{PROJECT_INFO.gridModel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stack:</span>
                  <span className="text-emerald-400">19 Microservices Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span>Penyelidikan:</span>
                  <span className="text-brand-cyan">{PROJECT_INFO.institution}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Slide Speaker Notes Drawer (Toggled by user) */}
      {showSpeakerNotes && (
        <div className="border-t border-amber-400/30 bg-amber-950/40 backdrop-blur-md p-4 px-6 animate-slide-up">
          <div className="max-w-5xl mx-auto flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-400 text-slate-950 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                Cadangan Skrip Berucap Calon Semasa Viva:
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                &ldquo;{slide.vivaSpeakerNotes}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <div className="h-16 px-6 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
        
        <button
          onClick={prevSlide}
          disabled={currentSlideIdx === 0}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
            currentSlideIdx === 0 
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700' 
              : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Slaid Sebelumnya</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          Guna kekunci anak panah <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">→</kbd> atau bar ruang
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlideIdx === totalSlides - 1}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
            currentSlideIdx === totalSlides - 1 
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500 border-slate-700' 
              : 'bg-gradient-to-r from-brand-indigo to-brand-purple text-white border-transparent shadow-glow-indigo hover:opacity-95 active:scale-95'
          }`}
        >
          <span>Slaid Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
