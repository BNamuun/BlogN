import axios from "axios";
import { useEffect, useState } from "react"

export function BlogPage(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPage] = useState(10);
    useEffect(() =>{
        const fetchPosts = async() => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return(
        <>
            
        </>
    )
}