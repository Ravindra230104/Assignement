import Navbar from '../components/Navbar';
import styles from '../styles/Posts.module.css';
import { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [recentPosts, setRecentPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const postsResponse = await fetch('/data/posts.json');
      const postsData = await postsResponse.json();
      setPosts(postsData);

      setTotalPosts(postsData.length);

      const now = new Date();
      const recentPostsCount = postsData.filter(post => (now - new Date(post.createdAt)) < 24 * 60 * 60 * 1000).length;
      setRecentPosts(recentPostsCount);
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.kpi}>
          <h2>Total Posts</h2>
          <p>{totalPosts}</p>
        </div>
        <div className={styles.kpi}>
          <h2>Posts Published in Last 24 Hours</h2>
          <p>{recentPosts}</p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Caption</th>
              <th>Media URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.caption}</td>
                <td>{post.mediaUrl}</td>
                <td>
                  <button>Delete</button>
                  <button>Hide</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
