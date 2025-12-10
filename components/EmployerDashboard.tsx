import React from 'react';
import { UserState } from '../types';
import { Users, TrendingUp, Award, Download, Building2, DollarSign } from 'lucide-react';
import { Button } from './Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EmployerDashboardProps {
  user: UserState;
}

const ENGAGEMENT_DATA = [
  { month: 'Jan', active: 65 },
  { month: 'Feb', active: 72 },
  { month: 'Mar', active: 78 },
  { month: 'Apr', active: 85 },
  { month: 'May', active: 89 },
  { month: 'Jun', active: 94 },
];

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-gold-500" />
            {user.companyName} Dashboard
          </h1>
          <p className="text-stone-500">Overview of employee engagement and wellness ROI.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" size="sm" className="bg-white"><Download className="w-4 h-4 mr-2"/> Export Report</Button>
            <Button variant="primary" size="sm"><Users className="w-4 h-4 mr-2"/> Invite Employees</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 relative overflow-hidden">
           <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-stone-500 font-medium text-sm">Enrolled</span>
           </div>
           <div className="text-2xl font-bold text-stone-900">{user.employeeCount} <span className="text-sm font-normal text-green-500 ml-1">↑ 12%</span></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
           <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gold-100 text-gold-600 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-stone-500 font-medium text-sm">Rewards</span>
           </div>
           <div className="text-2xl font-bold text-stone-900">{(user.totalVolume || 0).toLocaleString()} <span className="text-sm text-stone-400">PTS</span></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
           <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-stone-500 font-medium text-sm">Engagement</span>
           </div>
           <div className="text-2xl font-bold text-stone-900">{user.engagementScore}% <span className="text-sm font-normal text-stone-400 ml-1">vs 45% Avg</span></div>
        </div>

        {/* ROI Card - Light/Gold */}
        <div className="bg-gradient-to-br from-gold-50 to-white border border-gold-200 p-6 rounded-2xl shadow-sm relative">
           <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-white text-gold-600 rounded-lg shadow-sm">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-gold-700 font-medium text-sm">Est. Savings</span>
           </div>
           <div className="text-2xl font-bold text-stone-900">$14,250</div>
           <div className="text-xs text-stone-500 mt-1">Based on retention & wellness</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
           <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-stone-900">Employee Adoption</h3>
             <select className="text-sm border-none bg-stone-50 rounded-md px-2 py-1 text-stone-600 focus:ring-0">
               <option>Last 6 Months</option>
               <option>Year to Date</option>
             </select>
           </div>
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={ENGAGEMENT_DATA}>
                 <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#9CA3AF" />
                 <YAxis axisLine={false} tickLine={false} stroke="#9CA3AF" />
                 <Tooltip 
                    cursor={{fill: '#F9F1D8'}}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E7E5E4', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#1C1917' }}
                 />
                 <Bar dataKey="active" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Sidebar Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <h3 className="font-bold text-stone-900 mb-4">Live Team Activity</h3>
          <div className="space-y-4">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-stone-50 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-600">
                  {['JD', 'AS', 'MK', 'LR', 'BP'][i-1]}
                </div>
                <div>
                  <div className="text-sm font-medium text-stone-900">
                    {['Verified Premium', 'Redeemed Wellness', 'Hit Step Goal', 'Connected Device', 'Verified Premium'][i-1]}
                  </div>
                  <div className="text-xs text-stone-500">{i * 12} mins ago</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm text-gold-600 hover:text-gold-700 hover:bg-gold-50">View All Activity</Button>
        </div>
      </div>

      {/* B2B Promo - Light */}
      <div className="bg-gradient-to-r from-stone-50 to-white border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-xl font-serif font-bold mb-2 text-stone-900">Connect Your HRIS</h3>
          <p className="text-stone-600 max-w-xl">
            Integrate with Workday, Gusto, or Rippling to automate employee onboarding and roster management.
          </p>
        </div>
        <Button variant="outline" className="text-gold-600 border-gold-400 hover:bg-gold-50">Connect Integration</Button>
      </div>
    </div>
  );
};