import React from 'react';
import { TOKEN_STATUSES } from '../utils/queueHelpers';

export default function PublicDisplay({ queue }) {
  // Tokens currently being served across all counters
  const servingTokens = queue.filter(item => item.status === TOKEN_STATUSES.SERVING);

  // Tokens waiting next in line
  const upcomingTokens = queue
    .filter(item => item.status === TOKEN_STATUSES.WAITING)
    .slice(0, 6);

  return (
    <div style={{ padding: '1rem 0' }}>
      {/* High-visibility Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        padding: '1rem 1.5rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: 'var(--radius-md, 12px)',
        border: '1px solid rgba(56, 189, 248, 0.2)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
            SMARTQUEUE <span style={{ color: 'var(--accent-blue, #38bdf8)', fontWeight: 400 }}>| Live Display</span>
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.2rem' }}>
            Please proceed to your counter when your token is called.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(34, 197, 94, 0.15)', 
            color: '#4ade80', 
            padding: '0.4rem 0.8rem', 
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
            SYSTEM LIVE
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        
        {/* Main "NOW SERVING" Grid */}
        <div style={{ gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Now Serving
          </h2>

          {servingTokens.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {servingTokens.map(token => (
                <div
                  key={token.id || token.tokenNumber}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    border: '2px solid var(--accent-blue, #38bdf8)',
                    background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)',
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.2)'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>
                    Token
                  </div>
                  <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#fff', letterSpacing: '3px', margin: '0.2rem 0' }}>
                    {token.tokenNumber}
                  </div>
                  <div style={{ 
                    display: 'inline-block', 
                    padding: '0.5rem 1.25rem', 
                    background: '#0284c7', 
                    color: '#fff', 
                    fontWeight: 800, 
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    marginTop: '0.5rem'
                  }}>
                    {token.counterId || 'COUNTER 01'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.75rem' }}>
                    {token.service}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', color: '#6b7280' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#9ca3af' }}>No Active Tokens Being Served</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Counters are currently waiting for next callers.</div>
            </div>
          )}
        </div>

        {/* "NEXT IN LINE" Sidebar List */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#9ca3af', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Next in Line
          </h2>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            {upcomingTokens.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {upcomingTokens.map((token, idx) => (
                  <div
                    key={token.id || token.tokenNumber}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      background: idx === 0 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: idx === 0 ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{token.tokenNumber}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{token.service}</div>
                    </div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 700, 
                      color: idx === 0 ? '#38bdf8' : '#6b7280',
                      background: 'rgba(0,0,0,0.2)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '12px'
                    }}>
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                Waiting queue is currently empty.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}