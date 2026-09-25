import React, { useState } from 'react';
import { TOKEN_STATUSES } from '../utils/queueHelpers';

const COUNTERS = [
  { id: 'Counter 01', label: 'Counter 01 - General & Med', defaultStatus: 'AVAILABLE' },
  { id: 'Counter 02', label: 'Counter 02 - Lab & Diagnostics', defaultStatus: 'AVAILABLE' },
  { id: 'Counter 03', label: 'Counter 03 - Fast Track & Billing', defaultStatus: 'AVAILABLE' },
];

export default function StaffDesk({ queue, onCallNext, onCompleteToken, onSkipToken }) {
  const [selectedCounter, setSelectedCounter] = useState(COUNTERS[0].id);
  const [counterStatuses, setCounterStatuses] = useState({
    'Counter 01': 'AVAILABLE',
    'Counter 02': 'AVAILABLE',
    'Counter 03': 'AVAILABLE',
  });

  // Find token currently being served at selected counter
  const currentlyServingToken = queue.find(
    item => item.counterId === selectedCounter && item.status === TOKEN_STATUSES.SERVING
  );

  // Filter queue for waiting tokens
  const waitingTokens = queue.filter(item => item.status === TOKEN_STATUSES.WAITING);

  // Smart next customer selection
  const handleCallNextCustomer = () => {
    if (counterStatuses[selectedCounter] === 'PAUSED') return;
    onCallNext(selectedCounter);
    setCounterStatuses(prev => ({ ...prev, [selectedCounter]: 'SERVING' }));
  };

  const handleCompleteCurrent = () => {
    if (!currentlyServingToken) return;
    onCompleteToken(currentlyServingToken.tokenNumber);
    setCounterStatuses(prev => ({ ...prev, [selectedCounter]: 'AVAILABLE' }));
  };

  const handleSkipCurrent = () => {
    if (!currentlyServingToken) return;
    onSkipToken(currentlyServingToken.tokenNumber);
    setCounterStatuses(prev => ({ ...prev, [selectedCounter]: 'AVAILABLE' }));
  };

  const toggleCounterPause = () => {
    setCounterStatuses(prev => ({
      ...prev,
      [selectedCounter]: prev[selectedCounter] === 'PAUSED' ? 'AVAILABLE' : 'PAUSED'
    }));
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Staff Desk Operations</h1>
        <p style={{ color: 'var(--text-subtle, #9ca3af)', fontSize: '0.95rem' }}>
          Select your assigned counter to manage customer calls, complete sessions, or pause operations.
        </p>
      </div>

      {/* Counter Selector Strip */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        {COUNTERS.map(counter => {
          const isSelected = selectedCounter === counter.id;
          const status = counterStatuses[counter.id];
          const servingToken = queue.find(t => t.counterId === counter.id && t.status === TOKEN_STATUSES.SERVING);

          return (
            <div
              key={counter.id}
              onClick={() => setSelectedCounter(counter.id)}
              className="glass-card"
              style={{
                padding: '1rem',
                cursor: 'pointer',
                border: isSelected ? '1px solid var(--accent-blue, #38bdf8)' : '1px solid rgba(255,255,255,0.08)',
                background: isSelected ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{counter.id}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  background: status === 'PAUSED' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
                  color: status === 'PAUSED' ? '#f87171' : '#4ade80'
                }}>
                  {status}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                Serving: <strong style={{ color: '#fff' }}>{servingToken ? servingToken.tokenNumber : 'None'}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Counter Operational Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Active Counter Console */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Active Console ({selectedCounter})</h2>
              <button
                onClick={toggleCounterPause}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  background: counterStatuses[selectedCounter] === 'PAUSED' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
                  color: counterStatuses[selectedCounter] === 'PAUSED' ? '#4ade80' : '#f87171',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer'
                }}
              >
                {counterStatuses[selectedCounter] === 'PAUSED' ? 'Resume Counter' : 'Pause Counter'}
              </button>
            </div>

            {currentlyServingToken ? (
              <div style={{ textAlign: 'center', margin: '2rem 0', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Currently Serving</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '2px' }}>
                  {currentlyServingToken.tokenNumber}
                </div>
                <div style={{ color: '#e5e7eb', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {currentlyServingToken.service}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  Joined: {currentlyServingToken.joinedTime}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💤</div>
                <div>Counter is currently available.</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Click "Call Next Customer" to serve the next token.</div>
              </div>
            )}
          </div>

          {/* Operational Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              onClick={handleCallNextCustomer}
              disabled={currentlyServingToken !== undefined || waitingTokens.length === 0 || counterStatuses[selectedCounter] === 'PAUSED'}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                cursor: currentlyServingToken || waitingTokens.length === 0 ? 'not-allowed' : 'pointer',
                opacity: currentlyServingToken || waitingTokens.length === 0 ? 0.5 : 1
              }}
            >
              Call Next Customer ({waitingTokens.length} Waiting)
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={handleCompleteCurrent}
                disabled={!currentlyServingToken}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  color: '#38bdf8',
                  fontWeight: 600,
                  cursor: !currentlyServingToken ? 'not-allowed' : 'pointer',
                  opacity: !currentlyServingToken ? 0.4 : 1
                }}
              >
                Complete
              </button>
              <button
                onClick={handleSkipCurrent}
                disabled={!currentlyServingToken}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  fontWeight: 600,
                  cursor: !currentlyServingToken ? 'not-allowed' : 'pointer',
                  opacity: !currentlyServingToken ? 0.4 : 1
                }}
              >
                Skip
              </button>
            </div>
          </div>
        </div>

        {/* Live Waiting Queue Monitor Panel */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>
            Live Queue ({waitingTokens.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '380px', overflowY: 'auto' }}>
            {waitingTokens.length > 0 ? (
              waitingTokens.map((item, idx) => (
                <div
                  key={item.id || item.tokenNumber}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    background: idx === 0 ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                    border: idx === 0 ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{item.tokenNumber}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{item.service}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: idx === 0 ? '#38bdf8' : '#9ca3af',
                      fontWeight: idx === 0 ? 700 : 400
                    }}>
                      {idx === 0 ? 'Next in Line' : `Position #${idx + 1}`}
                    </span>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Joined {item.joinedTime}</div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                No customers currently in waiting line.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}