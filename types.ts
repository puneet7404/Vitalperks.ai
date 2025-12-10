
export enum AppView {
  LANDING = 'LANDING',
  ONBOARDING_SCAN = 'ONBOARDING_SCAN', // Individual
  DASHBOARD = 'DASHBOARD',
  VIRTUAL_DETAILS = 'VIRTUAL_DETAILS',
  EMPLOYER_ONBOARDING = 'EMPLOYER_ONBOARDING', // New B2B Flow
  EMPLOYER_DASHBOARD = 'EMPLOYER_DASHBOARD',
  SCANNER = 'SCANNER',
  ONBOARDING = 'ONBOARDING'
}

export enum UserRole {
  INDIVIDUAL = 'INDIVIDUAL',
  EMPLOYER = 'EMPLOYER'
}

export enum KycStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
  DECLINED = 'DECLINED'
}

export enum TransactionType {
  PREMIUM_PAYMENT = 'PREMIUM_PAYMENT',
  REPAYMENT = 'REPAYMENT',
  REWARD_REDEMPTION = 'REWARD_REDEMPTION'
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  image: string;
  category: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  pointsEarned?: number;
  type: string;
}

export interface BillData {
  providerName: string;
  amountDue: number;
  dueDate: string;
  accountNumber?: string;
  confidence: number;
}

// STEP 1: DATA MODEL & SCHEMA

export interface VirtualAccount {
  id: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  status: 'ACTIVE' | 'FROZEN';
}

export interface InsurancePolicy {
  carrierName: string;
  memberId: string;
  groupId?: string;
  premiumAmount: number;
  paymentDueDate?: string;
  lastVerified: string; // ISO Date
}

export interface LedgerTransaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: string;
  description: string;
  metadata?: {
    merchantName?: string;
    achTraceId?: string;
    pointsMinted?: number;
  };
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  kycStatus: KycStatus;
  
  // Credit Line Logic
  creditLimit: number;
  availableCredit: number;
  currentBalance: number; // Amount owed
  
  // Linked Entities
  virtualAccount?: VirtualAccount;
  policy?: InsurancePolicy;
  
  // Rewards
  pointsBalance: number;
  lifetimePoints: number;
  
  // History
  transactions: LedgerTransaction[];
}

// Employer interface extension
export interface EmployerProfile extends UserProfile {
  companyName: string;
  ein?: string;
  employeeCount: number;
  totalVolume: number;
  engagementScore: number;
}

export type UserState = UserProfile | EmployerProfile;
