import React from 'react';
import './App.css';
import Table from './components/Table';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    // Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <div className="App">
          <h1>Record Management</h1>
          <Table />
      </div>
    </QueryClientProvider>
  );
}

export default App;
