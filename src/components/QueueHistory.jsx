import React from 'react';

export default function QueueHistory({ queue }) {
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'completed':
        return { background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)' };
      case 'serving':
        return { background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' };
      case 'cancelled':
        return { background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' };
      case 'skipped':
        return { background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)' };
      default:
        return { background: 'rgba(156, 163, 175, 0.15)', color: '#cbd5e1', border: '1px solid rgba(156, 163, 175, 0.3)' };
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>
        Queue Audit Log & Traceability
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Token</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Service</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Counter</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Joined</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Served</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {queue.map(item => (
              <tr key={item.id || item.tokenNumber} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: '#fff' }}>{item.tokenNumber}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#cbd5e1' }}>{item.service}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#9ca3af' }}>{item.counterId || '—'}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#9ca3af' }}>{item.joinedTime}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#9ca3af' }}>{item.servedTime || '—'}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '12px',
                    ...getStatusBadgeStyle(item.status)
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}