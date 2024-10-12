import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalForm = ({ type, record, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(record || { name: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (type === 'create') {
      await axios.post('http://localhost:5000/records', formData);
    } else if (type === 'edit') {
      await axios.put(`http://localhost:5000/records/${record.id}`, formData);
    } else if (type === 'delete') {
      await axios.delete(`http://localhost:5000/records/${record.id}`);
    }
    onSuccess();  // Refresh data in parent component
    onClose();    // Close the modal
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === 'create' ? 'Create' : type === 'edit' ? 'Edit' : 'Delete'} Record
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type !== 'delete' ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Record Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Form>
        ) : (
          <p>Are you sure you want to delete this record?</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant={type === 'delete' ? 'danger' : 'success'} onClick={handleSave}>
          {type === 'delete' ? 'Delete' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalForm);
