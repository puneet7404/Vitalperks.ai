import React, { useState } from 'react';
import { VirtualAccount } from '../types';
import { Copy, Eye, EyeOff, ShieldCheck, Building2 } from 'lucide-react';

interface VirtualCardDetailsProps {
  account: VirtualAccount;
}

export const VirtualCardDetails: React.FC<VirtualCardDetailsProps> = ({ account }) => {
  const [showNumber, setShowNumber] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast here
  };

  return (
    <div className="w-full">
        {/* Premium White Ceramic Card Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-stone-50 to-stone-200 shadow-xl border border-stone-100 aspect-[1.586/1]">
            
            {/* Grain/Ceramic Texture effect (subtle noise) */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] mix-blend-multiply pointer-events-none"></div>
            
            {/* Gold Foil Shine */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold-100/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full text-stone-800">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
                            <div className="w-5 h-5 bg-white/20 rounded-full"></div>
                        </div>
                        <span className="font-serif font-bold tracking-widest text-stone-900 text-lg">VitalPerks</span>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md border border-stone-200 text-xs font-mono tracking-wider text-stone-500 shadow-sm">
                        VIRTUAL ACH
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="text-stone-400 text-xs uppercase tracking-wider mb-1 font-bold">Routing Number</div>
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xl md:text-2xl tracking-widest text-stone-800 font-medium text-shadow-sm">{account.routingNumber}</span>
                            <button onClick={() => copyToClipboard(account.routingNumber)} className="text-gold-500 hover:text-gold-600 transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <div className="text-stone-400 text-xs uppercase tracking-wider mb-1 font-bold">Account Number</div>
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-xl md:text-2xl tracking-widest text-stone-800 font-medium">
                                {showNumber ? account.accountNumber : '•••• •••• ' + account.accountNumber.slice(-4)}
                            </span>
                            <button onClick={() => setShowNumber(!showNumber)} className="text-stone-400 hover:text-stone-600 transition-colors">
                                {showNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <button onClick={() => copyToClipboard(account.accountNumber)} className="text-gold-500 hover:text-gold-600 transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2 text-stone-500 text-xs font-medium">
                        <Building2 className="w-3 h-3 text-gold-500" />
                        <span>{account.bankName}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gold-600 text-xs font-bold bg-gold-50 px-2 py-1 rounded border border-gold-100">
                        <ShieldCheck className="w-3 h-3" />
                        <span>FDIC INSURED</span>
                    </div>
                </div>
            </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-stone-500 max-w-sm mx-auto">
            Use these numbers to pay your insurance provider directly. We'll handle the rest and reward you.
        </p>
    </div>
  );
};