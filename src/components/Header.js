import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

const Header = ({ setGroupBy, setSortBy, groupBy, sortBy }) => {
  const [displayOpen, setDisplayOpen] = useState(false);

  return (
    <div className="header">
    <div className="header-container">
      <div className="display-dropdown">
        <button className="display-button" onClick={() => setDisplayOpen(!displayOpen)}>
        <FontAwesomeIcon icon={faSliders} className="sliders-icon" />
          Display 
        </button>
        {displayOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label>Grouping</label>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="dropdown-select">
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="dropdown-select">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Header;
