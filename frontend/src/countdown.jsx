import { useEffect, useMemo, useState } from 'react';

const TARGET_DATE = new Date(2026, 9, 28, 23, 59, 0, 0);
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const MS_IN_HOUR = 60 * 60 * 1000;
const MS_IN_MINUTE = 60 * 1000;
const MS_IN_SECOND = 1000;

const padNumber = (value, size = 2) => String(value).padStart(size, '0');

const getTimeLeft = () => {
  const now = Date.now();
  const diff = TARGET_DATE.getTime() - now;
  const remaining = Math.max(diff, 0);

  const days = Math.floor(remaining / MS_IN_DAY);
  const hours = Math.floor((remaining % MS_IN_DAY) / MS_IN_HOUR);
  const minutes = Math.floor((remaining % MS_IN_HOUR) / MS_IN_MINUTE);
  const seconds = Math.floor((remaining % MS_IN_MINUTE) / MS_IN_SECOND);
  const milliseconds = Math.floor(remaining % MS_IN_SECOND);

  return {
    isComplete: diff <= 0,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

const baseStyles = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  background: '#000',
  color: '#ff1b1b',
  textAlign: 'center',
  fontFamily: "'Trebuchet MS', 'Segoe UI', Tahoma, sans-serif",
  padding: '2.5rem',
};

const titleStyles = {
  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  marginBottom: '2rem',
};

const timerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
  fontWeight: 700,
  textTransform: 'uppercase',
};

const segmentStyles = {
  display: 'grid',
  gap: '0.4rem',
  minWidth: '5ch',
};

const labelStyles = {
  fontSize: 'clamp(0.7rem, 1.6vw, 1rem)',
  letterSpacing: '0.15em',
  color: '#ff5c5c',
};

const separatorStyles = {
  fontSize: 'clamp(2.5rem, 7vw, 5.2rem)',
  lineHeight: 1,
};

const messageStyles = {
  fontSize: 'clamp(2rem, 6vw, 4.5rem)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const displayStyles = useMemo(
    () => ({
      base: baseStyles,
      title: titleStyles,
      timer: timerStyles,
      segment: segmentStyles,
      label: labelStyles,
      separator: separatorStyles,
      message: messageStyles,
    }),
    [],
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 50);

    return () => window.clearInterval(intervalId);
  }, []);

  if (timeLeft.isComplete) {
    return (
      <div style={displayStyles.base}>
        <div style={displayStyles.message}>Hope you made it</div>
      </div>
    );
  }

  return (
    <div style={displayStyles.base}>
      <div style={displayStyles.title}>TIME LEFT TO PREPARE</div>
      <div style={displayStyles.timer}>
        <span style={displayStyles.segment}>
          {timeLeft.days}
          <span style={displayStyles.label}>Days</span>
        </span>
        <span style={displayStyles.separator}>:</span>
        <span style={displayStyles.segment}>
          {padNumber(timeLeft.hours)}
          <span style={displayStyles.label}>Hour</span>
        </span>
        <span style={displayStyles.separator}>:</span>
        <span style={displayStyles.segment}>
          {padNumber(timeLeft.minutes)}
          <span style={displayStyles.label}>Min</span>
        </span>
        <span style={displayStyles.separator}>:</span>
        <span style={displayStyles.segment}>
          {padNumber(timeLeft.seconds)}
          <span style={displayStyles.label}>Sec</span>
        </span>
        <span style={displayStyles.separator}>:</span>
        <span style={displayStyles.segment}>
          {padNumber(timeLeft.milliseconds, 3)}
          <span style={displayStyles.label}>Millisec</span>
        </span>
      </div>
    </div>
  );
}

export default Countdown;
