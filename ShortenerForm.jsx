import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { logAction } from '../utils/logger';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', code: '' }]);
  const [shortened, setShortened] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleSubmit = () => {
    const results = [];
    const existing = JSON.parse(localStorage.getItem('urls') || '[]');

    urls.forEach(({ longUrl, validity, code }) => {
      if (!isValidUrl(longUrl)) return;
      let id = code || uuidv4().slice(0, 6);

      while (existing.find((u) => u.code === id)) {
        id = uuidv4().slice(0, 6);
      }

      const now = Date.now();
      const exp = validity ? now + parseInt(validity) * 60000 : now + 30 * 60000;

      const obj = {
        longUrl,
        code: id,
        createdAt: now,
        expiresAt: exp,
        clicks: [],
        clickCount: 0
      };

      existing.push(obj);
      logAction('SHORTEN_URL', obj);
      results.push(obj);
    });

    localStorage.setItem('urls', JSON.stringify(existing));
    setShortened(results);
  };

  return (
    <>
      {urls.map((u, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <TextField
              fullWidth
              label="Long URL"
              value={u.longUrl}
              onChange={(e) => handleChange(idx, 'longUrl', e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={u.validity}
              onChange={(e) => handleChange(idx, 'validity', e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Custom Code (optional)"
              value={u.code}
              onChange={(e) => handleChange(idx, 'code', e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" onClick={() => setUrls([...urls, { longUrl: '', validity: '', code: '' }])}>
        Add Another URL
      </Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
        Shorten
      </Button>

      <h2>Shortened URLs:</h2>
      {shortened.map((s, i) => (
        <div key={i}>
          <a href={`/${s.code}`} target="_blank" rel="noopener noreferrer">
            http://localhost:3000/{s.code}
          </a>
          <p>Expires at: {new Date(s.expiresAt).toLocaleString()}</p>
        </div>
      ))}
    </>
  );
};

export default ShortenerForm;