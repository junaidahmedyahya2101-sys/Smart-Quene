import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CustomerPortal from './pages/CustomerPortal';
import StaffDesk from './pages/StaffDesk';
import Analytics from './pages/Analytics';
import PublicDisplay from './pages/PublicDisplay';
import { INITIAL_QUEUE } from './data/mockData';
import { getCurrentTimeString } from './utils/queueHelpers';
import { useGsapFadeIn } from './hooks/useGsapFadeIn';

export default function App() {
  const [activeTab, setActiveTab] = useState('customer');
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [myToken, setMyToken] = useState(null);

  const viewContainerRef = useGsapFadeIn([activeTab]);

  const handleGenerateToken = (newToken) => {
    setQueue(prev => [...prev, newToken]);
    setMyToken(newToken);
  };

  const handleCancelToken = () => {
    if (!myToken) return;
    setQueue(prev => prev.map(item => 
      item.tokenNumber === myToken.tokenNumber 
        ? { ...item, status: 'cancelled' } 
        : item
    ));
    setMyToken(null);
  };

  const handleCallNext = (counterId) => {
    setQueue(prev => {
      const firstWaiting = prev.find(item => item.status === 'waiting');
      if (!firstWaiting) return prev;

      return prev.map(item => {
        if (item.tokenNumber === firstWaiting.tokenNumber) {
          return {
            ...item,
            status: 'serving',
            counterId,
            servedTime: getCurrentTimeString()
          };
        }
        return item;
      });
    });
  };

  const handleCompleteToken = (tokenNumber) => {
    if (!tokenNumber) return;
    setQueue(prev => prev.map(item => 
      item.tokenNumber === tokenNumber ? { ...item, status: 'completed' } : item
    ));
  };

  const handleSkipToken = (tokenNumber) => {
    if (!tokenNumber) return;
    setQueue(prev => prev.map(item => 
      item.tokenNumber === tokenNumber ? { ...item, status: 'skipped' } : item
    ));
  };

  const waitingCount = queue.filter(item => item.status === 'waiting').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        queueLength={waitingCount}
      />

      <main 
        ref={viewContainerRef}
        style={{ flex: 1, padding: '0 1.5rem 2rem 1.5rem', maxWidth: '1280px', width: '100%', margin: '0 auto' }}
      >
        {activeTab === 'customer' && (
          <CustomerPortal
            queue={queue}
            onGenerateToken={handleGenerateToken}
            onCancelToken={handleCancelToken}
            myToken={myToken}
          />
        )}

        {activeTab === 'display' && (
          <PublicDisplay queue={queue} />
        )}

        {activeTab === 'staff' && (
          <StaffDesk
            queue={queue}
            onCallNext={handleCallNext}
            onCompleteToken={handleCompleteToken}
            onSkipToken={handleSkipToken}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics queue={queue} />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        borderTop: 'var(--border-light, 1px solid rgba(255,255,255,0.08))',
        fontSize: 'var(--font-xs, 0.75rem)',
        color: 'var(--text-subtle, #9ca3af)'
      }}>
        SmartQueue Product • Digital Queue Management Platform • JAY Labs
      </footer>
    </div>
  );
}