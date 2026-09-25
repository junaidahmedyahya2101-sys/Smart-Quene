import React from 'react';

export default function ServiceSelector({ services, selectedService, onSelectService }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Select a Service
        </h2>
        <p style={{ fontSize: 'var(--font-sm)', color: 'var(--text-muted)' }}>
          Choose the department or service counter you wish to visit
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem'
      }}>
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="glass-card"
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: isSelected ? 'var(--border-accent)' : 'var(--border-light)',
                backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-glass)',
                boxShadow: isSelected ? '0 0 20px var(--accent-blue-glow)' : 'var(--shadow-card)',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{service.icon}</span>
                <span style={{
                  fontSize: 'var(--font-xs)',
                  fontWeight: '600',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'var(--accent-cyan)'
                }}>
                  ~{service.avgServiceTimeMinutes} min / person
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                {service.name}
              </h3>
              <p style={{ fontSize: 'var(--font-xs)', color: 'var(--text-subtle)', lineHeight: '1.4' }}>
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}