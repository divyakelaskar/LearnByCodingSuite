import './App.css';
import { useState } from 'react';
import { UserData } from './Data';
import LineChart from './LineChart';

function App() {
  const [userData, setUserData] = useState({
    labels: UserData.map((data)=> data.year), // labels on the x-axis
    datasets:[{
      label: "Users Gained",
      data: UserData.map((data)=> data.userGain),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor:"black",
      borderWidth:2,
    },
  ],
  });
  return (
    <div className="App">
      <div style={{width: 700}}>
        <LineChart chartData={userData}/>
      </div>
    </div>
  );
}

export default App;
