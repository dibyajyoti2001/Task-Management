import styles from "@/app/styles/components/navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/">Create</Link>
        <Link href="/read">Read</Link>
        <Link href="/update">Update</Link>
      </div>
    </nav>
  );
}
