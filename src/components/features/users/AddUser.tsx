import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddUserI, User } from '../../../interfaces/user';
import { AxiosInstance } from "../../../lib/axios";
import { FieldBuilder } from "../../ui/FieldBuilder";
import { Button } from 'react-bootstrap';

type AddUserProps = {
  onAddUser: (user: AddUserI) => void;
};
function AddUser({ onAddUser }: { onAddUser: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const fakeData = {
    "name": "essia",
    "email": "essia1@gmail.com",
    "job": "Developer",
    "phone": 55555555,
    "password": "rania",
    "gender": "female",
    "dateBirth": "12/05/1995"
  }
  const { handleSubmit, control, formState: { errors } } = useForm<any>({
    defaultValues: {
      name: "",
      email: "",
      dateBirth: "",
      gender: "female",
      job: "",
      phone: "",
      password: "rania"
    }
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async ({ data }: { data: User }) => {
      const response = await AxiosInstance.post("/register", data);
      return response.data.data.user;
    },
    onSuccess(data: any, variables: any, context: any) {
      toast.info("User added successfully");
      //handleOpen();
      // Soit on fais inValide au Cache
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // Mettre à jour directement le cache
      queryClient.setQueryData(["users"], (old: User[] | undefined) => {
        if (!old) return [data]; // Si aucune donnée existante
        return [...old, data]; // Ajouter l'utilisateur au cache existant
      });
      onAddUser()
    },
    onError(error: any, variables: any, context: any) {
      toast("Error ocurred !");
    },
  });

  const onsubmit = async (values: any) => {
    mutate({ data: values });
  };
  return (
    <div className="bg-light p-3">
      <h4 className="text-dark"> Add a new User </h4>
      <form onSubmit={handleSubmit(onsubmit)} >
        <FieldBuilder
          control={control}
          errors={errors}
          name={"name"}
          type={"text"}
          label={"name"}
        />
        <FieldBuilder
          control={control}
          errors={errors}
          name={"email"}
          type={"text"}
          label={"email"}
        />
        <FieldBuilder
          control={control}
          errors={errors}
          name={"phone"}
          type={"number"}
          label={"phone"}
        /><FieldBuilder
          control={control}
          errors={errors}
          name={"job"}
          type={"text"}
          label={"job"}
        />
        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="danger" type="submit" onClick={onAddUser}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddUser;
