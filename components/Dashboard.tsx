import React, { useState, useRef } from 'react';
import { UserProfile, AppView } from '../types';
import { TrendingUp, CreditCard, Activity, CalendarClock, AlertCircle, CheckCircle2, ShieldCheck, ChevronRight, Heart, Footprints, Sparkles, Mic, Play, StopCircle } from 'lucide-react';
import { Button } from './Button';
import { handleIncomingACHDebit } from '../services/achBridge';
import { askFinancialAdvisor, generateDailyBriefingAudio } from '../services/geminiService';
import { WELLNESS_ACTIVITIES } from '../constants';

interface DashboardProps {
  user: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const simulatePayment = async () => {
    if (!user.virtualAccount || !user.policy) return;
    alert(`Simulating ACH Pull from ${user.policy.carrierName}...`);
    await handleIncomingACHDebit(
        user.virtualAccount.routingNumber,
        user.virtualAccount.accountNumber,
        user.policy.premiumAmount
    );
    window.location.reload(); 
  };

  const utilization = ((user.creditLimit - user.availableCredit) / user.creditLimit) * 100;

  // AI Feature: Financial Advisor (Thinking Mode)
  const handleAskAdvisor = async () => {
    setIsThinking(true);
    const context = `
      User: ${user.name}
      Credit Limit: $${user.creditLimit}
      Utilization: ${utilization.toFixed(1)}%
      Points: ${user.pointsBalance}
      Transactions: ${user.transactions.length}
    `;
    const question = "Based on my utilization and points, what is the single best strategic move I can make this month to improve my credit score and maximize rewards?";
    
    const response = await askFinancialAdvisor(context, question);
    setAdvice(response);
    setIsThinking(false);
  };

  // AI Feature: TTS Briefing
  const handlePlayBriefing = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    const script = `Good morning ${user.name}. You have ${user.pointsBalance} reward points available. Your credit utilization is at ${utilization.toFixed(1)} percent, which is ${utilization < 30 ? 'excellent' : 'getting high'}. You have a premium payment of ${user.policy?.premiumAmount} dollars coming up. Would you like to pay it now?`;
    
    const base64Audio = await generateDailyBriefingAudio(script);
    
    if (base64Audio) {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        }
        const ctx = audioContextRef.current;
        
        // Decode logic
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start(0);
        
