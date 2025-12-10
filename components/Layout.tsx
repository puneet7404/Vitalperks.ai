import React from 'react';
import { UserState, AppView, UserRole } from '../types';
import { Button } from './Button';
import { LogOut, Wallet, Building2, UserCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: UserState | null;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, currentView, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-dark-900 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => onNavigate(user ? (user.role === UserRole.EMPLOYER ? AppView.EMPLOYER_DASHBOARD : AppView.DASHBOARD) : AppView.LANDING)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-white font-serif font-bold shadow-lg">
                V
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-dark-900">
                Vital<span className="text-gold-500">Perks</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center gap-6 mr-4">
                    {user.role === UserRole.INDIVIDUAL ? (
                      <>
                        <button 
                          onClick={() => onNavigate(AppView.DASHBOARD)}
                          className={`text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'text-gold-600' : 'text-gray-600 hover:text-dark-900'}`}
                        >
                          Dashboard
                        </button>
                        <button 
                          onClick={() => onNavigate(AppView.SCANNER)}
                          className={`text-sm font-medium transition-colors ${currentView === AppView.SCANNER ? 'text-gold-600' : 'text-gray-600 hover:text-dark-900'}`}
                        >
                          Scan Bill
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => onNavigate(AppView.EMPLOYER_DASHBOARD)}
                          className={`text-sm font-medium transition-colors ${currentView === AppView.EMPLOYER_DASHBOARD ? 'text-gold-600' : 'text-gray-600 hover:text-dark-900'}`}
                        >
                          Overview
                        </button>
                        <button 
                          className="text-sm font-medium text-gray-400 cursor-not-allowed"
                        >
                          Employees
                        </button>
                        <button 
                          className="text-sm font-medium text-gray-400 cursor-not-allowed"
                        >
                          Settings
                        </button>
                      </>
                    )}
                  </div>
                  
                  {user.role === UserRole.INDIVIDUAL ? (
                    <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">
                      <Wallet className="w-4 h-4 text-gold-500" />
                      <span className="font-bold text-dark-900">{user.points?.toLocaleString()}</span>
                      <span className="text-xs text-stone-500 font-medium">PTS</span>
                    </div>
                  ) : (
                     <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 shadow-sm">
                      <Building2 className="w-4 h-4 text-gold-500" />
                      <span className="font-bold text-dark-900 text-sm">{user.companyName}</span>
                    </div>
                  )}
                  
                  <button onClick={onLogout} className="p-2 text-stone-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={() => onNavigate(AppView.ONBOARDING)}>Log in</Button>
                  <Button variant="primary" size="sm" onClick={() => onNavigate(AppView.ONBOARDING)}>Get Started</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-stone-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-white text-xs font-serif font-bold">V</div>
                <span className="font-serif font-bold text-dark-900">VitalPerks</span>
             </div>
             <p className="text-stone-500 text-sm">Turning health insurance into a rewarding experience.</p>
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <span className="cursor-pointer hover:text-dark-900 transition-colors">Individuals</span>
            <span className="cursor-pointer hover:text-dark-900 transition-colors">Employers</span>
            <span className="cursor-pointer hover:text-dark-900 transition-colors">Privacy</span>
          </div>
          <div className="text-stone-400 text-sm">
            &copy; 2024 VitalPerks Inc.
          </div>
        </div>
      </footer>
    </div>
  );
};