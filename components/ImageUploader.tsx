import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  image: ImageFile | null;
  onImageChange: (image: ImageFile | null) => void;
  disabled: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageChange, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // Extract base64 data without the prefix
      const base64 = result.split(',')[1];
      
      onImageChange({
        file,
        previewUrl: result,
        base64,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (image) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 group">
        <img
          src={image.previewUrl}
          alt="Preview"
          className="w-full h-auto max-h-[500px] object-contain mx-auto"
        />
        {!disabled && (
          <button
            onClick={removeImage}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all transform hover:scale-105"
            aria-label="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
        flex flex-col items-center justify-center min-h-[300px]
        ${isDragging 
          ? 'border-indigo-500 bg-indigo-50 scale-[1.01]' 
          : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />
      
      <div className={`p-4 rounded-full mb-4 ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
        {isDragging ? <ImageIcon className="w-10 h-10" /> : <Upload className="w-10 h-10" />}
      </div>
      
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {isDragging ? 'Drop it like it\'s hot!' : 'Upload an image to count'}
      </h3>
      <p className="text-slate-500 max-w-sm mx-auto">
        Drag and drop your image here, or click to browse files.
        <br />
        <span className="text-sm text-slate-400 mt-2 block">Supports JPG, PNG, WEBP</span>
      </p>
    </div>
  );
};
