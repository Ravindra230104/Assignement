import Navbar from '../components/Navbar';
import styles from '../styles/Users.module.css';
import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch('/data/users.json');
      const usersData = await usersResponse.json();
      setUsers(usersData);

      setTotalUsers(usersData.length);

      const now = new Date();
      const activeUsersCount = usersData.filter(user => user.active && (now - new Date(user.lastActive)) < 24 * 60 * 60 * 1000).length;
      setActiveUsers(activeUsersCount);
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.kpi}>
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className={styles.kpi}>
          <h2>Users Active in Last 24 Hours</h2>
          <p>{activeUsers}</p>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button>Edit</button>
                  <button>Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
