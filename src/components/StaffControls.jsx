import React from 'react';

export default function StaffControls({ activeCounter, currentServingToken, waitingCount, onCallNext, onCompleteToken, onSkipToken }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase' }}>
            Active Station
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {activeCounter.name} <span style={{ fontSize: 'var(--font-sm)', color: 'var(--text-subtle)', fontWeight: 'normal' }}>({activeCounter.assignedStaff})</span>
          </h2>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)' }}>WAITING IN QUEUE</span>
          <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--status-busy)' }}>{waitingCount}</p>
        </div>
      </div>

      {/* Currently Serving Display */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: 'var(--border-accent)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.5rem',
        textAlign: 'center',
        marginBottom: '1.5rem'
      }}>
        <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>CURRENTLY SERVING AT COUNTER</p>
        <div style={{
          fontSize: '3rem',
          fontWeight: '900',
          fontFamily: 'monospace',
          color: currentServingToken ? 'var(--status-normal)' : 'var(--text-subtle)',
          margin: '0.25rem 0'
        }}>
          {currentServingToken ? `#${currentServingToken.tokenNumber}` : 'NONE'}
        </div>
        {currentServingToken && (
          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
            Customer: {currentServingToken.customerName} • Called at {currentServingToken.servedTime}
          </p>
        )}
      </div>

      {/* Operator Actions Grid */}
      <div className="staff-action-buttons" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <button
          onClick={onCallNext}
          disabled={waitingCount === 0}
          style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: waitingCount > 0 ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
            color: waitingCount > 0 ? '#000' : 'var(--text-subtle)',
            fontWeight: '700',
            cursor: waitingCount > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease'
          }}
        >
          Call Next
        </button>

        <button
          onClick={onCompleteToken}
          disabled={!currentServingToken}
          style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: currentServingToken ? 'var(--status-normal-bg)' : 'rgba(255,255,255,0.05)',
            color: currentServingToken ? 'var(--status-normal)' : 'var(--text-subtle)',
            fontWeight: '700',
            border: currentServingToken ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
            cursor: currentServingToken ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease'
          }}
        >
          Complete
        </button>

        <button
          onClick={onSkipToken}
          disabled={!currentServingToken}
          style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            backgroundColor: currentServingToken ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.05)',
            color: currentServingToken ? 'var(--status-high)' : 'var(--text-subtle)',
            fontWeight: '700',
            border: currentServingToken ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
            cursor: currentServingToken ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease'
          }}
        >
          Skip / Absent
        </button>
      </div>
    </div>
  );
}