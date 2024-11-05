import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import KanbanBoardDisplay from './components/KanbanBoardDisplay';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch tickets and users data on mount
  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.tickets) && Array.isArray(data.users)) {
          setTickets(data.tickets);
          setUsers(data.users);
        } else {
          console.error("Unexpected data format:", data);
          setTickets([]);
          setUsers([]);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Save user preferences to localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  // Update grouping whenever tickets, users, groupBy, or sortBy changes
  useEffect(() => {
    // Attach user names to tickets before grouping
    const ticketsWithUserNames = tickets.map(ticket => {
      const user = users.find(user => user.id === ticket.userId);
      return {
        ...ticket,
        userName: user ? user.name : 'Unknown User'
      };
    });

    setGroupedTickets(groupTickets(ticketsWithUserNames, groupBy, sortBy));
  }, [tickets, users, groupBy, sortBy]);

  // Grouping logic
const groupTickets = (tickets, groupBy, sortBy) => {
  if (!Array.isArray(tickets)) return {}; // Return empty object if tickets is not an array

  const groups = {};
  tickets.forEach((ticket) => {
    // Use 'userName' for grouping if 'groupBy' is set to 'user'
    const key = groupBy === 'user' ? ticket.userName : ticket[groupBy];
    if (!groups[key]) groups[key] = [];
    groups[key].push(ticket);
  });

  // Sort each group based on sortBy
  for (const key in groups) {
    groups[key].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }

  return groups;
};


  return (
    <div>
      <Header
        setGroupBy={setGroupBy}
        setSortBy={setSortBy}
        groupBy={groupBy}
        sortBy={sortBy}
      />
      <KanbanBoardDisplay groupedTickets={groupedTickets} />
    </div>
  );
};

export default KanbanBoard;
