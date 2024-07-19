import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentPosts, setRecentPosts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch('/data/users.json');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      const postsResponse = await fetch('/data/posts.json');
      const postsData = await postsResponse.json();
      setPosts(postsData);

      setTotalUsers(usersData.length);
      setTotalPosts(postsData.length);

      const now = new Date();
      const activeUsersCount = usersData.filter(user => user.active && (now - new Date(user.lastActive)) < 24 * 60 * 60 * 1000).length;
      setActiveUsers(activeUsersCount);

      const recentPostsCount = postsData.filter(post => (now - new Date(post.createdAt)) < 24 * 60 * 60 * 1000).length;
      setRecentPosts(recentPostsCount);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <Link href="/login" legacyBehavior>
          <a className={styles.loginLink}>Login</a>
        </Link>
        <div className={styles.kpiGrid}>
          <div className={styles.kpi}>
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </div>
          <div className={styles.kpi}>
            <h2>Total Posts</h2>
            <p>{totalPosts}</p>
          </div>
          <div className={styles.kpi}>
            <h2>Users Active in Last 24 Hours</h2>
            <p>{activeUsers}</p>
          </div>
          <div className={styles.kpi}>
            <h2>Posts Published in Last 24 Hours</h2>
            <p>{recentPosts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
