import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { Posts } from "./post";

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPage] = useState(10);
  const [categoryId, setCategoryId] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
    // postSampleDat();
  }, []);

  // function getArticle() {
  //   axios.get(`http://localhost:8000/articles/`).then((res) => {
  //     const { data, status } = res;
  //     if (res === 201) {
  //       setCategoryId(data.categoryId);
  //     } else {
  //       alert(` Aldaaa ${status}`);
  //     }
  //   });
  // // }
  // function postSampleDat() {
  //   // console.log({ posts });
  //   axios
  //     .post("http://localhost:8000/articles/test", {
  //       posts,
  //     })
  //     .then((res) => {
  //       const { status } = res;
  //       if (status === 201) {
  //         alert("success");
  //       }
  //     });
  // }

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage; // 10
  const indexOfFirtsPost = indexOfLastPost - postsPerPage; // 10 - 10
  const currentPosts = posts.slice(indexOfFirtsPost, indexOfLastPost);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3"> My Blog</h1>
      <Posts posts={currentPosts} loading={loading} categoryId={categoryId} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}
