export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface AddUserI {
    _id?: string;
    name: string;
    email: string;
    dateBirth:string;
    gender:string;
    job:string;
    phone:string;
  }