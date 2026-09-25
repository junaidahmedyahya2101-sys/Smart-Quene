import React from 'react';

export default function TokenDisplay({ token, peopleAhead, estimatedWaitMinutes, onCancelToken }) {
  if (!token) return null;

  return (
    <div className="glass-card" style={{
      padding: '2rem',
      maxWidth: '480px',
      margin: '2rem auto 0 auto',
      textAlign: 'center',
      border: 'var(--border-accent)',
      boxShadow: '0 0 30px var(--accent-blue-glow)'
    }}>
      <span style={{
        fontSize: 'var(--font-xs)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--accent-cyan)',
        fontWeight: '700'
      }}>
        Your Digital Token
      </span>

      <div style={{
        fontSize: 'var(--font-giant)',
        fontWeight: '900',
        letterSpacing: '-0.03em',
        color: 'var(--text-main)',
        margin: '0.5rem 0 1rem 0',
        fontFamily: 'monospace'
      }}>
        #{token.tokenNumber}
      </div>

      {/* Real-Time Queue Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        padding: '1rem',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '1.5rem',
        border: 'var(--border-light)'
      }}>
        <div>
          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>PEOPLE AHEAD</p>
          <p style={{ fontSize: 'var(--font-xl)', fontWeight: '700', color: 'var(--accent-blue)' }}>
            {String(peopleAhead).padStart(2, '0')}
          </p>
        </div>

        <div>
          <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)', marginBottom: '0.2rem' }}>ESTIMATED WAIT</p>
          <p style={{ fontSize: 'var(--font-xl)', fontWeight: '700', color: 'var(--status-busy)' }}>
            ~{estimatedWaitMinutes} MIN
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-xs)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <span>Issued: <strong>{token.issueTime}</strong></span>
        <span>Status: <strong style={{ color: 'var(--status-normal)', textTransform: 'uppercase' }}>{token.status}</strong></span>
      </div>

      <button
        onClick={onCancelToken}
        style={{
          padding: '0.5rem 1.25rem',
          backgroundColor: 'transparent',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          color: 'var(--status-high)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontSize: 'var(--font-xs)',
          fontWeight: '600',
          transition: 'all 0.2s ease'
        }}
      >
        Cancel Ticket
      </button>
    </div>
  );
}
