import React, { useState } from 'react';
import './css/SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Trigger search as the user types
    onSearch(value);
  };

  return (
    <form className='SearchBar'>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchBar;

