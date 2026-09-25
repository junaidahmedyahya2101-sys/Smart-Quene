import React, { useState } from 'react';
import { getPeopleAheadCount, calculateEstimatedWaitTime, TOKEN_STATUSES } from '../utils/queueHelpers';

const SERVICES = [
    { id: 'gen', name: 'General Consultation', prefix: 'A', avgTime: 8 },
    { id: 'lab', name: 'Laboratory & Diagnostics', prefix: 'B', avgTime: 5 },
    { id: 'bil', name: 'Billing & Payments', prefix: 'C', avgTime: 3 },
    { id: 'phar', name: 'Pharmacy Service', prefix: 'D', avgTime: 4 },
];

import QRCodeModal from '../components/QRCodeModal';

export default function CustomerPortal({ queue, onGenerateToken, onCancelToken, myToken }) {
    const [selectedService, setSelectedService] = useState(SERVICES[0]);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [showQR, setShowQR] = useState(false);

    // Derive live active state for current user's token from overall queue
    const liveToken = myToken ? queue.find(t => t.tokenNumber === myToken.tokenNumber) || myToken : null;

    const peopleAhead = liveToken ? getPeopleAheadCount(queue, liveToken.tokenNumber) : 0;
    const estimatedWait = liveToken ? calculateEstimatedWaitTime(peopleAhead, selectedService.avgTime, 1) : 0;

    const handleIssueToken = () => {
        const serviceQueue = queue.filter(t => t.service === selectedService.name);
        const tokenSeq = serviceQueue.length + 1;
        const formattedNum = `${selectedService.prefix}-${String(tokenSeq).padStart(3, '0')}`;

        const newToken = {
            id: Date.now().toString(),
            tokenNumber: formattedNum,
            service: selectedService.name,
            status: TOKEN_STATUSES.WAITING,
            counterId: null,
            joinedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            servedTime: null
        };

        onGenerateToken(newToken);
    };

    const handleConfirmCancel = () => {
        onCancelToken();
        setShowCancelConfirm(false);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case TOKEN_STATUSES.CALLED: return 'status-called';
            case TOKEN_STATUSES.SERVING: return 'status-serving';
            case TOKEN_STATUSES.COMPLETED: return 'status-completed';
            case TOKEN_STATUSES.CANCELLED: return 'status-cancelled';
            case TOKEN_STATUSES.SKIPPED: return 'status-skipped';
            default: return 'status-waiting';
        }
    };

    return (
        <div style={{ padding: '1rem 0' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Customer Queue Portal</h1>
                <p style={{ color: 'var(--text-subtle, #9ca3af)', fontSize: '0.95rem' }}>
                    Select a service to request your digital token and track your position in real-time.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

                {/* Token Request Panel */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>Select Service</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {SERVICES.map(service => (
                            <button
                                key={service.id}
                                onClick={() => setSelectedService(service)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-sm, 8px)',
                                    border: selectedService.id === service.id
                                        ? '1px solid var(--accent-blue, #38bdf8)'
                                        : '1px solid rgba(255,255,255,0.08)',
                                    background: selectedService.id === service.id
                                        ? 'rgba(56, 189, 248, 0.12)'
                                        : 'rgba(255,255,255,0.02)',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600 }}>{service.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle, #9ca3af)' }}>
                                        Est. {service.avgTime} mins / person
                                    </div>
                                </div>
                                <span style={{
                                    fontWeight: 700,
                                    color: selectedService.id === service.id ? 'var(--accent-blue, #38bdf8)' : '#9ca3af'
                                }}>
                                    {service.prefix}
                                </span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleIssueToken}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            borderRadius: 'var(--radius-sm, 8px)',
                            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                        }}
                    >
                        Get Digital Token
                    </button>
                </div>

                {/* Live Token Status Tracking Panel */}
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>Your Active Token</h2>

                    {liveToken ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>{liveToken.service}</span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '20px',
                                        background: liveToken.status === 'serving' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                        color: liveToken.status === 'serving' ? '#4ade80' : '#38bdf8',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {liveToken.status}
                                    </span>
                                </div>

                                <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase', tracking: '0.05em' }}>
                                        Token Number
                                    </div>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#f3f4f6', letterSpacing: '2px' }}>
                                        {liveToken.tokenNumber}
                                    </div>
                                    {liveToken.counterId && (
                                        <div style={{ marginTop: '0.5rem', color: '#4ade80', fontWeight: 600 }}>
                                            Proceed to {liveToken.counterId}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setShowQR(true)}
                                        style={{
                                            marginTop: '1rem',
                                            padding: '0.4rem 0.8rem',
                                            fontSize: '0.8rem',
                                            background: 'rgba(56, 189, 248, 0.15)',
                                            border: '1px solid rgba(56, 189, 248, 0.3)',
                                            color: '#38bdf8',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        📱 View QR Pass
                                    </button>
                                </div>

                                {/* Queue Position Indicators */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: 'var(--radius-sm, 8px)',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>People Ahead</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{peopleAhead}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Est. Wait Time</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-blue, #38bdf8)' }}>
                                            ~{estimatedWait} <span style={{ fontSize: '0.85rem', fontWeight: 400 }}>min</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cancel Flow */}
                            <div>
                                {!showCancelConfirm ? (
                                    <button
                                        onClick={() => setShowCancelConfirm(true)}
                                        disabled={liveToken.status === TOKEN_STATUSES.COMPLETED || liveToken.status === TOKEN_STATUSES.CANCELLED}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-sm, 8px)',
                                            background: 'transparent',
                                            border: '1px solid rgba(239, 68, 68, 0.4)',
                                            color: '#f87171',
                                            fontWeight: 600,
                                            cursor: liveToken.status === TOKEN_STATUSES.COMPLETED ? 'not-allowed' : 'pointer',
                                            opacity: liveToken.status === TOKEN_STATUSES.COMPLETED ? 0.5 : 1
                                        }}
                                    >
                                        Cancel My Token
                                    </button>
                                ) : (
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: 'var(--radius-sm, 8px)'
                                    }}>
                                        <div style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: '#fca5a5' }}>
                                            Are you sure you want to leave the queue?
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={handleConfirmCancel}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.5rem',
                                                    background: '#dc2626',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    fontWeight: 600,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Yes, Cancel
                                            </button>
                                            <button
                                                onClick={() => setShowCancelConfirm(false)}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.5rem',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Keep Token
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6b7280',
                            textAlign: 'center',
                            minHeight: '220px'
                        }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎟️</div>
                            <div>No active token requested yet.</div>
                            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Select a service on the left to join the line.</div>
                        </div>
                    )}
                </div>
                {showQR && liveToken && (
                    <QRCodeModal token={liveToken} onClose={() => setShowQR(false)} />
                )}
            </div>
        </div>
    );
}