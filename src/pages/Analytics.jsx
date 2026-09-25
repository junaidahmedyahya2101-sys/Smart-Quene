import React from 'react';
import QueueHistory from '../components/QueueHistory';

export default function Analytics({ queue }) {
  const totalTokens = queue.length;
  const completedTokens = queue.filter(t => t.status === 'completed').length;
  const servingTokens = queue.filter(t => t.status === 'serving').length;
  const waitingTokens = queue.filter(t => t.status === 'waiting').length;
  const cancelledTokens = queue.filter(t => t.status === 'cancelled').length;

  const completionRate = totalTokens > 0 ? Math.round((completedTokens / totalTokens) * 100) : 0;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Analytics & System Metrics</h1>
        <p style={{ color: 'var(--text-subtle, #9ca3af)', fontSize: '0.95rem' }}>
          Real-time queue performative throughput and operational audit history.
        </p>
      </div>

      {/* High-Level Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Total Issued</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '0.25rem' }}>{totalTokens}</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Completed</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4ade80', marginTop: '0.25rem' }}>{completedTokens}</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Currently Serving</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.25rem' }}>{servingTokens}</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Waiting</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginTop: '0.25rem' }}>{waitingTokens}</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Completion Rate</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a7f3d0', marginTop: '0.25rem' }}>{completionRate}%</div>
        </div>
      </div>

      {/* Detailed Queue Traceability Audit Table */}
      <QueueHistory queue={queue} />
    </div>
  );
}