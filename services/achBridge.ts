
import { UserProfile, LedgerTransaction, TransactionType, TransactionStatus } from '../types';

/**
 * STEP 2: BACKEND LOGIC (THE BRIDGE)
 * 
 * This service simulates the Node.js backend handler for incoming ACH debits.
 * It enforces the Idempotency and Credit Limit checks.
 */

// Simulated database state
let MOCK_DB_USERS: Record<string, UserProfile> = {};

export const initializeMockUser = (user: UserProfile) => {
  MOCK_DB_USERS[user.virtualAccount?.accountNumber || 'default'] = user;
};

interface ACHResponse {
  status: number; // HTTP Status Code (200 or 402)
  message: string;
  transaction?: LedgerTransaction;
}

/**
 * Handles an incoming ACH Debit request from the "Insurer".
 * This is the core "Bridge" logic.
 */
export const handleIncomingACHDebit = async (
  routingNumber: string,
  accountNumber: string,
  amount: number
): Promise<ACHResponse> => {
  
  console.log(`[ACH BRIDGE] Incoming Debit: $${amount} on Acct: ${accountNumber}`);

  // 1. Lookup User
  const user = MOCK_DB_USERS[accountNumber];
  
  if (!user) {
    console.error(`[ACH BRIDGE] Account not found: ${accountNumber}`);
    return { status: 404, message: 'Account not found' };
  }

  // 2. Idempotency Check (Simplified for prototype: Check if duplicate pending tx exists)
  const isDuplicate = user.transactions.some(
    t => t.amount === amount && 
         t.status === TransactionStatus.PENDING && 
         t.type === TransactionType.PREMIUM_PAYMENT &&
         new Date(t.timestamp).getTime() > Date.now() - 60000 // Within last minute
  );

  if (isDuplicate) {
     console.warn(`[ACH BRIDGE] Duplicate transaction detected.`);
     return { status: 200, message: 'Idempotent success (Duplicate)' };
  }

  // 3. Check Credit Limit Availability
  if (user.availableCredit < amount) {
    console.warn(`[ACH BRIDGE] Insufficient funds. Available: ${user.availableCredit}, Req: ${amount}`);
    
    // Log failed transaction
    const failedTx: LedgerTransaction = {
      id: `tx_${Date.now()}`,
      userId: user.id,
      amount: amount,
      type: TransactionType.PREMIUM_PAYMENT,
      status: TransactionStatus.DECLINED,
      timestamp: new Date().toISOString(),
      description: `Declined: Insufficient Credit`,
    };
    user.transactions.unshift(failedTx);
    
    return { status: 402, message: 'Payment Required: Insufficient Credit Line' };
  }

  // 4. Process Success: Create Transaction & Decrement Credit
  const pointsEarned = Math.floor(amount * 1); // 1x Points
  
  const successTx: LedgerTransaction = {
    id: `tx_${Date.now()}`,
    userId: user.id,
    amount: amount,
    type: TransactionType.PREMIUM_PAYMENT,
    status: TransactionStatus.PENDING, // Pending until settlement
    timestamp: new Date().toISOString(),
    description: `Premium Payment to ${user.policy?.carrierName || 'Insurance Provider'}`,
    metadata: {
      pointsMinted: pointsEarned,
      merchantName: user.policy?.carrierName
    }
  };

  // Update User State (Simulating DB Write)
  user.availableCredit -= amount;
  user.currentBalance += amount;
  user.pointsBalance += pointsEarned;
  user.transactions.unshift(successTx);

  console.log(`[ACH BRIDGE] Success. TxID: ${successTx.id}. New Balance: ${user.currentBalance}`);

  return { 
    status: 200, 
    message: 'Approved',
    transaction: successTx
  };
};
