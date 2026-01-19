import React from 'react';
import { Target, Boxes } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Boxes className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Object<span className="text-indigo-600">Counter</span> AI
            </h1>
          </div>
          <a
            href="https://ai.google.dev"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Target className="w-4 h-4" />
            <span>Powered by Gemini</span>
          </a>
        </div>
      </div>
    </header>
  );
};
