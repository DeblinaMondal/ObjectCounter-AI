import React from 'react';
import { CountResult } from '../types';
import { CheckCircle2, Info } from 'lucide-react';

interface ResultCardProps {
  result: CountResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-indigo-600 px-6 py-4 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-white" />
        <h2 className="text-lg font-bold text-white">Analysis Complete</h2>
      </div>
      
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              Detected Object
            </p>
            <h3 className="text-3xl font-bold text-slate-900 capitalize">
              {result.objectName}
            </h3>
          </div>
          
          <div className="bg-slate-50 px-8 py-4 rounded-2xl border border-slate-200 text-center min-w-[150px]">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Count
            </p>
            <span className="text-5xl font-extrabold text-indigo-600 block">
              {result.count}
            </span>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
          <div className="flex gap-3 items-start">
            <Info className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">AI Reasoning</h4>
              <p className="text-indigo-800 leading-relaxed text-sm sm:text-base">
                {result.reasoning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
