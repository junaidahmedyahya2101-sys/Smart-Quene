// Services offered by the organization
export const SERVICES_DATA = [
  {
    id: 'general',
    name: 'General Consultation',
    code: 'GEN',
    avgServiceTimeMinutes: 5,
    description: 'Inquiries, basic documentation, and routine services',
    icon: '📋'
  },
  {
    id: 'accounts',
    name: 'Accounts & Finance',
    code: 'ACC',
    avgServiceTimeMinutes: 10,
    description: 'Payments, fund transfers, and ledger statements',
    icon: '💳'
  },
  {
    id: 'express',
    name: 'Express Desk',
    code: 'EXP',
    avgServiceTimeMinutes: 3,
    description: 'Quick token validation and single-page verification',
    icon: '⚡'
  },
  {
    id: 'support',
    name: 'Technical Support',
    code: 'SUP',
    avgServiceTimeMinutes: 12,
    description: 'Complex issues, disputes, and detailed assistance',
    icon: '🛠️'
  }
];

// Active Counters
export const COUNTERS_DATA = [
  { id: 1, name: 'Counter 01', assignedStaff: 'Sarah Jenkins', serviceId: 'general' },
  { id: 2, name: 'Counter 02', assignedStaff: 'Alex Rivera', serviceId: 'accounts' },
  { id: 3, name: 'Counter 03', assignedStaff: 'David Kim', serviceId: 'express' }
];

// Initial State of the Queue (Pre-populated for instant testing)
export const INITIAL_QUEUE = [
  {
    tokenNumber: 'GEN-039',
    serviceId: 'general',
    customerName: 'Ahmad Khan',
    status: 'serving', // 'waiting' | 'serving' | 'completed' | 'skipped'
    counterId: 1,
    issueTime: '10:15 AM',
    servedTime: '10:28 AM'
  },
  {
    tokenNumber: 'ACC-012',
    serviceId: 'accounts',
    customerName: 'Fatima Ali',
    status: 'serving',
    counterId: 2,
    issueTime: '10:18 AM',
    servedTime: '10:30 AM'
  },
  {
    tokenNumber: 'GEN-040',
    serviceId: 'general',
    customerName: 'Bilal Hassan',
    status: 'waiting',
    counterId: null,
    issueTime: '10:22 AM'
  },
  {
    tokenNumber: 'EXP-088',
    serviceId: 'express',
    customerName: 'Zainab Noor',
    status: 'waiting',
    counterId: null,
    issueTime: '10:25 AM'
  },
  {
    tokenNumber: 'GEN-041',
    serviceId: 'general',
    customerName: 'Omar Farooq',
    status: 'waiting',
    counterId: null,
    issueTime: '10:27 AM'
  }
];