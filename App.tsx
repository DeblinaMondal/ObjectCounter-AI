import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { countObjectsInImage } from './services/geminiService';
import { CountResult, ImageFile, LoadingState } from './types';
import { Loader2, AlertCircle, RefreshCw, Calculator } from 'lucide-react';

const App: React.FC = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [result, setResult] = useState<CountResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (newImage: ImageFile | null) => {
    setImage(newImage);
    setResult(null);
    setErrorMessage(null);
    setLoadingState(LoadingState.IDLE);
  };

  const handleCount = async () => {
    if (!image) return;

    setLoadingState(LoadingState.ANALYZING);
    setErrorMessage(null);
    setResult(null);

    try {
      const data = await countObjectsInImage(image.base64, image.mimeType);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Count anything in seconds
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Upload a photo of a group of items—like ingredients, supplies, or collectibles—and our AI will count them for you automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Upload & Controls */}
          <div className="space-y-6">
            <ImageUploader 
              image={image} 
              onImageChange={handleImageChange}
              disabled={loadingState === LoadingState.ANALYZING}
            />

            {image && loadingState !== LoadingState.SUCCESS && (
               <button
               onClick={handleCount}
               disabled={loadingState === LoadingState.ANALYZING}
               className={`
                 w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all transform
                 flex items-center justify-center gap-3
                 ${loadingState === LoadingState.ANALYZING 
                   ? 'bg-indigo-400 text-white cursor-wait' 
                   : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-1 hover:shadow-xl active:scale-95'
                 }
               `}
             >
               {loadingState === LoadingState.ANALYZING ? (
                 <>
                   <Loader2 className="w-6 h-6 animate-spin" />
                   Counting objects...
                 </>
               ) : (
                 <>
                   <Calculator className="w-6 h-6" />
                   Count Objects
                 </>
               )}
             </button>
            )}

            {loadingState === LoadingState.ERROR && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Analysis Failed</h4>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Results & Info */}
          <div className="space-y-6">
            {loadingState === LoadingState.SUCCESS && result ? (
              <>
                <ResultCard result={result} />
                <button
                  onClick={() => handleImageChange(null)}
                  className="w-full py-3 px-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Count Another Image
                </button>
              </>
            ) : (
              <div className="hidden lg:flex h-full flex-col justify-center items-center text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-slate-400">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Calculator className="w-8 h-8 text-indigo-200" />
                </div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">Ready for results</h3>
                <p className="max-w-xs">Upload an image and hit "Count Objects" to see the magic happen right here.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} ObjectCounter AI. Powered by Gemini 3.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
