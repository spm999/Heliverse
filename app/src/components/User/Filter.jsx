// Filter.jsx
import React, { useState } from 'react';
import './css/Filter.css'

function Filter({ onFilterChange }) {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    onFilterChange({ domain, gender: selectedGender, availability: selectedAvailability });
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    onFilterChange({ domain: selectedDomain, gender, availability: selectedAvailability });
  };

  const handleAvailabilityChange = (e) => {
    const availability = e.target.value
    setSelectedAvailability(availability);
    onFilterChange({ domain: selectedDomain, gender: selectedGender, availability });
  };


  return (
    <div className="FilterContainer">
      <div className="FilterItem">
        <label htmlFor="domainFilter">Domain:</label>
        <select id="domainFilter" value={selectedDomain} onChange={handleDomainChange}>
          <option value="">All</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="IT">IT</option>
          {/* Add other domain options here */}
        </select>
      </div>
      <div className="FilterItem">
        <label htmlFor="genderFilter">Gender:</label>
        <select id="genderFilter" value={selectedGender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          {/* Add other gender options here */}
        </select>
      </div>
      <div className="FilterItem">
        <label htmlFor="availabilityFilter">Availability:</label>
        <select id="availabilityFilter" value={selectedAvailability} onChange={handleAvailabilityChange}>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
    </div>

  );
}

export default Filter;

