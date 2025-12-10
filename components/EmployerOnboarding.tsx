import React, { useState } from 'react';
import { Button } from './Button';
import { Building2, ShieldCheck, Landmark, CheckCircle2, ArrowRight, Lock, Briefcase } from 'lucide-react';
import { EmployerProfile } from '../types';

interface EmployerOnboardingProps {
  onComplete: (profile: Partial<EmployerProfile>) => void;
}

type Step = 'COMPANY_INFO' | 'LINK_BANK' | 'SUCCESS';

export const EmployerOnboarding: React.FC<EmployerOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('COMPANY_INFO');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    ein: '',
    employeeCount: '',
    annualPremiumVolume: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setStep('LINK_BANK');
    }, 1000);
  };

  const handleLinkBank = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setStep('SUCCESS');
    }, 2000);
  };

  const handleFinalize = () => {
    onComplete({
        companyName: formData.companyName || 'Acme Corp',
        employeeCount: parseInt(formData.employeeCount) || 50,
        totalVolume: 0, 
        engagementScore: 0
    });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">
        
        <div className="max-w-md w-full mx-auto">
           {/* Header */}
           <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 mb-6">
                  <Briefcase className="w-3 h-3" />
                  CORPORATE TREASURY
               </div>
               <h1 className="text-4xl font-serif font-bold text-stone-900 mb-3">
                  {step === 'COMPANY_INFO' && "Entity Verification"}
                  {step === 'LINK_BANK' && "Connect Operating Account"}
                  {step === 'SUCCESS' && "Credit Line Approved"}
               </h1>
               <p className="text-stone-500 text-lg">
                  {step === 'COMPANY_INFO' && "Enter your business details to provision a rewards account."}
                  {step === 'LINK_BANK' && "Securely link the account used for insurance premiums."}
                  {step === 'SUCCESS' && "Your account is active. Welcome to VitalPerks Corporate."}
               </p>
           </div>

           {/* Step 1: Company Info */}
           {step === 'COMPANY_INFO' && (
              <form onSubmit={handleCompanySubmit} className="space-y-6 animate-fadeIn">
                  <div>
                      <label className="block text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">Legal Business Name</label>
                      <input 
                          name="companyName"
                          type="text" 
                          required
                          className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-gold-400 focus:border-gold-400 outline-none transition-all text-stone-900 font-medium placeholder-stone-400"
                          placeholder="e.g. Acme Innovations Inc."
                          value={formData.companyName}
                          onChange={handleInputChange}
                      />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">EIN / Tax ID</label>
                          <input 
                              name="ein"
                              type="text" 
                              required
                              className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-gold-400 outline-none transition-all"
                              placeholder="12-3456789"
                              value={formData.ein}
                              onChange={handleInputChange}
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-stone-900 uppercase tracking-wide mb-2">Employees</label>
                          <input 
                              name="employeeCount"
                              type="number" 
                              required
                              className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-gold-400 outline-none transition-all"
                              placeholder="e.g. 50"
                              value={formData.employeeCount}
                              onChange={handleInputChange}
                          />
                      </div>
                  </div>

                  <div className="pt-4">
                      <Button type="submit" className="w-full h-14 text-lg" isLoading={isLoading}>
                          Verify Business <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-stone-400 text-xs mt-6">
                      <Lock className="w-3 h-3" /> 
                      <span>Bank-grade encryption via Plaid & Stripe</span>
                  </div>
              </form>
           )}

           {/* Step 2: Link Bank */}
           {step === 'LINK_BANK' && (
              <div className="space-y-4 animate-fadeIn">
                   <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <p className="text-sm text-blue-800">VitalPerks only has read-access to verify balance. We cannot debit without authorization.</p>
                   </div>

                   <button type="button" onClick={handleLinkBank} className="w-full flex items-center justify-between p-5 bg-white border border-stone-200 rounded-xl hover:border-gold-400 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#117ACA] rounded-lg flex items-center justify-center text-white font-bold shadow-sm">C</div>
                          <div className="text-left">
                              <div className="font-bold text-stone-900">Chase for Business</div>
                              <div className="text-xs text-stone-500">Instant Verification</div>
                          </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-gold-500 transition-colors" />
                   </button>

                   <button type="button" onClick={handleLinkBank} className="w-full flex items-center justify-between p-5 bg-white border border-stone-200 rounded-xl hover:border-gold-400 hover:shadow-lg transition-all group">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold shadow-sm">M</div>
                          <div className="text-left">
                              <div className="font-bold text-stone-900">Mercury</div>
                              <div className="text-xs text-stone-500">Preferred Partner</div>
                          </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-gold-500 transition-colors" />
                   </button>
                   
                   {isLoading && <div className="text-center py-4 text-gold-600 font-medium animate-pulse">Connecting to banking core...</div>}
              </div>
           )}

           {/* Step 3: Success */}
           {step === 'SUCCESS' && (
              <div className="text-center animate-fadeIn">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  
                  <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 mb-8">
                      <div className="text-stone-500 text-sm mb-1 uppercase tracking-wide">Monthly Credit Line</div>
                      <div className="text-4xl font-serif font-bold text-stone-900">$250,000</div>
                      <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between text-sm">
                          <span className="text-stone-500">APR</span>
                          <span className="font-bold text-stone-900">0% (Pay in Full)</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                          <span className="text-stone-500">Cashback</span>
                          <span className="font-bold text-gold-600">1.5% Unlimited</span>
                      </div>
                  </div>

                  <Button onClick={handleFinalize} size="lg" className="w-full shadow-xl shadow-gold-500/20">
                      Enter Corporate Dashboard
                  </Button>
              </div>
           )}
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-stone-900">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate Office" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800/80 to-stone-900/40"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white">
              <blockquote className="text-2xl font-serif italic leading-relaxed mb-6">
                 "VitalPerks transformed our insurance premiums from a sunk cost into our second-largest revenue driver after sales."
              </blockquote>
              <div>
                  <div className="font-bold text-lg">Sarah Jenkins</div>
                  <div className="text-gold-400 text-sm">CFO, TechFlow Solutions</div>
              </div>
          </div>
      </div>
    </div>
  );
};