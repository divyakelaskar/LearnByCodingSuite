import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ModalForm from './ModalForm';

const fetchRecords = async () => {
  const { data } = await axios.get('http://localhost:5000/records');
  return data;
};

const Table = () => {
  const { data, refetch } = useQuery('records', fetchRecords);
  const [modalType, setModalType] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const openModal = (type, record = null) => {
    setModalType(type);
    setSelectedRecord(record);
  };

  return (
    <div>
      <h1>Record Table</h1>
      <button onClick={() => openModal('create')}>Create Record</button>
      <table border={3}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(record => (
            <tr key={record.id}>
              <td style={{padding:'1rem'}}>{record.id}</td>
              <td style={{padding:'1rem'}}>{record.name}</td>
              <td style={{padding:'1rem'}}>
                <button onClick={() => openModal('edit', record)}>Edit</button>
                <button style={{marginLeft:'1rem'}} onClick={() => openModal('delete', record)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalType && (
        <ModalForm
          type={modalType}
          record={selectedRecord}
          onClose={() => setModalType('')}
          onSuccess={refetch}
        />
      )}
    </div>
  );
};

export default React.memo(Table);
