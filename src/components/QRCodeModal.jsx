import React from 'react';

export default function QRCodeModal({ token, onClose }) {
  if (!token) return null;

  // Encoded shareable live tracking URI
  const shareUrl = `${window.location.origin}/?token=${token.tokenNumber}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-card" style={{
        padding: '2rem',
        maxWidth: '380px',
        width: '90%',
        textAlign: 'center',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem', color: '#fff' }}>
          Mobile Queue Pass
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
          Scan with your phone camera to monitor position in real-time.
        </p>

        <div style={{
          background: '#fff',
          padding: '1rem',
          borderRadius: '12px',
          display: 'inline-block',
          marginBottom: '1rem'
        }}>
          <img src={qrImageUrl} alt={`QR Code for ${token.tokenNumber}`} style={{ width: '180px', height: '180px', display: 'block' }} />
        </div>

        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem' }}>
          {token.tokenNumber}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
          {token.service}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Close Pass
        </button>
      </div>
    </div>
  );
}