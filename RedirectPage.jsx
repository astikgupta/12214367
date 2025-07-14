import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const { code } = useParams();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls') || '[]');
    const match = urls.find((u) => u.code === code);

    if (match && Date.now() < match.expiresAt) {
      match.clickCount++;
      match.clicks.push({
        timestamp: new Date().toISOString(),
        source: document.referrer || 'direct',
        location: 'India (mocked)'
      });
      const updated = urls.map((u) => (u.code === code ? match : u));
      localStorage.setItem('urls', JSON.stringify(updated));
      window.location.href = match.longUrl;
    } else {
      alert('Link expired or not found');
    }
  }, [code]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;