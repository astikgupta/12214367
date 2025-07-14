export const logAction = (type, payload) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ type, payload, timestamp: new Date().toISOString() });
  localStorage.setItem('logs', JSON.stringify(logs));
};