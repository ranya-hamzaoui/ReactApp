import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from '../../../interfaces/user';

interface EditUserFormProps {
  user: User | null;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form!,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form) {
      onSave(form); // Envoie les données mises à jour au parent
    }
  };

  if (!form) return null; // Si pas de données, ne rien afficher
  return (
    <div className="bg-light p-3">
    <h4 className="text-dark"> Edit a User </h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-flex justify-content-between mt-2">
          <Button variant="primary" type="submit">
            Edit
          </Button>
          <Button variant="danger" type="submit" onClick={onCancel}>
            Cancel
          </Button>
      </div>
    </Form>
    </div>
  );
};

export default EditUserForm;
