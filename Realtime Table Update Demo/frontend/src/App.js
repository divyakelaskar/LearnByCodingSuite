import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Listen for updates from the server
        socket.on('updateData', (data) => {
            setStudents(data);
        });

        const intervalId = setInterval(fetchData, 1000);

        return () => {
            // Cleanup socket connection on component unmount
            socket.disconnect();

            // Clear the interval on component unmount
            clearInterval(intervalId);
        };
    }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr class='header'>
            <th>Name</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Student 1</td>
            <td>
              {students.map((innerdata, index) => (
                index === 0 && (
                  <React.Fragment key={innerdata.name} className='TDCSStr'>
                    <td align='right' class='TDCSS'>{innerdata.marks}</td>
                  </React.Fragment>
                )
              ))}
            </td>
          </tr>
          <tr>
            <td>Student 2</td>
            <td>
              {students.map((innerdata, index) => (
                index === 1 && (
                  <React.Fragment key={innerdata.name} className='TDCSStr'>
                    <td align='right' class='TDCSS'>{innerdata.marks}</td>
                  </React.Fragment>
                )
              ))}
            </td>
          </tr>
          <tr>
            <td>Student 3</td>
            <td>
              {students.map((innerdata, index) => (
                index === 2 && (
                  <React.Fragment key={innerdata.name} className='TDCSStr'>
                    <td align='right' class='TDCSS'>{innerdata.marks}</td>
                  </React.Fragment>
                )
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;