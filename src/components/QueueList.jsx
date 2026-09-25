import React from 'react';

export default function QueueList({ queue }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>
        Live Queue Monitor
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {queue.map(item => {
          let badgeBg = 'rgba(255, 255, 255, 0.05)';
          let badgeColor = 'var(--text-muted)';

          if (item.status === 'serving') {
            badgeBg = 'var(--status-normal-bg)';
            badgeColor = 'var(--status-normal)';
          } else if (item.status === 'completed') {
            badgeBg = 'rgba(56, 189, 248, 0.15)';
            badgeColor = 'var(--accent-blue)';
          } else if (item.status === 'skipped') {
            badgeBg = 'var(--status-high-bg)';
            badgeColor = 'var(--status-high)';
          }

          return (
            <div
              key={item.tokenNumber}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                backgroundColor: item.status === 'serving' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'var(--radius-sm)',
                border: item.status === 'serving' ? '1px solid rgba(16, 185, 129, 0.3)' : 'var(--border-light)'
              }}
            >
              <div>
                <span style={{ fontSize: '1rem', fontWeight: '800', fontFamily: 'monospace', color: 'var(--text-main)', marginRight: '1rem' }}>
                  #{item.tokenNumber}
                </span>
                <span style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)' }}>
                  {item.customerName} • {item.issueTime}
                </span>
              </div>

              <span style={{
                fontSize: 'var(--font-xs)',
                fontWeight: '700',
                textTransform: 'uppercase',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                backgroundColor: badgeBg,
                color: badgeColor
              }}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}