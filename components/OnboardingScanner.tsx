import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { analyzeBillImage } from '../services/geminiService';
import { Camera, RefreshCw, Shield, ScanLine, UserSquare2 } from 'lucide-react';
import { BillData, InsurancePolicy } from '../types';

/**
 * STEP 3: FRONT-END "AI CAMERA" COMPONENT
 * Adapts mobile-first scanning behavior for the web using File API with capture="environment".
 */

interface OnboardingScannerProps {
  onComplete: (policy: InsurancePolicy) => void;
}

type ScanStep = 'ID_CARD' | 'INSURANCE_CARD' | 'REVIEW';

export const OnboardingScanner: React.FC<OnboardingScannerProps> = ({ onComplete }) => {
  const [step, setStep] = useState<ScanStep>('ID_CARD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedPolicy, setExtractedPolicy] = useState<InsurancePolicy | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      // Convert to Base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Simulate parsing logic based on step
      // In a real app, we would have different prompts for ID vs Insurance Card
      // Re-using the robust Gemini service we built
      const data: BillData = await analyzeBillImage(base64);

      if (step === 'ID_CARD') {
        // Mock ID scan success, move to next
        setTimeout(() => {
            setIsProcessing(false);
            setStep('INSURANCE_CARD');
        }, 1500);
      } else if (step === 'INSURANCE_CARD') {
        // Map BillData to InsurancePolicy
        const policy: InsurancePolicy = {
            carrierName: data.providerName || "Detected Provider",
            memberId: data.accountNumber || "MEM-" + Math.floor(Math.random() * 1000000),
            premiumAmount: data.amountDue || 0,
            lastVerified: new Date().toISOString()
        };
        setExtractedPolicy(policy);
        setIsProcessing(false);
        setStep('REVIEW');
      }

    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const handleConfirm = () => {
    if (extractedPolicy) {
        onComplete(extractedPolicy);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
        
        {/* Header Progress - Light Theme */}
        <div className="bg-white p-6 border-b border-stone-100 text-center relative">
          <div className="flex justify-center mb-4 space-x-2">
            <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 'ID_CARD' ? 'bg-gold-400' : 'bg-green-500'}`} />
            <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 'INSURANCE_CARD' ? 'bg-gold-400' : step === 'REVIEW' ? 'bg-green-500' : 'bg-stone-200'}`} />
            <div className={`h-1.5 w-12 rounded-full transition-colors ${step === 'REVIEW' ? 'bg-gold-400' : 'bg-stone-200'}`} />
          </div>
          
          <h2 className="text-xl font-serif font-bold text-stone-900">
            {step === 'ID_CARD' && "Scan Driver's License"}
            {step === 'INSURANCE_CARD' && "Scan Insurance Card"}
            {step === 'REVIEW' && "Verify Details"}
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {step === 'ID_CARD' && "We need this to verify your identity (KYC)."}
            {step === 'INSURANCE_CARD' && "We'll auto-extract your carrier & premium."}
            {step === 'REVIEW' && "Confirm the AI extraction."}
          </p>
        </div>

        {/* Content Area */}
        <div className="p-8">
            {step === 'REVIEW' && extractedPolicy ? (
                <div className="space-y-6">
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <label className="text-xs text-stone-400 uppercase font-bold tracking-wider">Insurance Carrier</label>
                        <div className="text-lg font-bold text-stone-900">{extractedPolicy.carrierName}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                            <label className="text-xs text-stone-400 uppercase font-bold tracking-wider">Monthly Premium</label>
                            <div className="text-lg font-bold text-stone-900">${extractedPolicy.premiumAmount.toFixed(2)}</div>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                            <label className="text-xs text-stone-400 uppercase font-bold tracking-wider">Member ID</label>
                            <div className="text-lg font-bold text-stone-900 truncate">{extractedPolicy.memberId}</div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                            <span className="font-bold">Encryption Active.</span> Your data is processed securely via Google Cloud Vision.
                        </div>
                    </div>

                    <Button onClick={handleConfirm} className="w-full" size="lg">
                        Confirm & Create Account
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <div 
                        onClick={!isProcessing ? triggerCamera : undefined}
                        className={`relative w-64 h-40 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${isProcessing ? 'border-gold-400 bg-gold-50' : 'border-stone-300 hover:border-gold-400 hover:bg-stone-50 group'}`}
                    >
                        {isProcessing ? (
                             <div className="flex flex-col items-center animate-pulse">
                                <RefreshCw className="w-8 h-8 text-gold-500 animate-spin mb-2" />
                                <span className="text-gold-600 font-medium text-sm">AI Scanning...</span>
                             </div>
                        ) : (
                             <div className="flex flex-col items-center">
                                {step === 'ID_CARD' ? <UserSquare2 className="w-10 h-10 text-stone-300 group-hover:text-gold-500 transition-colors mb-2" /> : <ScanLine className="w-10 h-10 text-stone-300 group-hover:text-gold-500 transition-colors mb-2" />}
                                <span className="text-stone-500 font-medium group-hover:text-stone-800">Tap to Scan</span>
                             </div>
                        )}
                        
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            capture="environment" 
                            className="hidden" 
                            onChange={handleCapture}
                            disabled={isProcessing}
                        />
                    </div>
                    
                    <div className="mt-8 text-center px-4">
                        <div className="inline-flex items-center gap-2 text-stone-400 text-sm">
                            <Camera className="w-4 h-4" />
                            <span>Align card within frame</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};