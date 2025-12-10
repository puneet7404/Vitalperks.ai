import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { analyzeBillImage } from '../services/geminiService';
import { BillData } from '../types';
import { Camera, CheckCircle, Upload, AlertCircle, FileText } from 'lucide-react';

interface BillScannerProps {
  onScanComplete: (data: BillData) => void;
}

export const BillScanner: React.FC<BillScannerProps> = ({ onScanComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Analyze
    setIsAnalyzing(true);
    setError(null);
    try {
      // Convert to Base64 for API
      const base64Promise = new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = () => resolve(r.result as string);
        r.onerror = error => reject(error);
      });
      
      const base64 = await base64Promise;
      const data = await analyzeBillImage(base64);
      
      if (data.confidence < 0.5) {
        setError("We couldn't clearly read the bill. Please try a clearer photo.");
      } else {
        // Small delay to show the "Analysis" animation
        setTimeout(() => onScanComplete(data), 1500); 
      }
    } catch (e) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
        <div className="p-6 bg-gold-400 text-white text-center">
          <Camera className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-serif font-bold">Scan Your Bill</h2>
          <p className="text-gold-100 text-sm">Upload a photo of your insurance statement to earn points instantly.</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {!preview ? (
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-stone-300 rounded-xl p-10 text-center cursor-pointer hover:bg-stone-50 transition-colors group"
            >
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-50 transition-colors">
                <Upload className="w-8 h-8 text-stone-400 group-hover:text-gold-500" />
              </div>
              <h3 className="text-lg font-medium text-dark-900 mb-2">Upload or Take Photo</h3>
              <p className="text-stone-500 text-sm">Supports JPG, PNG, PDF</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                capture="environment" // Mobile camera trigger
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden shadow-md border border-stone-200">
                <img src={preview} alt="Bill Preview" className="w-full h-auto object-cover max-h-64 opacity-80" />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-dark-900/60 flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="relative">
                       <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-8 h-8 bg-white rounded-full p-1.5">
                           <FileText className="w-full h-full text-gold-600" />
                         </div>
                       </div>
                    </div>
                    <p className="text-white font-medium mt-4 animate-pulse">Analyzing with AI...</p>
                  </div>
                )}
                {!isAnalyzing && !error && (
                   <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white p-4 rounded-full shadow-lg transform scale-105 transition-transform">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                      </div>
                   </div>
                )}
              </div>
              
              {isAnalyzing && (
                <div className="space-y-2">
                   <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-400 animate-progress origin-left w-full"></div>
                   </div>
                   <p className="text-center text-xs text-stone-500">Extracting Provider, Amount, and Date...</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-stone-400">
              Powered by Google Gemini 3.0 Pro. Your data is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};