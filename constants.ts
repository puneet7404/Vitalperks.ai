import { Reward, Transaction } from './types';

export const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    title: 'Bali Wellness Retreat',
    cost: 50000,
    image: 'https://picsum.photos/400/300?random=1',
    category: 'TRAVEL'
  },
  {
    id: '2',
    title: '$100 Whole Foods Gift Card',
    cost: 10000,
    image: 'https://picsum.photos/400/300?random=2',
    category: 'WELLNESS'
  },
  {
    id: '3',
    title: 'Premium Credit: $50 Off',
    cost: 5000,
    image: 'https://picsum.photos/400/300?random=3',
    category: 'CASHBACK'
  },
  {
    id: '4',
    title: 'Equinox 1-Month Pass',
    cost: 15000,
    image: 'https://picsum.photos/400/300?random=4',
    category: 'WELLNESS'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    date: '2023-10-15',
    description: 'Welcome Bonus',
    amount: 0,
    pointsEarned: 1000,
    type: 'BONUS'
  }
];

export const WELLNESS_ACTIVITIES = [
  { id: 1, title: 'Annual Physical Checkup', points: 5000, status: 'PENDING' },
  { id: 2, title: 'Hit 10k Steps (Avg)', points: 500, status: 'COMPLETED' },
  { id: 3, title: 'Flu Shot Verification', points: 1000, status: 'PENDING' },
];

export const MARKET_DATA = [
  { name: 'Annual Spend', value: 1.5, unit: 'Trillion', fill: '#D4AF37' },
  { name: 'Out-of-Pocket', value: 0.5, unit: 'Trillion', fill: '#A08015' },
];