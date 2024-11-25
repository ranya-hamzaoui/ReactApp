import React, { createContext } from "react";
import { AddPost, Post } from "../../../interfaces/post";

interface IContext {
  openUpdate: boolean;
  setOpenUpdate: (val: boolean) => void;
  data: AddPost | null;
  setData: (val: Post) => void;
}
export const ModalPostContext = createContext<IContext>({
  openUpdate: false,
  setOpenUpdate: () => {},
  data: null,
  setData: () => {},
});

export const ModalPostWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [data, setData] = React.useState<AddPost | null>(null);

  return (
    <ModalPostContext.Provider
      value={{ openUpdate, setOpenUpdate, data, setData }}
    >
      {children}
    </ModalPostContext.Provider>
  );
};
