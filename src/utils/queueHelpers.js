// Utility functions for SmartQueue Engine

// Format double digits for token strings (e.g., A-001)
export const formatTokenNumber = (prefix, number) => {
  const formattedNum = String(number).padStart(3, '0');
  return `${prefix}-${formattedNum}`;
};

// Return current local formatted time string
export const getCurrentTimeString = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Calculate exact number of people ahead of a specific token in the queue
export const getPeopleAheadCount = (queue, tokenNumber) => {
  if (!queue || !tokenNumber) return 0;
  
  const targetToken = queue.find(item => item.tokenNumber === tokenNumber);
  if (!targetToken || targetToken.status !== 'waiting') return 0;

  // Count items with status 'waiting' created before or placed before targetToken
  const targetIndex = queue.findIndex(item => item.tokenNumber === tokenNumber);
  
  return queue
    .slice(0, targetIndex)
    .filter(item => item.status === 'waiting' && item.service === targetToken.service)
    .length;
};

// Dynamic ETA Calculation (in minutes)
export const calculateEstimatedWaitTime = (peopleAhead, avgServiceMinutes = 8, activeCounters = 1) => {
  if (peopleAhead <= 0) return 0;
  const counters = Math.max(1, activeCounters);
  return Math.ceil((peopleAhead * avgServiceMinutes) / counters);
};

// Validate token status transition helper
export const TOKEN_STATUSES = {
  WAITING: 'waiting',
  CALLED: 'called',
  SERVING: 'serving',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
  CANCELLED: 'cancelled',
};