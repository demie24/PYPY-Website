import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIVA_SLIDES, PROJECT_INFO } from '../data';

interface AppleKeynoteModalProps {
  onClose: () => void;
}

export const AppleKeynoteModal: React.FC<AppleKeynoteModalProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 z-50 flex flex-col bg-[#fbfbfd] text-[#1d1d1f] select-none overflow-hidden">
      
      {/* Top Apple Control Bar */}
      <div className="h-16 px-6 border-b border-black/[0.06] flex items-center justify-between apple-glass">
        
        {/* Left: Info */}
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0071e3] text-white">
            {slide.slideNumber}
          </span>
          <span className="text-xs text-[#86868b] font-medium hidden sm:inline">
            {slide.category} • {PROJECT_INFO.institution}
          </span>
        </div>

        {/* Center: Progress Indicator Pills */}
        <div className="flex items-center space-x-1.5">
          {VIVA_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIdx 
                  ? 'w-8 bg-[#0071e3]' 
                  : 'w-2 bg-[#d2d2d7] hover:bg-[#86868b]'
              }`}
            />
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showSpeakerNotes 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Skrip Calon</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] bg-[#f5f5f7]"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#86868b] hover:text-[#ef4444] bg-[#f5f5f7]"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      </div>

      {/* Main Keynote Slide Area */}
      <div className="flex-1 relative flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="max-w-4xl w-full"
          >
            
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0071e3] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{slide.category}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight leading-tight">
                {slide.title}
              </h1>

              <p className="mt-3 text-lg sm:text-xl text-[#0071e3] font-semibold">
                {slide.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-4">
                {slide.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="apple-card p-6 flex items-start gap-4 bg-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {pIdx + 1}
                    </div>
                    <p className="text-base sm:text-lg text-[#1d1d1f] font-medium leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 space-y-4">
                {slide.highlightStat && (
                  <div className="apple-card p-7 text-center bg-white">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                      {slide.highlightStat.label}
                    </div>
                    <div className="text-4xl font-extrabold text-[#0071e3] my-2 tracking-tight">
                      {slide.highlightStat.value}
                    </div>
                    <div className="text-xs text-[#86868b]">
                      Empirical Metric
                    </div>
                  </div>
                )}

                <div className="apple-card p-5 bg-[#f5f5f7] border-0 text-xs text-[#86868b] space-y-2">
                  <div className="flex justify-between">
                    <span>Model Grid:</span>
                    <strong className="text-[#1d1d1f]">{PROJECT_INFO.gridModel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastruktur:</span>
                    <strong className="text-[#10b981]">19 Microservices</strong>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div className="border-t border-amber-200 bg-amber-50/90 backdrop-blur-md p-4 px-6">
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-amber-200 text-amber-900 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                Cadangan Skrip Pembentangan Calon Semasa Viva:
              </div>
              <p className="text-xs sm:text-sm text-amber-950 italic font-medium leading-relaxed">
                &ldquo;{slide.vivaSpeakerNotes}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Apple Dock Navigation */}
      <div className="h-16 px-6 border-t border-black/[0.06] bg-white flex items-center justify-between">
        
        <button
          onClick={prevSlide}
          disabled={currentSlideIdx === 0}
          className={`apple-button-secondary text-xs !py-2 !px-4 ${
            currentSlideIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Slaid Sebelumnya</span>
        </button>

        <span className="text-xs text-[#86868b]">
          Guna kekunci anak panah <kbd className="px-1.5 py-0.5 rounded bg-[#f5f5f7] border border-black/[0.08]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#f5f5f7] border border-black/[0.08]">→</kbd> atau bar ruang
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlideIdx === totalSlides - 1}
          className={`apple-button-primary text-xs !py-2 !px-4 ${
            currentSlideIdx === totalSlides - 1 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <span>Slaid Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
