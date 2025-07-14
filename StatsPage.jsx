import React from 'react';

const StatsPage = () => {
  const urls = JSON.parse(localStorage.getItem('urls') || '[]');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>URL Statistics</h1>
      {urls.map((u, i) => (
        <div key={i} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <strong>Short URL:</strong> http://localhost:3000/{u.code}<br />
          <strong>Original:</strong> {u.longUrl}<br />
          <strong>Created:</strong> {new Date(u.createdAt).toLocaleString()}<br />
          <strong>Expires:</strong> {new Date(u.expiresAt).toLocaleString()}<br />
          <strong>Clicks:</strong> {u.clickCount}
          <ul>
            {u.clicks.map((c, j) => (
              <li key={j}>
                [{c.timestamp}] from {c.source} @ {c.location}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StatsPage;