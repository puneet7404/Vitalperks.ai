import React from 'react';
import { Button } from './Button';
import { ArrowRight, CheckCircle, Heart, Shield, TrendingUp, Wallet, Building2, Smartphone, Globe, Lock, Zap, CreditCard, Star, Play, Frown } from 'lucide-react';
import { MARKET_DATA } from '../constants';

interface LandingPageProps {
  onGetStarted: () => void;
  onEmployerStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onEmployerStart }) => {
  return (
    <div className="w-full overflow-hidden font-sans text-stone-900">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 overflow-hidden bg-stone-50">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[800px] h-[800px] bg-gradient-to-br from-gold-100/40 to-orange-50/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[600px] h-[600px] bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gold-200 rounded-full text-gold-600 font-medium text-sm mb-6 shadow-sm backdrop-blur-sm">
                <Star className="w-3 h-3 fill-current" />
                The First Rewards Platform for Healthcare
              </div>
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-6 text-stone-900 tracking-tight">
                Transforming <br/>
                Healthcare Payments into <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">Financial Rewards.</span>
              </h1>
              <p className="text-xl text-stone-600 mb-8 leading-relaxed max-w-lg">
                Revolutionizing the $1.5 trillion industry. Turn your unavoidable insurance payments into credit-building opportunities and valuable rewards.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" onClick={onGetStarted} className="shadow-xl shadow-gold-500/20">
                  Start Earning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3 px-4 py-3">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform text-gold-500">
                      <Play className="w-4 h-4 ml-1 fill-current" />
                   </div>
                   <span className="text-sm font-medium text-stone-500 cursor-pointer hover:text-stone-900">See how it works</span>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-stone-500 border-t border-stone-200/60 pt-6">
                 <div className="flex -space-x-3">
                   <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" className="w-10 h-10 rounded-full border-2 border-stone-50 object-cover" alt="User" />
                   <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" className="w-10 h-10 rounded-full border-2 border-stone-50 object-cover" alt="User" />
                   <div className="w-10 h-10 rounded-full border-2 border-stone-50 bg-gold-100 flex items-center justify-center text-xs font-bold text-gold-700">92%</div>
                 </div>
                 <p className="font-medium">of Americans have coverage but get 0 rewards.</p>
              </div>
            </div>
            
            {/* Right Visuals - 3D Card + Lifestyle Image */}
            <div className="lg:col-span-6 relative perspective-1000">
              <div className="relative z-10 animate-float">
                 {/* Main Image Card */}
                 <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50 border border-white/50 aspect-[4/5] md:aspect-square">
                    <img 
                       src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200" 
                       alt="Woman happy with phone" 
                       className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent"></div>
                    
                    {/* Floating UI Elements over image */}
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg">
                          <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                   <CheckCircle className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-stone-900 text-sm">Premium Paid</span>
                             </div>
                             <span className="text-stone-500 text-xs">Just now</span>
                          </div>
                          <div className="flex justify-between items-end">
                             <div>
                                <div className="text-2xl font-bold text-stone-900">$450.00</div>
                                <div className="text-xs text-stone-500">Blue Cross Blue Shield</div>
                             </div>
                             <div className="text-right">
                                <div className="text-lg font-bold text-gold-500">+450 PTS</div>
                                <div className="text-[10px] font-bold text-gold-600 uppercase tracking-wide bg-gold-50 px-2 py-0.5 rounded-full">Cashback</div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Unrewarded Grudge Purchase Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">The Unrewarded "Grudge Purchase"</h2>
                <p className="text-lg text-stone-600">
                    Americans spend <span className="font-bold text-stone-900">$1.5 trillion</span> annually on private health insurance. 
                    It's a massive monthly expense that offers zero rewards, no credit benefits, and minimal engagement.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "$1.5 Trillion Spend", desc: "Annual private health insurance spending with zero rewards.", icon: <Wallet className="w-6 h-6" /> },
                    { title: "No Credit Benefit", desc: "Payments don't build credit history despite being a major expense.", icon: <TrendingUp className="w-6 h-6" /> },
                    { title: "Zero Gratification", desc: "Premiums offer no instant rewards or positive reinforcement.", icon: <Frown className="w-6 h-6" /> },
                    { title: "Low Engagement", desc: "Loyalty remains minimal due to low perceived value.", icon: <Zap className="w-6 h-6" /> }
                ].map((item, i) => (
                    <div key={i} className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gold-500 mb-6">
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-stone-900">{item.title}</h3>
                        <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* How VitalPerks Works - The Solution */}
      <section className="py-24 bg-stone-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs font-bold rounded-full mb-4">THE VITALPERKS SOLUTION</div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">How It Works</h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
               We've created the first dual-purpose platform that rewards payments while simultaneously building credit history.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-bold text-stone-300">01</div>
               <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                   <CreditCard className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Pay Premiums</h3>
               <p className="text-stone-500 text-sm">Pay health insurance premiums through our platform seamlessly on time every month.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-bold text-stone-300">02</div>
               <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                   <Wallet className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
               <p className="text-stone-500 text-sm">Every payment earns points redeemable for travel, wellness products, or premium discounts.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-bold text-stone-300">03</div>
               <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                   <TrendingUp className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Build Credit</h3>
               <p className="text-stone-500 text-sm">On-time payments are reported to credit bureaus, improving credit scores over time.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 font-serif text-6xl font-bold text-stone-300">04</div>
               <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                   <Heart className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-2">Healthy Incentives</h3>
               <p className="text-stone-500 text-sm">Earn bonus points for healthy actions (gym visits, checkups) tracked through our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING MEMBER BLACK CARD SECTION */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
         {/* Background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-500/20 to-purple-900/20 rounded-full blur-3xl"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="order-2 lg:order-1 relative">
                  {/* CSS for Black Metal Card */}
                   <div className="relative w-full aspect-[1.586/1] max-w-md mx-auto transform hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden bg-gradient-to-br from-stone-800 via-stone-900 to-black border border-stone-700">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                      
                      <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                         <div className="flex justify-between items-start">
                            <div className="text-gold-400 font-serif font-bold text-xl tracking-widest">VitalPerks</div>
                            <div className="text-[10px] font-bold text-stone-500 border border-stone-600 px-2 py-0.5 rounded">FOUNDING MEMBER</div>
                         </div>
                         <div className="flex items-center gap-2">
                             <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded flex items-center justify-center opacity-80">
                                <div className="w-8 h-5 border border-yellow-600/50 rounded-sm"></div>
                             </div>
                         </div>
                         <div className="flex justify-between items-end">
                            <div className="font-mono text-stone-400 text-lg tracking-widest">•••• 8888</div>
                            <div className="text-right">
                               <div className="text-[9px] text-stone-500 uppercase">Member Since</div>
                               <div className="text-sm text-stone-300 font-medium">2024</div>
                            </div>
                         </div>
                      </div>
                   </div>
               </div>
               
               <div className="order-1 lg:order-2">
                   <div className="inline-block px-3 py-1 bg-stone-800 text-gold-400 text-xs font-bold rounded-full mb-4 border border-stone-700">LIMITED AVAILABILITY</div>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-stone-200 to-stone-500">
                      The Founding Member Card
                   </h2>
                   <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                      High-weight metal black card reserved for the first 1,000 users. Unlock <strong>Lifetime 2% Rewards</strong> on all health spend, creating true scarcity and exclusivity.
                   </p>
                   <ul className="space-y-4 mb-10">
                      <li className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500"><Star className="w-4 h-4" /></div>
                         <span className="text-stone-300">Lifetime 2% Cash Back on Premiums</span>
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500"><Shield className="w-4 h-4" /></div>
                         <span className="text-stone-300">Priority Concierge Support</span>
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500"><Lock className="w-4 h-4" /></div>
                         <span className="text-stone-300">Exclusive Metal Card Design</span>
                      </li>
                   </ul>
                   <Button variant="primary" size="lg" className="bg-white text-stone-900 hover:bg-stone-200 border-none">
                      Join the Waitlist
                   </Button>
               </div>
            </div>
         </div>
      </section>

      {/* For Employers Section - High End B2B */}
      <section className="py-24 bg-stone-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="inline-block px-4 py-1.5 bg-stone-200 text-stone-600 font-bold text-xs rounded-full mb-6">
                     PHASE 2: SMALL BUSINESS
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-stone-900 leading-tight">
                    Zero-Cost Health <br/> Payment Benefit
                  </h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                     Targeting SMBs under 50 employees. Offer your team a way to build credit and earn rewards on their health insurance without adding to your bottom line.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                     <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                        <div className="ml-4">
                           <h4 className="font-bold text-lg text-stone-900">Employee Retention</h4>
                           <p className="text-stone-500 text-sm">Provide tangible financial value to your workforce.</p>
                        </div>
                     </div>
                     <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-1" />
                        <div className="ml-4">
                           <h4 className="font-bold text-lg text-stone-900">Zero Administration</h4>
                           <p className="text-stone-500 text-sm">We handle the payments and rewards directly with the employee.</p>
                        </div>
                     </div>
                  </div>

                  <Button variant="primary" size="lg" onClick={onEmployerStart}>
                     For Employers
                  </Button>
               </div>
               
               {/* Visual */}
               <div className="relative">
                   <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
                      alt="Business Meeting" 
                      className="rounded-2xl shadow-2xl"
                   />
                   <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-stone-100 max-w-xs">
                       <div className="flex items-center gap-3 mb-2">
                           <Building2 className="w-5 h-5 text-gold-500" />
                           <span className="font-bold text-stone-900">SMB Partner Program</span>
                       </div>
                       <p className="text-xs text-stone-500">"Finally, a health benefit that doesn't cost the company anything but means everything to the team."</p>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* Global Expansion Map Placeholder */}
      <section className="py-20 bg-white border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <Globe className="w-12 h-12 text-stone-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold font-serif text-stone-900 mb-6">Built for Global Scale</h2>
            <p className="text-stone-600 max-w-2xl mx-auto mb-12">
               VitalPerks is positioned to become "The Bilt for Healthcare", dominating a monthly expense category that has been completely overlooked globally.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
               {['United States', 'Germany', 'United Kingdom', 'Brazil', 'India', 'Singapore'].map((country) => (
                  <span key={country} className="px-5 py-2 bg-stone-50 rounded-full text-sm font-medium text-stone-500 border border-stone-200 shadow-sm">
                     {country}
                  </span>
               ))}
            </div>
         </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-24 bg-stone-50 text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-serif font-bold mb-6 text-stone-900">Ready to transform your premium?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
               <Button variant="primary" size="lg" onClick={onGetStarted}>
                  Create Free Account
               </Button>
               <Button variant="outline" size="lg" onClick={onEmployerStart}>
                  Login as Employer
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
};