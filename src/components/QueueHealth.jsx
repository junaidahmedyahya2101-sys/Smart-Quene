import React from 'react';

export default function QueueHealth({ queue }) {
  const waitingCount = queue.filter(item => item.status === 'waiting').length;
  const completedCount = queue.filter(item => item.status === 'completed').length;

  // Load percentage calculation based on baseline capacity (e.g., 10 waiting = 100% capacity)
  const loadPercentage = Math.min(Math.round((waitingCount / 10) * 100), 100);

  // Status classification
  let statusText = 'NORMAL';
  let statusBg = 'var(--status-normal-bg)';
  let statusColor = 'var(--status-normal)';
  let recommendation = 'Optimal flow. System operating under normal parameters.';

  if (loadPercentage > 75) {
    statusText = 'HIGH LOAD';
    statusBg = 'var(--status-high-bg)';
    statusColor = 'var(--status-high)';
    recommendation = 'Recommendation: Consider opening additional service counters immediately.';
  } else if (loadPercentage > 40) {
    statusText = 'BUSY';
    statusBg = 'var(--status-busy-bg)';
    statusColor = 'var(--status-busy)';
    recommendation = 'Moderate queue build-up. Monitor counter performance.';
  }

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            System Intelligence
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
            Live Queue Load & Capacity
          </h2>
        </div>

        <div style={{
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          backgroundColor: statusBg,
          color: statusColor,
          fontWeight: '700',
          fontSize: 'var(--font-xs)',
          letterSpacing: '0.05em'
        }}>
          {statusText} ({loadPercentage}%)
        </div>
      </div>

      {/* Dynamic Progress Meter */}
      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '5px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: `${loadPercentage}%`,
          height: '100%',
          backgroundColor: statusColor,
          transition: 'width 0.4s ease, background-color 0.4s ease'
        }} />
      </div>

      {/* Contextual Intelligence Bar */}
      <div style={{
        fontSize: 'var(--font-xs)',
        color: 'var(--text-muted)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)',
        border: 'var(--border-light)'
      }}>
        <strong style={{ color: 'var(--accent-cyan)' }}>AI Recommendation: </strong>
        {recommendation}
      </div>
    </div>
  );
}