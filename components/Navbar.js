import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link href="/" passHref>Home</Link>
      <Link href="/users" passHref>Users</Link>
      <Link href="/posts" passHref>Posts</Link>
    </div>
  );
};

export default Navbar;
