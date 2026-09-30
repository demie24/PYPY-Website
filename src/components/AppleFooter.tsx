import React from 'react';
import { ShieldCheck, GraduationCap, Github } from 'lucide-react';
import { PROJECT_INFO } from '../data';

export const AppleFooter: React.FC = () => {
  return (
    <footer className="py-16 border-t border-black/[0.06] bg-[#f5f5f7] text-[#86868b] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/[0.06]">
          
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-[#1d1d1f] shadow-sm">
              <GraduationCap className="w-5 h-5 text-[#0071e3]" />
            </div>
            <div>
              <div className="font-bold text-[#1d1d1f] text-sm">
                {PROJECT_INFO.institution}
              </div>
              <p className="text-[#86868b] mt-0.5">
                {PROJECT_INFO.faculty} • {PROJECT_INFO.programme}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-medium">
            <span className="flex items-center gap-1.5 text-[#1d1d1f]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Calon: <strong>{PROJECT_INFO.author}</strong>
            </span>
            <span>•</span>
            <span>Tahun Akademik {PROJECT_INFO.academicYear}</span>
            <span>•</span>
            <a 
              href={PROJECT_INFO.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#0071e3] hover:underline font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {PROJECT_INFO.academicYear} {PROJECT_INFO.shortTitle}. Dibina khas untuk sesi pembentangan Final Year Project (FYP).
          </p>
          <p className="font-medium text-[#1d1d1f]">
            &ldquo;{PROJECT_INFO.tagline}&rdquo;
          </p>
        </div>

      </div>
    </footer>
  );
};
