import React from 'react';

export default function Navbar({ activeTab, setActiveTab, queueLength }) {
  const navItems = [
    { id: 'customer', label: 'Customer Portal' },
    { id: 'display', label: 'Public Display' },
    { id: 'staff', label: 'Staff Desk' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <header style={{
      borderBottom: 'var(--border-light, 1px solid rgba(255, 255, 255, 0.08))',
      background: 'rgba(11, 15, 23, 0.8)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('customer')}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
          }}>
            SQ
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
            SmartQueue
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === item.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: activeTab === item.id ? 'var(--accent-blue, #38bdf8)' : 'var(--text-subtle, #9ca3af)',
                fontWeight: activeTab === item.id ? 600 : 400,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {item.label}
              {item.id === 'customer' && queueLength > 0 && (
                <span style={{
                  background: '#2563eb',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '10px'
                }}>
                  {queueLength}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}