import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React , {Component, useState} from 'react'
import { User } from '../../../interfaces/user';
import TableComponent from '../../ui/TableComponent';
import { AxiosInstance } from '../../../lib/axios';
import { Button } from 'react-bootstrap';
import { TABLE_USER_HEAD } from '../../../constants/constants';
import { Link } from 'react-router-dom';


interface Props {
  OnEdit: (user: any) => void;
}
function TableUser({OnEdit} : Props) {

  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/users");
      return response.data.data.users as any[];
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await AxiosInstance.delete(`/users/${id}`);
      return response.data;
    },
    onSuccess(data, variables) {
      queryClient.setQueryData(["users"], (old: User[]) =>
        old.filter((user) => user._id !== variables.id)
      );
    },
  });

  const handleDelete = (id: string) => {
    mutate({ id });
  };
  const handleEdit = (user: User) => {
    OnEdit(user);
  }; 
  const renderPostRow = (user: any) => (
    <>
      <td> <Link to={`/users/${"1"}`}>{user.name}</Link> </td>
      <td>{user.email}</td>
      <td className="d-flex justify-content-around">
        <Button variant="danger" onClick={() => handleDelete(user._id)}>
          {isPending ? "..." : <i className="bi bi-trash-fill"></i>}
        </Button>
        <Button variant="primary" onClick={() => handleEdit(user)}>
          <i className="bi bi-pencil-square"></i>
        </Button>
      </td>
    </>
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (
    <TableComponent
      headers={TABLE_USER_HEAD}
      data={users || []}
      onDelete={handleDelete}
      onEdit={handleEdit}
      isPending={isPending}
      renderRow={renderPostRow}
    />
  );
}

export default TableUser