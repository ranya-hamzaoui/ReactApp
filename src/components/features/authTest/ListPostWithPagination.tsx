import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PaginationComponent from '../../ui/PaginationComponent';

const fetchPosts = async (page: number, limit: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

function ListPostWithPagination() {
    const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
    const postsPerPage = 5;
    const { data :data, isLoading, isError } = useQuery(
        {
        queryKey: ['projects', currentPage],
        queryFn: () => fetchPosts(currentPage,postsPerPage),
        }
    );
    if (isError) {
        return <p>Error fetching posts!</p>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1>Paginated Posts</h1>
            <ul>
                {data?.map((post: any) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
            <PaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(100 / postsPerPage)} // Assume 100 total posts for pagination
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default ListPostWithPagination