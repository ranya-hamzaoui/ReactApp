import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Post } from '../../../interfaces/post';
import { AxiosInstance } from '../../../lib/axios';
import { FieldBuilder } from '../../ui/FieldBuilder';

function AddPost({ handleOpen }: { handleOpen: () => void }) {

    const [loading,setLoading] = useState<boolean>(false);
    const {handleSubmit,control,formState: { errors }} = useForm<any>({
      defaultValues: {
        title: "",
        description: ""
      }
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: async ({ data }: { data: Post }) => {
        const response = await AxiosInstance.post("/posts", data);
        return response.data;
      },
      onSuccess(data: any, variables: any, context: any) {
        toast.info("Post added successfully");
        handleOpen();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError(error: any, variables: any, context: any) {
        toast("Error ocurred !");
      },
    });
  
    const onsubmit = async (values: Post) => {
      mutate({ data: values });
    };
  return (
    <div className="">
    <form id="addPost-form" onSubmit={handleSubmit(onsubmit)} >
      <FieldBuilder
            control={control}
            errors={errors}
            name={"title"}
            type={"text"}
            label={"title"}
      />
       <FieldBuilder
            control={control}
            errors={errors}
            name={"description"}
            type={"text"}
            label={"description"}
      />
    </form>
  </div>
  )
}

export default AddPost