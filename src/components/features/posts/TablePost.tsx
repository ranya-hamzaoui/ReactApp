import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { Table } from 'react-bootstrap';
import { TABLE_POST_HEAD } from '../../../constants/constants';
import { Post } from '../../../interfaces/post'
import { AxiosInstance } from '../../../lib/axios';
import Button from 'react-bootstrap/Button';
import { ModalPostContext } from './ModalContext';

function TablePost() {

  const queryClient = useQueryClient();
  const {openUpdate, setOpenUpdate, setData} = useContext(ModalPostContext);
  
  const { data: posts , isLoading} = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await AxiosInstance.get("/posts/1");
      return response.data.posts as Post[];
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await AxiosInstance.delete(`/posts/${id}`);
      return response.data;
    },
    onSuccess(data, variables, context) {
      queryClient.setQueryData(["posts"], (old: Post[]) =>
        old.filter((post) => post._id != variables.id)
      );
    },
  });

  const Delete = (id: string) => {
    mutate({ id: id });
    // if (confirm("Are you sure to delete thsi task ?")) {
    // }
  };
  return (
    <>
    {/* {if(posts!.length<0) return <p1> no data </p1>} */}
    {/* {isLoading ? <p> ...Loading </p>: ( */}
    
    <Table  striped bordered hover variant="dark">
      <thead>
        <tr>
          {TABLE_POST_HEAD && TABLE_POST_HEAD.map((head)=> 
          <th  key={head}>{head}</th>
          )}
        </tr>
      </thead>
      <tbody>
      {posts && posts.map((post,index)=> 
         <tr key={index}>
           <td>{post.title}</td>
           <td>{post.description}</td>
           <td>{post.user.name}</td>
           <td className="d-flex justify-content-around">
           <Button  onClick={() => Delete(post._id)}
            variant="danger">
              {isPending ? 
              "..."
             : <i className="bi bi-trash-fill"></i>
             } 
              </Button>
           <Button variant="primary" 
            onClick={() => {
                            setData(post);
                            setOpenUpdate(true);
              }}><i className="bi bi-pencil-square"></i></Button>
           </td>
         </tr>
      )}
       
     </tbody>
     </Table>)
   {/* } */}
    </>
  )
}

export default TablePost