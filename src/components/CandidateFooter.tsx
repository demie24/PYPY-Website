import React from 'react';
import { ShieldCheck, Heart, Github, GraduationCap, School, FileText } from 'lucide-react';
import { PROJECT_INFO } from '../data';

export const CandidateFooter: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-scada-bg text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          
          {/* Institution & Programme */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-purple flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {PROJECT_INFO.institution}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {PROJECT_INFO.faculty} • {PROJECT_INFO.programme}
              </p>
            </div>
          </div>

          {/* FYP Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-emerald"></span>
              Calon: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{PROJECT_INFO.author}</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Tahun Akademik {PROJECT_INFO.academicYear}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a 
              href={PROJECT_INFO.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-indigo dark:text-brand-cyan hover:underline font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright & tagline */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>
            © {PROJECT_INFO.academicYear} {PROJECT_INFO.shortTitle}. Dibina khas untuk sesi pembentangan Final Year Project (FYP).
          </p>
          <p className="italic font-mono text-brand-indigo dark:text-indigo-400">
            &ldquo;{PROJECT_INFO.tagline}&rdquo;
          </p>
        </div>

      </div>
    </footer>
  );
};
