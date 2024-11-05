import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const KanbanBoardDisplay = ({ groupedTickets }) => (
  <div className="kanban-board">
    {Object.keys(groupedTickets).map((groupKey) => (
      <div key={groupKey} className="kanban-column">
        <div className="column-header">
        <span className="bordered-circle"></span>
        <h2 style={{ textAlign: "left" }}>{groupKey}</h2>
          <div className="header-icons">
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            <FontAwesomeIcon icon={faEllipsisH} className="options-icon" /> {/* Horizontal more icon */}
          </div>
        </div>
        {groupedTickets[groupKey].map((ticket) => (
          <div key={ticket.id} className={`ticket priority-${ticket.priority}`}>
            <div className="ticket-header">
              <h3 className='id'>{ticket.id}</h3>
              <FontAwesomeIcon icon={faUserCircle} className="ticket-icon" />
            </div>
            <h3 className="ticket-title">{ticket.title}</h3>
            <p>
              <span className="tag-container">
                <span className="offline-indicator"></span>
                {ticket.tag}
              </span>
            </p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default KanbanBoardDisplay;
