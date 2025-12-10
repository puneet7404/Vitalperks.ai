
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { EmployerDashboard } from './components/EmployerDashboard';
import { OnboardingScanner } from './components/OnboardingScanner';
import { VirtualCardDetails } from './components/VirtualCardDetails';
import { EmployerOnboarding } from './components/EmployerOnboarding'; // Import new flow
import { AppView, UserProfile, UserRole, KycStatus, InsurancePolicy, EmployerProfile } from './types';
import { initializeMockUser } from './services/achBridge';
import { Button } from './components/Button';
import { User, Building2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<UserProfile | EmployerProfile | null>(null);

  const handleOnboardingComplete = (policy: InsurancePolicy) => {
    // Create the full user profile after scanning
    const newUser: UserProfile = {
      id: 'usr_' + Math.floor(Math.random() * 10000),
      role: UserRole.INDIVIDUAL,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      kycStatus: KycStatus.VERIFIED,
      
      // The "Credit Line"
      creditLimit: 5000,
      availableCredit: 5000,
      currentBalance: 0,
      
      // The "Virtual ACH"
      virtualAccount: {
        id: 'va_999',
        routingNumber: '123456789',
        accountNumber: '9876543210',
        bankName: 'Evolve Bank & Trust', // Common fintech partner
        status: 'ACTIVE'
      },
      
      policy: policy,
      
      pointsBalance: 500, // Welcome bonus
      lifetimePoints: 500,
      transactions: []
    };

    setUser(newUser);
    initializeMockUser(newUser); // Sync with "Backend"
    setCurrentView(AppView.VIRTUAL_DETAILS); // Show them their new "card" immediately
  };

  const handleEmployerComplete = (employerData: Partial<EmployerProfile>) => {
    const newEmployer: EmployerProfile & any = {
      id: 'emp_' + Math.floor(Math.random() * 10000),
      role: UserRole.EMPLOYER,
      name: 'Corporate Admin',
      email: 'admin@' + (employerData.companyName?.replace(/\s/g, '').toLowerCase() || 'company') + '.com',
      kycStatus: KycStatus.VERIFIED,
      
      companyName: employerData.companyName || 'Unknown Corp',
      employeeCount: employerData.employeeCount || 1,
      totalVolume: 0,
      engagementScore: 0,
      
      // Treasury Limits
      creditLimit: 250000,
      availableCredit: 250000,
      currentBalance: 0,
      
      pointsBalance: 0,
      lifetimePoints: 0,
      transactions: []
    };
    
    setUser(newEmployer);
    setCurrentView(AppView.EMPLOYER_DASHBOARD);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING:
        return (
          <LandingPage 
            onGetStarted={() => setCurrentView(AppView.ONBOARDING_SCAN)} 
            onEmployerStart={() => setCurrentView(AppView.EMPLOYER_ONBOARDING)} 
          />
        );
      
      // Individual Flow
      case AppView.ONBOARDING_SCAN:
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-stone-50">
             <div className="mb-8 text-center max-w-md">
                <h1 className="text-3xl font-serif font-bold mb-4">Let's get you set up</h1>
                <p className="text-stone-600">First, we need to verify your ID and link your insurance policy. Our AI makes this instant.</p>
             </div>
             <OnboardingScanner onComplete={handleOnboardingComplete} />
          </div>
        );

      // Employer Flow
      case AppView.EMPLOYER_ONBOARDING:
        return <EmployerOnboarding onComplete={handleEmployerComplete} />;

      case AppView.DASHBOARD:
        return user ? <Dashboard user={user} /> : <div />;
        
      case AppView.EMPLOYER_DASHBOARD:
        return user ? <EmployerDashboard user={user} /> : <div />;
        
      case AppView.VIRTUAL_DETAILS:
        return user?.virtualAccount ? (
           <div className="max-w-2xl mx-auto py-12 px-4">
              <div className="text-center mb-10">
                 <h2 className="text-3xl font-serif font-bold mb-4">Your Virtual Payment Bridge</h2>
                 <p className="text-stone-600">
                    Enter these details into your <strong>{user.policy?.carrierName}</strong> payment portal. 
                    We'll pay the bill, you earn the points.
                 </p>
              </div>
              <VirtualCardDetails account={user.virtualAccount} />
              <div className="mt-12 text-center">
                 <Button onClick={() => setCurrentView(AppView.DASHBOARD)} size="lg">
                    Go to Dashboard
                 </Button>
              </div>
           </div>
        ) : <div>Loading...</div>;

      default:
        return <LandingPage onGetStarted={() => setCurrentView(AppView.ONBOARDING_SCAN)} onEmployerStart={() => setCurrentView(AppView.EMPLOYER_ONBOARDING)} />;
    }
  };

  return (
    <Layout 
      user={user} 
      currentView={currentView}
      onNavigate={setCurrentView}
      onLogout={() => { setUser(null); setCurrentView(AppView.LANDING); }}
    >
      {renderContent()}
    </Layout>
  );
}
