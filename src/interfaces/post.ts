export interface AddPost {
    _id?: string;
    title: string;
    description: string;
  }  
export interface Post {
    _id: string;
    title: string;
    description: string;
    user: any;
    createdAt: string;
    updatedAt: string;
  }