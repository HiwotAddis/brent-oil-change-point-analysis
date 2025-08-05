import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

const EventImpactChart = ({ eventName }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/event-impact/${encodeURIComponent(eventName)}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [eventName]);

  if (!data) return <p>Loading...</p>;

  const combinedData = [...data.before, ...data.after];

  return (
    <div>
      <h3>{eventName} Impact (30 days before & after)</h3>
      <LineChart width={800} height={400} data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default EventImpactChart;
