import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search for novels…"
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
    />
  );
}
