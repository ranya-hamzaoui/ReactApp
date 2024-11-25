import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react'

function TestComponent2() {
  const [searchText,setSearchText] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const {data: users, isLoading,isError,isSuccess} = useQuery({
      queryKey: ['users'],
      queryFn : async () => {
        const response  = await axios.get('https://fakestoreapi.com/users');
        return response.data as any [] || []
      }
    });
  useEffect(() => {
        if (!searchText) setFilteredUsers(users ?? []) 
        const filtred = users?.filter((user : any) =>
        {
        const name = typeof user.name === 'string' ? user.name.toLowerCase() : '';  // Ensure it's a string
        const email = typeof user.email === 'string' ? user.email.toLowerCase() : '';  // Ensure email is also a string
        return name.includes(searchText.toLowerCase()) || email.includes(searchText.toLowerCase());
    })
        setFilteredUsers(filtred ?? [])  
    }, [searchText, users]);

  if (isError)   return   <p className="text-danger"> Error </p>
  if (isLoading) return <p className="text-danger"> ... Loading </p>

  return (
    <div className="mx-5 my-5">
    <input 
           type="text"
           placeholder="Search by title or description"
           className="form-control mb-3"
           value={searchText} 
           onChange={(e)=>setSearchText(e.target.value)}
        />
    {filteredUsers?.length === 0 && <p>No results found</p>}    
    {filteredUsers?.length > 0  && <table className="mx-5 table table-stripe">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers?.map((user,index)=> 
            <tr key={user._id} >
            <td scope="row">{user.username}</td>
            <td scope="row">{user.email}</td>
            </tr>
            )}
        </tbody>
    </table> 
}
    </div>
  )
}

export default TestComponent2