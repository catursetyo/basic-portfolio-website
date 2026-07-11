import { useEffect, useState } from 'react';

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
});

export default function DataOverlay({ hidden = false }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div className="ambient-data" aria-label={`Surabaya time ${timeFormatter.format(time)}`}>
      <span>surabaya, id</span>
      <span>{timeFormatter.format(time)} wib</span>
    </div>
  );
}
