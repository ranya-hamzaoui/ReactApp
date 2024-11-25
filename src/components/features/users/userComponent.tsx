import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React , {Component, useState} from 'react'
import { User } from '../../../interfaces/user';
import { AxiosInstance } from '../../../lib/axios';
import TableComponent from '../../ui/TableComponent';
import { Button } from 'react-bootstrap';
import { TABLE_USER_HEAD } from '../../../constants/constants';
import EditUserForm from './EditUserForm';
import userTable from './TableUser';
import TableUser from './TableUser';
import AddUser from './AddUser'
function UserComponent() { 

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddUser, setshowAddUser] = useState<boolean>(false);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  }; 
  const handleSave = (updatedUser: User) => {
    onUpdate(updatedUser); // Appeler la fonction de mise à jour
    setEditingUser(null); // Fermer le formulaire après mise à jour
  };

  const handleCancel = () => {
    setEditingUser(null); // Fermer le formulaire sans sauvegarder
  };

  const onUpdate = async (values:User) => {
    const response = await AxiosInstance.put(`/users/${values._id}`,values);
    return response.data;
  }
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mb-3">
      <Button variant="dark" onClick={()=> {setshowAddUser(!showAddUser)}}>
        Add User
      </Button>
      </div>
      {editingUser && (
      <EditUserForm
        user={editingUser}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )}
    {showAddUser && ( <AddUser onAddUser={()=> {setshowAddUser(!showAddUser)}} />)}
    <TableUser OnEdit={handleEdit}/> 
    </div> 
  );
}

export default UserComponent