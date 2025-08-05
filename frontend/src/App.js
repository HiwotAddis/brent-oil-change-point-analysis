import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventImpactChart from './components/EventImpactChart';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Brent Oil Price Dashboard</h1>
      <select onChange={(e) => setSelectedEvent(e.target.value)}>
        <option value="">Select an event</option>
        {events.map(e => (
          <option key={e["Event Name"]} value={e["Event Name"]}>{e["Event Name"]}</option>
        ))}
      </select>

      {selectedEvent && <EventImpactChart eventName={selectedEvent} />}
    </div>
  );
}

export default App;
