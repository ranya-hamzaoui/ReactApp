import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddPost, Post } from '../../../interfaces/post';
import { AxiosInstance } from '../../../lib/axios';
import { FieldBuilder } from '../../ui/FieldBuilder';
import { ModalPostContext } from './ModalContext';

function UpdatePost({ handleOpenUpdate }: { handleOpenUpdate: () => void }) {

  const { data } = useContext(ModalPostContext);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<AddPost>({
    defaultValues: {
      title: data ? data.title : "",
      description: data ? data.description : ""
    }
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ data, id }: { data: AddPost; id: any }) => {
      const response = await AxiosInstance.put(`/posts/${id}`, data);
      return response.data.data.post;
    },
    onSuccess(data: any, variables: any, context: any) {
      toast("Post updated successfully");
      handleOpenUpdate();
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Mettre à jour directement le cache
      queryClient.setQueryData(["posts"], (old: Post[] | undefined) => {
        if (!old) return [];
        return old.map((post) =>
          post._id === variables.id ? { ...post, ...data } : post
        );
      });
    },
    onError(error: any, variables: any, context: any) {
      toast("Error ocurred !");
    },
  });

  const onsubmit = async (values: AddPost) => {
    mutate({ data: values, id: data?._id });
  };
  return (
    <div className="">
      <form id="updatePost-form" onSubmit={handleSubmit(onsubmit)} >
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

export default UpdatePost