import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import throttle from 'lodash/throttle';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:4001');

    const throttledUpdate = throttle((newData) => {
      console.log("Received data:", newData);
      setData(newData.slice(-5)); 
    }, 3000);

    socket.on("message", throttledUpdate);

    return () => {
      socket.disconnect();
      throttledUpdate.cancel();
    };
  }, []);

  return (
    <div>
      <LineChart width={1500} height={700} data={data} margin={{ top: 50, right: 50, left: 50, bottom: 50 }}>
        <XAxis dataKey="name"/>
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="x" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="y" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
}

export default App;