        source.onended = () => setIsPlayingAudio(false);
      } catch (e) {
        console.error("Audio playback error", e);
        setIsPlayingAudio(false);
      }
    } else {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Points Card - Textured */}
        <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl p-6 text-white shadow-xl shadow-gold-500/20 relative overflow-hidden group">
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-20 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-1">
                <h3 className="text-gold-100 text-sm font-medium uppercase tracking-wide">Rewards Balance</h3>
                <button 
                  onClick={handlePlayBriefing}
                  disabled={isPlayingAudio}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                  title="Play Daily Briefing"
                >
                  {isPlayingAudio ? <StopCircle className="w-4 h-4 text-white animate-pulse" /> : <Play className="w-4 h-4 text-white" />}
                </button>
             </div>
             <div className="text-4xl font-serif font-bold mb-4 flex items-baseline gap-2">
                {user.pointsBalance.toLocaleString()} <span className="text-gold-100 text-lg sans-serif font-normal">PTS</span>
             </div>
             <div className="flex items-center gap-2 text-white text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
               <TrendingUp className="w-4 h-4" />
               <span className="font-medium">+{(user.pointsBalance * 0.02).toFixed(0)} this month</span>
             </div>
          </div>
        </div>

        {/* Credit Line Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
           <div className="flex items-start justify-between mb-4">
              <div>
                 <h3 className="text-stone-500 text-sm font-bold uppercase tracking-wide mb-1">VitalPerks Credit Line</h3>
                 <div className="text-3xl font-bold text-stone-900">${user.availableCredit.toLocaleString()}</div>
                 <div className="text-xs text-stone-400 font-medium">of ${user.creditLimit.toLocaleString()} available</div>
              </div>
              <div className="p-3 bg-stone-50 text-stone-600 rounded-xl border border-stone-100">
                 <CreditCard className="w-6 h-6" />
              </div>
           </div>
           
           <div className="space-y-2">
               <div className="flex justify-between text-xs font-medium">
                   <span className="text-stone-500">Utilization</span>
                   <span className={`${utilization > 80 ? 'text-red-500' : 'text-green-600'}`}>{utilization.toFixed(1)}%</span>
               </div>
               <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-stone-800 h-2 rounded-full transition-all duration-1000" style={{ width: `${utilization}%` }}></div>
               </div>
               <div className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                 <ShieldCheck className="w-3 h-3 text-green-500" />
                 Reporting to Experian
               </div>
           </div>
        </div>

        {/* Policy Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 flex flex-col justify-between">
           <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-stone-500 text-sm font-bold uppercase tracking-wide mb-1">Active Policy</h3>
                    <div className="font-bold text-xl text-stone-900 truncate max-w-[180px]">{user.policy?.carrierName || 'No Policy Linked'}</div>
                    {user.policy && <div className="text-sm text-stone-500">{user.policy.memberId}</div>}
                </div>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-100">
                    <ShieldCheck className="w-5 h-5" />
                </div>
           </div>
           
           {user.policy ? (
               <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-stone-600">Next Payment</span>
                        <span className="text-sm font-bold text-stone-900">${user.policy.premiumAmount}</span>
                    </div>
                    <Button onClick={simulatePayment} size="sm" variant="outline" className="w-full border-gold-400 text-gold-600 hover:bg-gold-50">
                        Pay Bill Now
                    </Button>
               </div>
           ) : (
               <div className="mt-4 text-sm text-orange-500 flex items-center gap-2">
                   <AlertCircle className="w-4 h-4" /> Link policy to start
               </div>
           )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Ledger */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-stone-900 font-serif">Transaction Ledger</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
               {user.transactions.length === 0 ? (
                  <div className="p-16 text-center">
                      <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-stone-100">
                          <Activity className="w-10 h-10 text-stone-300" />
                      </div>
                      <h3 className="text-lg font-medium text-stone-900">No Activity Yet</h3>
                      <p className="text-stone-500 mt-2 max-w-sm mx-auto">
                          Once your insurance provider processes the payment using your Virtual ACH details, it will appear here.
                      </p>
                  </div>
               ) : (
                  <div className="divide-y divide-stone-100">
                     {user.transactions.map((t) => (
                        <div key={t.id} className="p-5 flex items-center justify-between hover:bg-stone-50 transition-colors group">
                           <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors ${
                                 t.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                 t.status === 'DECLINED' ? 'bg-red-50 text-red-600 border-red-100' :
                                 'bg-green-50 text-green-600 border-green-100 group-hover:bg-white'
                              }`}>
                                 {t.status === 'PENDING' ? <CalendarClock className="w-5 h-5" /> :
                                  t.status === 'DECLINED' ? <AlertCircle className="w-5 h-5" /> :
                                  <CheckCircle2 className="w-5 h-5" />}
                              </div>
                              <div>
                                 <div className="font-bold text-stone-900">{t.description}</div>
                                 <div className="text-xs text-stone-500 mt-0.5 font-medium flex items-center gap-2">
                                    <span>{new Date(t.timestamp).toLocaleDateString()}</span>
                                    <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                                    <span>{new Date(t.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="font-bold text-lg text-stone-900">-${t.amount.toFixed(2)}</div>
                              {t.metadata?.pointsMinted && (
                                <div className="text-xs font-bold text-gold-500">+{t.metadata.pointsMinted} PTS</div>
                              )}
                              <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                                t.status === 'PENDING' ? 'text-orange-500' :
                                t.status === 'DECLINED' ? 'text-red-500' : 'text-green-600'
                              }`}>{t.status}</div>
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* Sidebar Actions */}
         <div className="space-y-6">
            
            {/* AI Advisor Widget */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24" />
               </div>
               <div className="relative z-10">
                 <h3 className="font-serif font-bold text-gold-400 mb-2 flex items-center gap-2">
                   <Sparkles className="w-4 h-4" /> AI Credit Strategist
                 </h3>
                 {!advice ? (
                   <>
                     <p className="text-stone-300 text-sm mb-4">
                       Ask Gemini to analyze your credit profile and suggest the best next step.
                     </p>
                     <Button 
                       onClick={handleAskAdvisor} 
                       disabled={isThinking}
                       variant="primary" 
                       size="sm" 
                       className="w-full bg-gold-500 hover:bg-gold-400 text-stone-900 border-none"
                     >
                       {isThinking ? (
                         <span className="flex items-center gap-2">
                           <Sparkles className="w-4 h-4 animate-spin" /> Thinking...
                         </span>
                       ) : "Generate Strategy"}
                     </Button>
                   </>
                 ) : (
                   <div className="animate-fadeIn">
                     <p className="text-sm text-stone-200 leading-relaxed mb-4 italic">"{advice}"</p>
                     <button onClick={() => setAdvice(null)} className="text-xs text-gold-400 hover:text-gold-300 underline">
                       Ask something else
                     </button>
                   </div>
                 )}
               </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
                <h3 className="font-bold font-serif mb-4 text-stone-900">Quick Actions</h3>
                <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-between bg-stone-50 hover:bg-gold-50 text-stone-600 hover:text-gold-700 border border-stone-100 transition-all group">
                        <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-3 text-stone-400 group-hover:text-gold-500" />
                            View Virtual Card
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-gold-400" />
                    </Button>
                    <Button variant="ghost" className="w-full justify-between bg-stone-50 hover:bg-gold-50 text-stone-600 hover:text-gold-700 border border-stone-100 transition-all group">
                        <div className="flex items-center">
                            <Activity className="w-4 h-4 mr-3 text-stone-400 group-hover:text-gold-500" />
                            Repay Balance
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-gold-400" />
                    </Button>
                </div>
            </div>
            
            {/* Healthy Incentives Widget */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
               <h3 className="font-bold font-serif mb-4 text-stone-900 flex items-center gap-2">
                 <Heart className="w-4 h-4 text-red-500" /> Healthy Incentives
               </h3>
               <div className="space-y-4">
                 {WELLNESS_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between pb-3 border-b border-stone-50 last:border-0 last:pb-0">
                      <div>
                        <div className="text-sm font-medium text-stone-800">{activity.title}</div>
                        <div className="text-xs text-gold-600 font-bold">+{activity.points} PTS</div>
                      </div>
                      {activity.status === 'COMPLETED' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs">Verify</Button>
                      )}
                    </div>
                 ))}
               </div>
               <div className="mt-4 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <Footprints className="w-3 h-3" /> Syncing with Apple Health
                  </div>
               </div>
            </div>
            
            <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl p-6 border border-gold-100 shadow-sm">
                <h3 className="font-bold text-gold-800 text-sm mb-2 font-serif">Credit Builder</h3>
                <p className="text-xs text-gold-700 leading-relaxed mb-4">
                   Your last payment improved your credit utilization ratio by 2%. You are on track to increase your score by 15 points.
                </p>
                <div className="h-1 bg-gold-200 rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-gold-500"></div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};